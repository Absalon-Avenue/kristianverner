#!/bin/zsh
# Lægger billeder ind til et værk, klar til nettet.
#
# Brug:  vaerktoej/tilfoej-billeder.sh <vaerkets-filnavn> billede1.jpg billede2.heic ...
# Fx:    vaerktoej/tilfoej-billeder.sh megalit ~/Downloads/IMG_1234.HEIC
#
# Hvad den gør:
#  - retter billedet op, hvis telefonen har gemt det på siden
#  - fjerner skjulte oplysninger (GPS-sted, telefonmodel, tidspunkt)
#  - gemmer det som billeder/<vaerk>/01.jpg, 02.jpg ... i den rækkefølge, du nævner dem
# Det første billede (01) er det, der vises i oversigten.
set -e
VAERK="$1"; shift || true
[ -n "$VAERK" ] && [ $# -gt 0 ] || { echo "Brug: $0 <vaerk> <billeder...>"; exit 1; }
cd "$(dirname "$0")/.."
MAPPE="billeder/$VAERK"; mkdir -p "$MAPPE"
N=$(ls "$MAPPE" 2>/dev/null | grep -cE '^[0-9]+\.jpg$' || true)
for F in "$@"; do
  [ -f "$F" ] || { echo "Findes ikke: $F"; continue; }
  N=$((N+1)); UD="$MAPPE/$(printf '%02d' $N).jpg"
  TMP="$F"
  case "${F:l}" in
    *.heic|*.heif) TMP="$(mktemp -t billede).jpg"; sips -s format jpeg "$F" --out "$TMP" >/dev/null ;;
  esac
  magick "$TMP" -auto-orient -strip -resize '2600x2600>' -quality 91 "$UD"
  echo "  $F  ->  $UD"
done
echo "Færdig. $VAERK har nu $N billeder."
