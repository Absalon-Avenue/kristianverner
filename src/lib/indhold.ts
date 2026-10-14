import { getCollection, getEntry } from 'astro:content';

export const STATUS: Record<string, string> = {
  ledig: 'Kan erhverves',
  solgt: 'Solgt',
  privateje: 'I privateje',
  udstillet: 'Udstillet',
  proces: 'Under arbejde',
  forslag: 'Projektforslag',
};
export const statusTekst = (s: string) => STATUS[s.toLowerCase()] ?? s;

export async function vaerker({ medKladder = false } = {}) {
  const alle = await getCollection('vaerker');
  return alle
    .filter((v) => medKladder || !v.data.kladde)
    .sort(
      (a, b) =>
        a.data.raekkefoelge - b.data.raekkefoelge ||
        Number(b.data.aar || 0) - Number(a.data.aar || 0) ||
        a.data.titel.localeCompare(b.data.titel, 'da'),
    );
}

export async function side(navn: string) {
  const s = await getEntry('sider', navn);
  if (!s) throw new Error(`Mangler filen indhold/sider/${navn}.md`);
  return s;
}

export async function indstillinger() {
  return (await side('indstillinger')).data as Record<string, any>;
}
