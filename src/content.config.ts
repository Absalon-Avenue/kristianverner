import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Et felt der må være tomt, og hvor et tal (2023) også er i orden.
const fritekst = z
  .union([z.string(), z.number()])
  .nullish()
  .transform((v) => (v === undefined || v === null ? '' : String(v).trim()));

const vaerker = defineCollection({
  loader: glob({ pattern: '*.md', base: './indhold/vaerker' }),
  schema: z.object({
    titel: z.string(),
    aar: fritekst,
    kategori: fritekst,
    kort: fritekst,
    materiale: fritekst,
    maal: fritekst,
    vaegt: fritekst,
    pris: z
      .string({ error: 'Prisen skal stå i anførselstegn, fx pris: "28.000 kr. inkl. moms"' })
      .nullish()
      .transform((v) => (v ?? '').trim()),
    status: fritekst,
    foto: fritekst,
    fokus: fritekst,
    raekkefoelge: z.number().default(100),
    kladde: z.boolean().default(false),
    mangler: fritekst,
  }),
});

const sider = defineCollection({
  loader: glob({ pattern: '*.md', base: './indhold/sider' }),
  schema: z.looseObject({
    titel: fritekst,
    beskrivelse: fritekst,
  }),
});

const omtale = defineCollection({
  loader: glob({ pattern: '*.md', base: './indhold/omtale' }),
  schema: z.object({
    kilde: z.string(),
    aar: fritekst,
    titel: fritekst,
    link: fritekst,
    citat: fritekst,
    vaerk: fritekst,
    billede: fritekst,
    billedtekst: fritekst,
    foto: fritekst,
    forside: z.boolean().default(false),
    raekkefoelge: z.number().default(100),
  }),
});

// Oversættelser til engelsk og fransk. Samme filnavn som den danske fil, i indhold/oversat/en/ og indhold/oversat/fr/.
// Kun tekstfelterne står i dem. Et tomt eller manglende felt viser den danske tekst.
const oversat = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './indhold/oversat' }),
  schema: z.looseObject({}),
});

export const collections = { vaerker, sider, omtale, oversat };
