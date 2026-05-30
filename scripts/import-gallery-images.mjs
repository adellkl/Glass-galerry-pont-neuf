/**
 * Importe les images du dossier GALERIE CLASS 41 Paris_IMAGES vers public/
 * et génère src/galleryArtworks.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'GALERIE CLASS 41 Paris_IMAGES');
const PUBLIC_DIR = path.join(ROOT, 'public', 'images', 'gallery');
const OUTPUT_TS = path.join(ROOT, 'src', 'galleryArtworks.ts');

/** IDs d’assets site (drapeaux, logos) — pas des œuvres */
const EXCLUDED_ASSET_IDS = new Set(['2416109250']);

const FOLDER_CONFIG = {
  'GALERIE CLASS 41 Paris_ (1)': {
    slug: 'sculptors',
    category: 'SCULPTORS',
    artistIds: ['dominique-rayou', 'serge-couvert'],
    artistNames: ['Dominique RAYOU', 'Serge COUVERT'],
    onExhibit: true,
    isOnlineOnly: false,
    titlePrefixFr: 'Sculpture',
    titlePrefixEn: 'Sculpture',
    mediumFr: 'Bronze, marbre ou bois sculpté',
    mediumEn: 'Bronze, marble or carved wood',
    materialFr: 'Sculpture',
    materialEn: 'Sculpture',
    descFr: (n, artist) =>
      `Pièce ${n} de la collection permanente de ${artist}, exposée à la galerie CLASS 41 Paris.`,
    descEn: (n, artist) =>
      `Piece ${n} from ${artist}'s permanent collection, on view at Galerie CLASS 41 Paris.`,
  },
  'GALERIE CLASS 41 Paris_ (2)': {
    slug: 'glass',
    category: 'GLASS',
    artistIds: ['jean-pierre-umberto'],
    artistNames: ['Jean-Pierre UMBERTO'],
    onExhibit: true,
    isOnlineOnly: false,
    titlePrefixFr: 'Verre soufflé',
    titlePrefixEn: 'Blown glass',
    mediumFr: 'Verre soufflé et sculpté',
    mediumEn: 'Blown and sculpted glass',
    materialFr: 'Verre d\'art',
    materialEn: 'Art glass',
    descFr: (n, artist) =>
      `Œuvre en verre ${n} de ${artist} — prismes, bulles et lumière capturés dans la matière.`,
    descEn: (n, artist) =>
      `Glass work ${n} by ${artist} — light, bubbles and form captured in silica.`,
  },
  'GALERIE CLASS 41 Paris_': {
    slug: 'painters',
    category: 'PAINTERS',
    artistIds: ['irini', 'arthur-gaida'],
    artistNames: ['IRINI', 'Arthur GAÏDA'],
    onExhibit: false,
    isOnlineOnlyByArtist: { irini: true, 'arthur-gaida': false },
    titlePrefixFr: 'Toile',
    titlePrefixEn: 'Canvas',
    mediumFr: 'Huile ou technique mixte sur toile',
    mediumEn: 'Oil or mixed media on canvas',
    materialFr: 'Peinture',
    materialEn: 'Painting',
    descFr: (n, artist) =>
      `Tableau ${n} de ${artist}, issu du catalogue de la Galerie CLASS 41.`,
    descEn: (n, artist) =>
      `Painting ${n} by ${artist}, from the Galerie CLASS 41 catalog.`,
  },
};

function isArtworkFile(name) {
  return (
    /_(thumb|cache)_\d+\.(jpe?g|png|gif)$/i.test(name) &&
    !/mt_|printer|logo|emotion|teaser|separator|navigation|subnav/i.test(name)
  );
}

function assetIdFromName(name) {
  const m = name.match(/_(?:thumb|cache)_(\d+)\./i);
  return m ? m[1] : null;
}

function scoreFile(name) {
  let score = 0;
  if (/cache_/i.test(name)) score += 10;
  if (/thumb_/i.test(name)) score += 5;
  if (/\.jpe?g$/i.test(name)) score += 2;
  return score;
}

function collectImagesFromFolder(folderPath) {
  const byId = new Map();
  if (!fs.existsSync(folderPath)) return [];

  for (const name of fs.readdirSync(folderPath)) {
    if (!isArtworkFile(name)) continue;
    const id = assetIdFromName(name);
    if (!id || EXCLUDED_ASSET_IDS.has(id)) continue;
    const full = path.join(folderPath, name);
    const prev = byId.get(id);
    if (!prev || scoreFile(name) > scoreFile(prev.name)) {
      byId.set(id, { id, name, full });
    }
  }

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const artworks = [];
  let globalIndex = 0;

  if (fs.existsSync(PUBLIC_DIR)) {
    fs.rmSync(PUBLIC_DIR, { recursive: true });
  }
  ensureDir(PUBLIC_DIR);

  for (const [folderName, config] of Object.entries(FOLDER_CONFIG)) {
    const folderPath = path.join(SOURCE_DIR, folderName);
    const images = collectImagesFromFolder(folderPath);
    const destDir = path.join(PUBLIC_DIR, config.slug);
    ensureDir(destDir);

    images.forEach((img, index) => {
      const artistIdx = index % config.artistIds.length;
      const artistId = config.artistIds[artistIdx];
      const artistName = config.artistNames[artistIdx];
      const num = String(index + 1).padStart(2, '0');
      const ext = path.extname(img.name).toLowerCase();
      const fileName = `${config.slug}-${num}-${img.id}${ext}`;
      const destPath = path.join(destDir, fileName);
      fs.copyFileSync(img.full, destPath);

      const publicPath = `/images/gallery/${config.slug}/${fileName}`;
      const isOnlineOnly =
        config.isOnlineOnlyByArtist?.[artistId] ?? config.isOnlineOnly ?? false;

      globalIndex += 1;
      artworks.push({
        id: `gallery-${config.slug}-${num}`,
        title: `${config.titlePrefixFr} ${num}`,
        titleEn: `${config.titlePrefixEn} ${num}`,
        artistId,
        artistName,
        category: config.category,
        medium: config.mediumFr,
        mediumEn: config.mediumEn,
        year: '—',
        dimensions: 'Sur demande',
        dimensionsEn: 'On request',
        material: config.materialFr,
        materialEn: config.materialEn,
        image: publicPath,
        descriptionFr: config.descFr(num, artistName),
        descriptionEn: config.descEn(num, artistName),
        isOnlineOnly,
        onExhibit: config.onExhibit,
        price: isOnlineOnly ? 'Sur demande' : undefined,
      });
    });

    console.log(`${folderName}: ${images.length} œuvre(s) → ${config.slug}/`);
  }

  const ts = `/**
 * Généré par scripts/import-gallery-images.mjs — ne pas modifier à la main.
 * Relancer: npm run import:gallery
 */
import type { Artwork } from './types';

export const GALLERY_ARTWORKS: Artwork[] = ${JSON.stringify(
    artworks.map((a) => ({
      id: a.id,
      title: a.title,
      artistId: a.artistId,
      artistName: a.artistName,
      category: a.category,
      medium: a.medium,
      year: a.year,
      dimensions: a.dimensions,
      material: a.material,
      image: a.image,
      descriptionFr: a.descriptionFr,
      descriptionEn: a.descriptionEn,
      isOnlineOnly: a.isOnlineOnly,
      onExhibit: a.onExhibit,
      ...(a.price ? { price: a.price } : {}),
    })),
    null,
    2,
  )};

export const GALLERY_ARTWORK_COUNT = ${artworks.length};
`;

  fs.writeFileSync(OUTPUT_TS, ts, 'utf8');
  console.log(`\nTotal: ${artworks.length} œuvres → ${OUTPUT_TS}`);
}

main();
