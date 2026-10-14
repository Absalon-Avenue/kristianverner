import type { ImageMetadata } from 'astro';

// Alle billeder i mappen "billeder" findes automatisk.
// Et værk henter sine billeder fra den undermappe, der hedder det samme som værkets fil.
const alle = import.meta.glob<{ default: ImageMetadata }>(
  '/billeder/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function billederTil(mappe: string): ImageMetadata[] {
  const start = `/billeder/${mappe}/`;
  return Object.keys(alle)
    .filter((k) => k.startsWith(start))
    .sort((a, b) => a.localeCompare(b, 'da', { numeric: true }))
    .map((k) => alle[k].default);
}

export function billede(sti: string): ImageMetadata | undefined {
  return alle[`/billeder/${sti}`]?.default;
}
