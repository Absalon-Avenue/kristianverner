// Laver interne links, der virker både på kristianverner.dk og på en midlertidig adresse.
const rod = import.meta.env.BASE_URL.replace(/\/$/, '');
export const sti = (p: string) => `${rod}${p.startsWith('/') ? p : `/${p}`}`;
