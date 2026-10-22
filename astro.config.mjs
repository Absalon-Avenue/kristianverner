import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Kladdesiden findes kun, når sitet kører lokalt. Den kommer aldrig med ud på nettet.
const kunLokalt = {
  name: 'kladder-kun-lokalt',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') {
        injectRoute({ pattern: '/kladder', entrypoint: './src/dev/kladder.astro' });
      }
    },
  },
};

// Billeder til kladder skal ikke ligge på nettet, heller ikke skjult.
// Efter hvert byg fjernes derfor alle billeder, som ingen offentlig side bruger.
const fjernUbrugteBilleder = {
  name: 'fjern-ubrugte-billeder',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const rod = fileURLToPath(dir);
      const filer = await readdir(rod, { recursive: true });
      let tekst = '';
      for (const f of filer) {
        if (/\.(html|css|js|xml)$/.test(f)) tekst += await readFile(join(rod, f), 'utf8');
      }
      let fjernet = 0;
      for (const f of filer) {
        const m = f.match(/^_astro[\\/].*\.([A-Za-z0-9_-]{6,})\.(jpe?g|png|webp|avif)$/i);
        if (m && !tekst.includes(m[1])) {
          await rm(join(rod, f));
          fjernet++;
        }
      }
      console.log(`Ryddet op: ${fjernet} billeder, som ingen side bruger, er fjernet fra det færdige site.`);
    },
  },
};

export default defineConfig({
  site: 'https://kristianverner.dk',
  trailingSlash: 'always',
  // Gamle adresser, der stadig kan være delt eller stå hos Google, sender videre til den nye.
  redirects: {
    '/vaerker/blue-canvas-projects/': '/vaerker/hyperbaton/',
    '/en/works/blue-canvas-projects/': '/en/works/hyperbaton/',
    '/fr/oeuvres/blue-canvas-projects/': '/fr/oeuvres/hyperbaton/',
  },
  integrations: [sitemap(), kunLokalt, fjernUbrugteBilleder],
  devToolbar: { enabled: false },
});
