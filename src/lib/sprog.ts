// Sitet findes på dansk, engelsk og fransk.
// Dansk ligger på kristianverner.dk/, engelsk på /en/ og fransk på /fr/.
// Her står de faste ord på siderne (menu, knapper, overskrifter) og adresserne på de tre sprog.
// Teksterne om værkerne og om Kristian ligger i indhold/oversat/en/ og indhold/oversat/fr/.
import { sti } from './sti';

export type Sprog = 'da' | 'en' | 'fr';
// Rækkefølgen, sprogene vises i: fransk, engelsk, dansk.
export const SPROGLISTE: Sprog[] = ['fr', 'en', 'da'];
export const SPROGNAVN: Record<Sprog, string> = { fr: 'Français', en: 'English', da: 'Dansk' };
export const KORT: Record<Sprog, string> = { fr: 'FR', en: 'EN', da: 'DA' };
export const LOCALE: Record<Sprog, string> = { da: 'da_DK', en: 'en_GB', fr: 'fr_FR' };

export type Sidenavn = 'forside' | 'vaerker' | 'om' | 'kontakt' | 'vaerksted';
const ADRESSER: Record<Sidenavn, Record<Sprog, string>> = {
  forside: { da: '/', en: '/en/', fr: '/fr/' },
  vaerker: { da: '/vaerker/', en: '/en/works/', fr: '/fr/oeuvres/' },
  om: { da: '/om/', en: '/en/about/', fr: '/fr/a-propos/' },
  kontakt: { da: '/kontakt/', en: '/en/contact/', fr: '/fr/contact/' },
  vaerksted: { da: '/vaerksted/', en: '/en/studio/', fr: '/fr/atelier/' },
};

export const adresse = (sprog: Sprog, side: Sidenavn) => sti(ADRESSER[side][sprog]);
export const vaerkAdresse = (sprog: Sprog, id: string) => sti(`${ADRESSER.vaerker[sprog]}${id}/`);

// Datoer skrives på sidens sprog, fx "22. oktober 2026", "22 October 2026", "22 octobre 2026".
export const datoTekst = (dato: string, sprog: Sprog) => {
  const d = new Date(`${dato}T12:00:00`);
  if (isNaN(d.getTime())) return dato;
  return d.toLocaleDateString({ da: 'da-DK', en: 'en-GB', fr: 'fr-FR' }[sprog], { day: 'numeric', month: 'long', year: 'numeric' });
};

// Den samme side på alle tre sprog. Bruges til sprogvalget og til at fortælle Google om de andre sprog.
export const alleSprog = (lav: (s: Sprog) => string) =>
  Object.fromEntries(SPROGLISTE.map((s) => [s, lav(s)])) as Record<Sprog, string>;

const ORD = {
  da: {
    vaerksted: 'Fra værkstedet',
    vaerkstedBeskrivelse: (navn: string) => `Et kig ind på værkstedet hos ${navn}: arbejdet, materialerne og det, der er på vej.`,
    seVaerkstedet: 'Se mere fra værkstedet',
    nytFraVaerkstedet: 'Nyt fra værkstedet',
    vaerker: 'Værker',
    om: 'Om',
    kontakt: 'Kontakt',
    forside: 'forside',
    seAlleVaerker: 'Se alle værker',
    omKristian: 'Om Kristian',
    portraet: 'Portræt af',
    lampebillede: 'med et af sine lysværker',
    skitse: 'Håndtegnet arbejdstegning af et lysværk',
    vedSisyfos: 'ved Sisyfos',
    vaerkerBeskrivelse: (navn: string) => `Skulpturer, lysværker og installationer af ${navn}. Alle værker er unika.`,
    aar: 'År',
    materiale: 'Materiale',
    maal: 'Mål',
    vaegt: 'Vægt',
    pris: 'Pris',
    status: 'Status',
    spoergTilVaerket: 'Spørg til værket',
    forrige: 'Forrige',
    naeste: 'Næste',
    flereVaerker: 'Flere værker',
    billede: 'billede',
    forrigeBillede: 'Forrige billede af',
    naesteBillede: 'Næste billede af',
    foto: 'Foto',
    vaerkAf: 'Værk af',
    kortFortalt: 'Kort fortalt',
    omtale: 'Omtale',
    lydTil: 'Slå lyden til',
    lydFra: 'Slå lyden fra',
    menu: 'Menu',
    vaelgSprog: 'Vælg sprog',
    // kontaktformularen
    hvadDrejerDet: 'Hvad drejer det sig om?',
    emner: ['Køb af et værk', 'Bestillingsopgave', 'Udstilling eller presse', 'Andet'],
    navn: 'Navn',
    email: 'E-mail',
    telefon: 'Telefon',
    ringesOp: '(hvis du hellere vil ringes op)',
    besked: 'Besked',
    send: 'Send',
    sender: 'Sender',
    note: 'Dine oplysninger bruges kun til at svare dig.',
    udfyld: 'Udfyld navn, e-mail og besked, så jeg kan svare dig.',
    kunneIkkeSendes: 'Beskeden kunne ikke sendes. Prøv igen, eller skriv direkte til',
    interesseret: 'Jeg er interesseret i',
    takStandard: 'Tak for din besked.',
  },
  en: {
    vaerksted: 'From the studio',
    vaerkstedBeskrivelse: (navn: string) => `A look inside the studio of ${navn}: the work, the materials and what is on its way.`,
    seVaerkstedet: 'More from the studio',
    nytFraVaerkstedet: 'New from the studio',
    vaerker: 'Works',
    om: 'About',
    kontakt: 'Contact',
    forside: 'home',
    seAlleVaerker: 'See all works',
    omKristian: 'About Kristian',
    portraet: 'Portrait of',
    lampebillede: 'with one of his light works',
    skitse: 'Hand-drawn working sketch of a light work',
    vedSisyfos: 'with Sisyphus',
    vaerkerBeskrivelse: (navn: string) => `Sculptures, light works and installations by ${navn}. Every work is unique.`,
    aar: 'Year',
    materiale: 'Material',
    maal: 'Dimensions',
    vaegt: 'Weight',
    pris: 'Price',
    status: 'Status',
    spoergTilVaerket: 'Enquire about this work',
    forrige: 'Previous',
    naeste: 'Next',
    flereVaerker: 'More works',
    billede: 'image',
    forrigeBillede: 'Previous image of',
    naesteBillede: 'Next image of',
    foto: 'Photo',
    vaerkAf: 'A work by',
    kortFortalt: 'In brief',
    omtale: 'Press and awards',
    lydTil: 'Turn sound on',
    lydFra: 'Turn sound off',
    menu: 'Menu',
    vaelgSprog: 'Choose language',
    hvadDrejerDet: 'What is it about?',
    emner: ['Buying a work', 'A commission', 'Exhibition or press', 'Something else'],
    navn: 'Name',
    email: 'Email',
    telefon: 'Phone',
    ringesOp: '(if you would rather I call you)',
    besked: 'Message',
    send: 'Send',
    sender: 'Sending',
    note: 'Your details are only used to reply to you.',
    udfyld: 'Please fill in your name, email and message so I can reply.',
    kunneIkkeSendes: 'Your message could not be sent. Please try again, or write directly to',
    interesseret: 'I am interested in',
    takStandard: 'Thank you for your message.',
  },
  fr: {
    vaerksted: 'À l’atelier',
    vaerkstedBeskrivelse: (navn: string) => `Un regard dans l’atelier de ${navn} : le travail, les matériaux et ce qui se prépare.`,
    seVaerkstedet: 'Plus d’images de l’atelier',
    nytFraVaerkstedet: 'Nouvelles de l’atelier',
    vaerker: 'Œuvres',
    om: 'À propos',
    kontakt: 'Contact',
    forside: 'accueil',
    seAlleVaerker: 'Voir toutes les œuvres',
    omKristian: 'À propos de Kristian',
    portraet: 'Portrait de',
    lampebillede: 'avec l’une de ses œuvres lumineuses',
    skitse: 'Dessin de travail d’une œuvre lumineuse, fait à la main',
    vedSisyfos: 'avec Sisyphe',
    vaerkerBeskrivelse: (navn: string) => `Sculptures, œuvres lumineuses et installations de ${navn}. Chaque œuvre est une pièce unique.`,
    aar: 'Année',
    materiale: 'Matériau',
    maal: 'Dimensions',
    vaegt: 'Poids',
    pris: 'Prix',
    status: 'Statut',
    spoergTilVaerket: 'Se renseigner sur l’œuvre',
    forrige: 'Précédente',
    naeste: 'Suivante',
    flereVaerker: 'Autres œuvres',
    billede: 'image',
    forrigeBillede: 'Image précédente de',
    naesteBillede: 'Image suivante de',
    foto: 'Photo',
    vaerkAf: 'Une œuvre de',
    kortFortalt: 'En bref',
    omtale: 'Presse et distinctions',
    lydTil: 'Activer le son',
    lydFra: 'Couper le son',
    menu: 'Menu',
    vaelgSprog: 'Choisir la langue',
    hvadDrejerDet: 'De quoi s’agit-il ?',
    emner: ['Acheter une œuvre', 'Une commande', 'Exposition ou presse', 'Autre'],
    navn: 'Nom',
    email: 'E-mail',
    telefon: 'Téléphone',
    ringesOp: '(si vous préférez que je vous appelle)',
    besked: 'Message',
    send: 'Envoyer',
    sender: 'Envoi en cours',
    note: 'Vos coordonnées servent uniquement à vous répondre.',
    udfyld: 'Merci d’indiquer votre nom, votre e-mail et votre message pour que je puisse vous répondre.',
    kunneIkkeSendes: 'Le message n’a pas pu être envoyé. Réessayez, ou écrivez directement à',
    interesseret: 'Je suis intéressé(e) par',
    takStandard: 'Merci pour votre message.',
  },
} as const;

export const ord = (sprog: Sprog) => ORD[sprog];

// Kategorier og status på værkerne.
const KATEGORI: Record<string, Record<Sprog, string>> = {
  skulptur: { da: 'Skulptur', en: 'Sculpture', fr: 'Sculpture' },
  lysværk: { da: 'Lysværk', en: 'Light work', fr: 'Œuvre lumineuse' },
  lampe: { da: 'Lysværk', en: 'Light work', fr: 'Œuvre lumineuse' },
  installation: { da: 'Installation', en: 'Installation', fr: 'Installation' },
};
export const kategoriTekst = (k: string, sprog: Sprog) => KATEGORI[k.toLowerCase()]?.[sprog] ?? k;

const STATUS: Record<string, Record<Sprog, string>> = {
  ledig: { da: 'Kan erhverves', en: 'Available', fr: 'Disponible' },
  solgt: { da: 'Solgt', en: 'Sold', fr: 'Vendue' },
  privateje: { da: 'I privateje', en: 'Private collection', fr: 'Collection privée' },
  udstillet: { da: 'Udstillet', en: 'On exhibition', fr: 'Exposée' },
  proces: { da: 'Under arbejde', en: 'Work in progress', fr: 'En cours' },
  forslag: { da: 'Projektforslag', en: 'Project proposal', fr: 'Projet' },
};
export const statusTekst = (s: string, sprog: Sprog) => STATUS[s.toLowerCase()]?.[sprog] ?? s;
