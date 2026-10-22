# kristianverner.dk

Website for billedhuggeren Kristian Verner (Kristian Verner Works, CVR 44973332).
Kristian ejer og retter sitet selv ved at tale med sin AI. Sebastian har bygget det og er
reserven, når noget er gået galt.

Sitet er et galleri og et univers for én kunstner. Det er ikke en webshop, ikke et CV
og ikke et dashboard. Få ord, store billeder, meget luft.

## Sådan taler du med Kristian

Kristian er billedkunstner, ikke tekniker. Forklar som til en dygtig person, der bare ikke
arbejder med kode til daglig. Tag det i hans tempo, og vis ham hellere resultatet end at beskrive det.

- Svar i én eller to korte sætninger. Ingen lister, ingen overskrifter, ingen tekniske ord.
- Vis i stedet for at forklare: lav ændringen, og bed ham kigge i forhåndsvisningen.
- Er du i tvivl om, hvad han mener, så lav ét forslag og vis det. Stil højst ét spørgsmål ad gangen,
  helst et ja/nej-spørgsmål.
- Dikterer han, kan ord være misforstået undervejs. Gæt det, der giver mening, og vis det,
  frem for at bede ham gentage.
- Sender han et billede eller et skærmbillede med en ring om noget, så er det det, han mener.

Tre ord betyder noget bestemt:

- **"udgiv"**: byg sitet (`npm run byg`). Fejler det, så sig det kort og ret det. Lykkes det, så
  `git add -A`, commit med en kort dansk besked om hvad der er ændret, og `git push`. Sig til ham,
  at det er på nettet om et par minutter.
- **"fortryd"**: er ændringen ikke udgivet, så sæt filerne tilbage til sidste udgivne version.
  Er den udgivet, så `git revert` den seneste ændring og udgiv igen. Vis ham resultatet bagefter.
- **"start sitet"** eller **"vis mig sitet"**: start forhåndsvisningen (`npm run dev`) og åbn den.

Start altid en arbejdsgang med `git pull`, så du arbejder i den nyeste udgave. Sebastian kan have
rettet noget i mellemtiden.

## Den vigtigste regel: opfind aldrig indhold

Skriv aldrig selv værktekster, titler, årstal, materialer, mål, priser, citater eller
biografi. Det har én gang ført til opdigtede titler og et opdigtet citat på siden.

- Tekst om værkerne og om Kristian kommer fra Kristian selv. Ordret.
- Fakta om ham må kun komme fra en kilde, du selv har åbnet og læst, og som der linkes til.
- Mangler der noget, står feltet tomt, eller værket bliver liggende som kladde.
  Et tomt felt vises ikke på siden. Det er altid bedre end et gæt.
- Retter du i hans tekst (stavefejl, tegnsætning), så sig præcist hvad du har rettet.
- Ingen tankestreger i tekst, du selv skriver. Kort og direkte dansk.

## Sprog

Sitet findes på dansk (`/`), engelsk (`/en/`) og fransk (`/fr/`). Sprogene vises i rækkefølgen fransk, engelsk, dansk.

- Introen på forsiden spørger om sprog, og man kommer først videre, når man har valgt. Valget huskes i browseren.
  Sprogvalget findes også i bunden af hver side, over adressen.
- Faste ord (menu, knapper, formularen, kategorier, status) og adresserne står i `src/lib/sprog.ts`.
- Oversættelserne af teksterne ligger i `indhold/oversat/en/` og `indhold/oversat/fr/` med samme filnavn som den
  danske fil, fx `indhold/oversat/fr/vaerker/sisyfos.md`. Kun tekstfelterne står i dem. Et tomt felt viser den danske tekst.
- Kristian har sagt ja til, at teksterne oversættes, så længe de er flydende og siger det samme som den danske tekst.
  Ret den danske tekst, så ret også oversættelserne. Nyt værk: lav også oversættelsesfilerne. Titler på værker
  oversættes ikke, undtagen beskrivende titler som Bestillingsværk.
- Siderne selv ligger i `src/sider/`. Filerne i `src/pages/` laver kun adresserne på de tre sprog.

## Hvor tingene ligger

| Mappe | Hvad |
|---|---|
| `indhold/vaerker/` | Én fil pr. værk. Filnavnet bliver adressen: `megalit.md` giver `/vaerker/megalit/` |
| `indhold/sider/` | Tekst og oplysninger til forside, om, kontakt. `indstillinger.md` har navn, mail, telefon, CVR |
| `indhold/omtale/` | Én fil pr. omtale eller pris. `forside: true` viser citatet på forsiden |
| `billeder/<vaerk>/` | Værkets billeder. Mappen hedder det samme som værkets fil. `01.jpg` er forsidebilledet |
| `billeder/sider/` | `portraet.jpg`, `skitse.jpg`, `citat.jpg` (billedet i det mørke felt) |
| `public/video/` | Forsidevideoen. Laves med `vaerktoej/lav-forsidevideo.sh` |
| `src/` | Maskineriet. `src/stil/global.css` har alle farver og skrifter øverst |
| `raamateriale/` | Originalfiler. Kommer aldrig på nettet og aldrig i git. Indeholder private filer |
| `noter/` | Interne noter (kildeliste, SEO-rapport). Heller ikke i git |

## Et værk

```
---
titel: "Megalit"
aar: 2023
kategori: "Skulptur"          # Skulptur, Lysværk eller Installation
kort: "En linje under titlen."
materiale: "Messing"
maal: ""
vaegt: ""
pris: "28.000 DKK inkl. moms" # ALTID i anførselstegn, ellers læses 28.000 som tallet 28
status: ""                    # ledig, solgt, privateje, udstillet, proces, forslag. Eller fri tekst
foto: ""                      # fotografens navn
fokus: ""                     # hvis oversigten beskærer skævt: "center top", "left center" osv.
raekkefoelge: 2               # lavt tal vises først
kladde: false                 # true = findes kun lokalt, ikke på nettet
---

Selve teksten om værket. Kan være tom.
```

- Priser vises kun, hvis `vis_priser: true` i `indhold/sider/indstillinger.md`.
- Nyt værk: lav filen, læg billeder ind med
  `vaerktoej/tilfoej-billeder.sh <filnavn> <billeder...>`. Scriptet retter billedet op og
  fjerner GPS-sted og andre skjulte oplysninger. Læg aldrig telefonbilleder direkte i `billeder/`.
- Billeder til kladder kommer ikke med ud. Byggeriet fjerner alle billeder, som ingen offentlig side bruger.

## Se og udgiv

```bash
npm run dev      # sitet på http://localhost:4321  (kladder: http://localhost:4321/kladder)
npm run byg      # bygger det færdige site i dist/
```

Sitet ligger på GitHub Pages. Alt, der pushes til `main`, bliver bygget og lagt på nettet af
`.github/workflows/udgiv.yml` i løbet af et par minutter. Ingen skal uploade filer nogen steder.
Ændringer, der ikke er pushet, findes kun på den computer, de er lavet på.
Byg altid lokalt og se siden efter, før der pushes. Commit og push kun, når Kristian eller
Sebastian beder om det (fx med ordet "udgiv").

Interne links skrives med `sti('/vaerker/')` fra `src/lib/sti.ts`, aldrig som rå `/vaerker/`.
Så virker sitet også på en midlertidig adresse.

## Forsiden

- Introen (logoet på sort skærm) ligger i `src/components/Intro.astro`. Den kører, når man kommer udefra,
  ikke ved klik rundt på sitet. `?intro` i adressen viser den altid. `intro: false` i
  `indhold/sider/forside.md` slår den fra. Tiderne står samlet i komponenten.
- Ny forsidevideo: `vaerktoej/lav-forsidevideo.sh "sti/til/video.mov" start-sekund længde`. Scriptet klarer
  HDR-farver, lyd og størrelse. Lydknappen styres med `lyd:` i `forside.md`.
- Toppen af forsiden bruger Cormorant og champagne med vilje. Resten af sitet bruger Albert Sans.

## Kontakt

Kontaktsiden har en formular, der sender via Web3Forms. Nøglen står i `formular_noegle` i
`indhold/sider/indstillinger.md`. Uden nøgle åbner formularen folks eget mailprogram.
"Spørg til værket" på værksiderne fører til formularen med værket skrevet ind.
Teksten ved siden af formularen står i `indhold/sider/kontakt.md`.

## Hvad der er lavet

`HVAD-ER-LAVET.md` er listen over alt, der er bygget og rettet, og hvorfor det betyder noget.
Spørger Kristian, hvad der er lavet, eller hvad sitet kan, så fortæl ham det ud fra den fil.
Kort og i almindelige ord, et par punkter ad gangen.

## Plan

`PLAN.md` er arbejdslisten for findbarhed, måling og links. Kig i den, før du foreslår nyt.

## Måling

Besøg måles med Umami (cloud.umami.is), som ikke bruger cookies. Derfor er der intet cookiebanner,
og det må der heller ikke komme uden en god grund. Umami-koden står i `umami_id` i
`indhold/sider/indstillinger.md` og kører kun på det færdige site.

Klik, der tæller som henvendelser, er mærket med `data-umami-event`: "Forespørgsel" (med værkets
titel), "Kontakt" (med emnet), "Instagram" og "Omtale". Lav nye knapper, der fører til en
henvendelse, så får de samme slags mærke.

Links, der deles i markedsføring, skal have UTM-mærker, så Umami kan se, hvor besøget kom fra:
`https://kristianverner.dk/?utm_source=instagram&utm_medium=bio`
`https://kristianverner.dk/vaerker/megalit/?utm_source=nyhedsbrev&utm_campaign=efteraar-2026`

## Design

Lys, varm papirbaggrund. Cormorant Garamond til overskrifter, Jost til resten. Messing som
eneste accent. Mørke felter bruges sparsomt, som et øjeblik, ikke som grundtone.
Kristians kunder er overvejende kvinder: elegant og let, ikke tungt og industrielt.
Billederne er taget med telefon i mange formater. Oversigterne beskærer dem ens (4:5),
værksiderne viser dem ubeskåret.

## Åbne punkter

- Logoet i `src/components/Logo.astro` er tegnet op efter et foto af visitkortet. Den rigtige vektorfil mangler.
- Mailadressen er hans private gmail, indtil der findes en på domænet.
- Fotografer er ikke krediteret. Flere af Sisyfos-billederne er tydeligt taget af professionelle.
