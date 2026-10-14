#!/bin/zsh
# Laver forsidevideoen ud fra en råfil.
#
# Brug:  vaerktoej/lav-forsidevideo.sh "sti/til/video.mov" [start-sekund] [længde-sekunder]
# Giver: public/video/forside.mp4 og public/video/forside.jpg (stillbilledet, der vises mens videoen loader)
#
# Lyden beholdes, men dæmpes og blødgøres (værkstedslyd kan være hård). Videoen starter altid uden lyd,
# og besøgende kan selv slå den til. Skriv "uden-lyd" som fjerde ord for at fjerne lyden helt.
# HDR-optagelser fra nyere telefoner laves om til almindelige farver, ellers brænder lyse flader ud.
set -e
IND="$1"; START="${2:-0}"; LAENGDE="${3:-28}"; LYD="${4:-med-lyd}"
[ -f "$IND" ] || { echo "Kan ikke finde videoen: $IND"; exit 1; }
cd "$(dirname "$0")/.."
mkdir -p public/video

TRC=$(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer -of csv=p=0 "$IND")
FARVER=""
if [[ "$TRC" == "arib-std-b67" || "$TRC" == "smpte2084" ]]; then
  echo "HDR-optagelse fundet. Laver om til almindelige farver."
  FARVER="colorspace=all=bt709:iall=bt2020:itrc=bt709:format=yuv420p,"
fi
MAERK=(-color_primaries bt709 -color_trc bt709 -colorspace bt709)

HAR_LYD=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$IND" | head -1)
if [[ "$LYD" == "uden-lyd" || -z "$HAR_LYD" ]]; then
  AUDIO=(-an)
else
  AUDIO=(-af "lowpass=f=9000,loudnorm=I=-26:TP=-6:LRA=11,afade=t=in:st=0:d=0.8,afade=t=out:st=$((LAENGDE-1)):d=1" -c:a aac -b:a 96k -ac 2)
fi
ffmpeg -v error -y -ss "$START" -t "$LAENGDE" -i "$IND" \
  -vf "${FARVER}scale='min(1600,iw)':-2,fade=t=in:st=0:d=0.8,fade=t=out:st=$((LAENGDE-1)):d=1" \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p "${MAERK[@]}" "${AUDIO[@]}" -movflags +faststart public/video/forside.mp4
ffmpeg -v error -y -ss "$((START+2))" -i "$IND" -frames:v 1 \
  -vf "${FARVER}scale='min(1600,iw)':-2" "${MAERK[@]}" -q:v 3 public/video/forside.jpg
ls -lh public/video/forside.mp4 public/video/forside.jpg | awk '{print $5, $NF}'
