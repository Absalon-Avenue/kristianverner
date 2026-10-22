import { getCollection, getEntry, render } from 'astro:content';
import type { Sprog } from './sprog';

export async function vaerker({ medKladder = false } = {}) {
  const alle = await getCollection('vaerker');
  return alle
    .filter((v) => medKladder || !v.data.kladde)
    // Tidsrækkefølge: nyeste øverst, ældste nederst. Værker uden årstal står øverst.
    // Har to værker samme år, bestemmer raekkefoelge, hvilket der står først.
    .sort(
      (a, b) =>
        Number(b.data.aar || 9999) - Number(a.data.aar || 9999) ||
        a.data.raekkefoelge - b.data.raekkefoelge ||
        a.data.titel.localeCompare(b.data.titel, 'da'),
    );
}

export async function side(navn: string) {
  const s = await getEntry('sider', navn);
  if (!s) throw new Error(`Mangler filen indhold/sider/${navn}.md`);
  return s;
}

export async function indstillinger(sprog: Sprog = 'da') {
  const s = await side('indstillinger');
  return flet(s.data as Record<string, any>, await oversaettelse(sprog, 'sider', 'indstillinger'));
}

// Henter oversættelsen af en fil, fx oversaettelse('fr', 'vaerker', 'sisyfos') → indhold/oversat/fr/vaerker/sisyfos.md
let alleOversat: Map<string, any> | undefined;
export async function oversaettelse(sprog: Sprog, mappe: string, id: string) {
  if (sprog === 'da') return undefined;
  alleOversat ??= new Map((await getCollection('oversat')).map((o) => [o.id, o]));
  return alleOversat.get(`${sprog}/${mappe}/${id}`);
}

// Lægger de oversatte felter oven på de danske. Tomme felter beholder den danske tekst.
function flet(dansk: Record<string, any>, o?: { data: Record<string, any> }) {
  if (!o) return dansk;
  const ud = { ...dansk };
  for (const [k, v] of Object.entries(o.data)) {
    if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) continue;
    ud[k] = v;
  }
  return ud;
}

const harTekst = (body?: string) => (body ?? '').replace(/<!--[\s\S]*?-->/g, '').trim().length > 0;

// En fil på det valgte sprog: felterne, selve teksten, og om teksten findes.
// Mangler oversættelsen af selve teksten, bruges den danske, og `tekstSprog` siger 'da'.
export async function paaSprog<T extends { id: string; data: any; body?: string }>(
  entry: T,
  sprog: Sprog,
  mappe: string,
) {
  const o = await oversaettelse(sprog, mappe, entry.id);
  const data = flet(entry.data, o) as T['data'];
  const brugOversat = !!o && harTekst(o.body);
  const kilde = brugOversat ? o! : entry;
  const { Content } = await render(kilde as any);
  return {
    data,
    Content,
    harTekst: harTekst(kilde.body),
    tekstSprog: (brugOversat || sprog === 'da' ? sprog : 'da') as Sprog,
  };
}

// Omtale og priser på det valgte sprog, i rækkefølge.
export async function omtaleListe(sprog: Sprog) {
  const alle = (await getCollection('omtale')).sort((a, b) => a.data.raekkefoelge - b.data.raekkefoelge);
  return Promise.all(alle.map(async (o) => ({ id: o.id, data: flet(o.data, await oversaettelse(sprog, 'omtale', o.id)) as typeof o.data })));
}

// Værker med titel, kort tekst og materiale på det valgte sprog. Bruges i oversigterne.
export async function vaerkerPaaSprog(sprog: Sprog) {
  const alle = await vaerker();
  return Promise.all(alle.map(async (v) => ({ ...v, data: flet(v.data, await oversaettelse(sprog, 'vaerker', v.id)) as typeof v.data })));
}

// Adresserne til værksiderne på ét sprog, med forrige og næste værk.
export async function vaerkSider(sprog: Sprog) {
  const alle = await vaerkerPaaSprog(sprog);
  const danske = await vaerker();
  return alle.map((v, n) => ({
    params: { slug: v.id },
    props: { vaerk: danske[n], forrige: alle[n - 1] ?? null, naeste: alle[n + 1] ?? null, sprog },
  }));
}

// Opslagene fra værkstedet, nyeste først, på det valgte sprog.
export async function vaerkstedOpslag(sprog: Sprog) {
  const alle = (await getCollection('vaerksted'))
    .filter((o) => !o.data.kladde)
    .sort((a, b) => String(b.data.dato || b.id).localeCompare(String(a.data.dato || a.id)));
  return Promise.all(alle.map(async (o) => ({ id: o.id, ...(await paaSprog(o, sprog, 'vaerksted')) })));
}
