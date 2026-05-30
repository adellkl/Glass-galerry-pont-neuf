/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Artist, Artwork, Exhibition, NewsItem } from './types';
import { GALLERY_ARTWORKS } from './galleryArtworks';

function featuredForArtist(artistId: string, fallback: string): string {
  return GALLERY_ARTWORKS.find((a) => a.artistId === artistId)?.image ?? fallback;
}

export const ARTISTS: Artist[] = [
  {
    id: 'dominique-rayou',
    name: 'Dominique RAYOU',
    type: 'SCULPTOR',
    featuredImage: featuredForArtist('dominique-rayou', '/images/gallery/sculptors/sculptors-01-2489996626.jpg'),
    bioFr: 'Dominique RAYOU est un sculpteur français d\'exception. En travaillant le bronze de fonderie et la pureté des marbres blancs, il façonne des œuvres caractérisées par la tendresse infinie du geste, l\'harmonie des formes organiques d\'une pureté intemporelle et des rondeurs maternelles capturant la sérénité universelle.',
    bioEn: 'Dominique RAYOU is an exceptional French sculptor. Working with foundry bronze and the purity of white marble, he shapes artworks characterized by infinite tenderness of gesture, the harmony of timelessly pure organic forms, and maternal roundness capturing universal serenity.',
    mediumsFr: ['Bronze d\'Art', 'Marbre Blanc', 'Taille Directe'],
    mediumsEn: ['Art Bronze', 'White Marble', 'Direct Carving'],
    quoteFr: '« Tailler le marbre ou polir le bronze, c\'est chercher la douceur sacrée tapie au cœur de la matière brute. »',
    quoteEn: '“Carving marble or polishing bronze is to seek the sacred softness hidden in the heart of the raw material.”'
  },
  {
    id: 'serge-couvert',
    name: 'Serge COUVERT',
    type: 'SCULPTOR',
    featuredImage: featuredForArtist('serge-couvert', '/images/gallery/sculptors/sculptors-02-2489996627.jpg'),
    bioFr: `Né en 1953 en Savoie, Serge COUVERT passe son enfance dans son petit village en pleine transition entre la vie agropastorale de montagne et les débuts d'une conversion vers le tourisme.

Il commence à travailler à 17 ans dans l'atelier d'un menuisier d'Aussois. Après un CAP de menuiserie ébénisterie et quelques stages de formation artistique, il s'installe en 1976 comme artisan sculpteur sur bois. Très attaché à son village, il intègre également une association d'artisans pour développer les activités artistiques et artisanales locales.

Son travail s'oriente d'abord vers la fabrication de meubles, jouets et objets d'artisanat de sa propre création, puis évolue vers les statues baroques pour la restauration des églises locales. Cela l'amène naturellement à la pure sculpture sur bois, mettant en valeur la richesse des coloris et l'alliance d'essences variées. Il explore ensuite avec ferveur la pierre et le bronze d'art. Dans ses sculptures figuratives épurées, il s'efforce avant tout de restituer le mouvement et l'émotion pure.

Exposition exclusive et permanente depuis 2007 à la Galerie CLASS 41 à Paris (41, Rue Dauphine 75006).

Prix & Concours :
• 1994 : Concours « Solid'art Maurienne » pour un projet de puzzle de 5000 m2 — 2ème prix
• 1994, 1995, 1996, 1998 : Primé au concours international de sculpture de St-Michel de Maurienne
• 1995 : Salon des arts de Moutiers — 2ème prix
• 1996 : Festival international des arts de la rue à Dijon — 2ème prix
• 1996 : Concours de sculpture, station de ski de Karellis — 3ème prix
• 2003 : Concours de sculpture sur bois d'Avrieux — 1er prix
• 2011 : Concours international de sculpture de St-Michel de Maurienne — 1er prix`,
    bioEn: `Born in 1953 in Savoie, Serge COUVERT spent his childhood in a mountain village during its total transition from alpine agropastoral life to early tourism.

He started working at 17 in a carpenter's workshop in Aussois. After earning a certificate in carpentry and cabinetmaking alongside artistic training courses, he established himself as an independent wood sculptor in 1976. Deeply connected to his roots, he joined local craft associations to foster local artistic expression.

Initially crafting unique furniture, toys, and custom designs, his path expanded into sculpting baroque statues for church restoration and architectural elements. This naturally led him to direct sculpture, where he highlights the organic richness, colors, and textures of mixed wood species, eventually expanding into stone and bronze. His refined figurative sculptures capture elegant human motions and raw emotions.

Exclusive and permanent exhibition since 2007 at Galerie CLASS 41 in Paris (41, Rue Dauphine 75006).

Competitions & Awards:
• 1994: "Solid'art Maurienne" (5000 m2 puzzle) — 2nd Prize
• 1994, 1995, 1996, 1998: International Sculpture Competition of St-Michel de Maurienne — Winner
• 1995: Moutiers Art Exhibition — 2nd Prize
• 1996: Dijon International Street Arts Festival — 2nd Prize
• 1996: Karellis Ski Station Sculpture Contest — 3rd Prize
• 2003: Avrieux Wood Sculpture Competition — 1st Prize
• 2011: International Sculpture Competition of St-Michel de Maurienne — 1st Prize`,
    mediumsFr: ['Bronze d\'Art de Fonderie', 'Chêne & Châtaignier sculpté', 'Monolithes'],
    mediumsEn: ['Foundry Art Bronze', 'Carved Oak & Chestnut', 'Monoliths'],
    quoteFr: '« Le sculpteur ne crée pas la forme ; il écoute la matière et lui permet de se dresser, fière et verticale, face aux hommes. »',
    quoteEn: '“The sculptor does not create form; he listens to the material and allows it to stand, proud and vertical, before humanity.”'
  },
  {
    id: 'irini',
    name: 'IRINI',
    type: 'PAINTER',
    featuredImage: featuredForArtist('irini', '/images/gallery/painters/painters-02-2489176450.jpg'),
    bioFr: `Membre de la Société des Artistes de Russie, IRINI éait née à Moscou en 1958. Diplômée en ingénierie de production textile et en cartographie (MIIGAiK), elle cultive d'abord sa fibre artistique par l'apprentissage du violon au conservatoire avec le professeur Podgorny AP, puis par le violon jazz à la fin de ses études secondaires.

Parallèlement à la musique, elle se passionne pour la peinture, la décoration et l'artisanat d'art. Au milieu des années 80, à l'aube des réformes en Union Soviétique, elle fonde son propre studio de théâtre pour enfants (« Unit ») à Moscou, qu'elle dirige jusqu'en 1992.

Durant les années de transition difficiles qui suivirent, IRINI se consacre entièrement à la peinture pour y trouver la paix de l'esprit. Ses participations à de nombreuses expositions rencontrent un vif succès auprès du public.

Ses lignes de recherche artistique englobent l'expressionnisme abstrait, l'impressionnisme, le courant de recherche personnelle « Métaphysique de la perception », l'aquarelle, le portrait d'art et la fresque. Ses genres de prédilection sont le paysage urbain grand format, les motifs floraux et les réalités parallèles.

Au cours de la dernière décennie, l'artiste Irini a réalisé plus de 40 expositions personnelles dans de prestigieuses galeries moscovites (CDA, Maison des Arts, Galerie Tushino, Théâtre Lenkom VVC, Sokolniki, etc.). Distinguée par un diplôme d'honneur au Salon des Artistes de Moscou en 2001 (« DE BON OBRAZY ») et répertoriée à son catalogue officiel, elle a également reçu un diplôme pour sa participation à l'exposition d'envergure « L'Ère du Verseau » à Moscou en 2010.`,
    bioEn: `IRINI, a member of the Society of Artists of Russia, was born in Moscow in 1958. She holds degrees in garment production engineering and mapping engineering (MIIGAiK). She realized her creative potential initially studying violin at the music school with teacher Podgorny AP, then later taking private lessons in jazz violin.

Apart from music, she was highly passionate about painting, decorating, and arts and crafts. In the mid-1980s, during the early reforms in the Soviet Union, she opened her own children's studio theater ("Unit") in Moscow, managing it until 1992.

During the challenging transition years that followed, IRINI devoted herself completely to painting, finding there her peace of mind. Her participation in various art exhibitions has brought great satisfaction, drawing enthusiastic attention from audiences.

Her academic and professional directions cover abstract expressionism, impressionism, her proprietary research style "Metaphysics of perception", watercolor painting, artistic portraits, and frescoes. Her favorite genres include portraits, full-scale urban landscapes, flowers, and separate realities.

Over the last ten years, Irini has held more than 40 solo exhibitions in various galleries across Moscow and the Moscow region (CDA, House of Arts, Tushino Hall, Lenkom Theatre, VVC, Sokolniki, Russian State University, etc.). She was awarded an honorary diploma for her participation in the Central House of Artists exhibition in 2001 ("DE BON OBRAZY") and included in its official catalog, as well as a diploma for the "Age of Aquarius" exhibition in Moscow in 2010.`,
    mediumsFr: ['Huile sur toile', 'Pigments naturels', 'Technique mixte'],
    mediumsEn: ['Oil on canvas', 'Natural pigments', 'Mixed media'],
    quoteFr: '« L\'abstraction me permet de toucher à l\'intimité du silence, là où les mots fléchissent mais où la matière chante toujours. »',
    quoteEn: '“Abstraction allows me to touch the intimacy of silence, where words falter but the canvas always sings.”'
  },
  {
    id: 'arthur-gaida',
    name: 'Arthur GAÏDA',
    type: 'PAINTER',
    featuredImage: featuredForArtist('arthur-gaida', '/images/gallery/painters/painters-03-2489176451.jpg'),
    bioFr: `Né en 1969, Arthur GAÏDA réalise des compositions dans un style pictural où se côtoient Surréalisme et Hyperréalisme, et auxquels se marie l’art du Trompe l'œil.

Ses tableaux expriment toujours une symbolique liée à l'existence humaine ou végétale, avec l'implication de rébus qui traduisent sa vision optimiste du devenir de l'humanité.

Sa composition juxtapose la vérité des éléments positifs et négatifs qui animent notre société. En effet, dans un périmètre pollué par une boîte métallique et une chaussure abandonnée qui se désagrègent, et sur une minuscule parcelle de terre protégée par la palissade qui vieillit en exprimant encore la vitalité de son bois, il exprime à travers ses toiles son engagement pour la nature trop souvent « abimée » par l'homme.

Gaïda retrace une composante de l’histoire de notre humanité par le truchement de cette boisson vieille comme le monde, le vin. Le cep de vigne qui supporte les grappes de raisin demeure isolé de la propriété viticole qui réalise la vinification en se protegeant derrière la toile-bouclier pour matérialiser le message de l’artiste, si cette boisson universelle est consommée avec raison, elle reste synonyme de plaisir. Le tiroir ouvert attend que l’on y dépose les textes de la sagesse.

En équilibre sur l’appui dont se servent les peintres pour réaliser les grands formats, observe l’artiste dissimulé derrière la toile, pour tenter de deviner ses états d’âme dans un moment où la sérénité la plus absolue est requise par le peintre afin de parvenir à l’aboutissement de son projet. Et dans les moments souvent difficiles subis par tous les artistes créateurs en recherche du résultat souhaité, des images d’intense bonheur effacent certains doutes, comme cette floraison luxuriante qui embellit l’âpreté de la toile.`,
    bioEn: `Arthur Gaïda (born 1969) creates compositions in a pictorial style where Surrealism meets Hyperrealism, and with which the art of “Trompe l'oeil” is combined.

His paintings always express a symbolism linked to human or plant existence, with the involvement of rebuses that reflect his optimistic vision of the future of humanity.

Its composition juxtaposes the truth of the positive and negative elements that animate our society. In fact, in a perimeter polluted by an abandoned metal box and an abandoned shoe, and on a tiny piece of land protected by the aging palisade, still expressing the vitality of his wood, he expresses through his paintings his commitment to nature too often "ruined" by man.

Gaida traces a component of the history of our humanity through this drink as old as the world, wine. The grapevine vine that supports grapes remains isolated from the winemaking estate that makes the winemaking by protecting behind the shield-cloth to materialize the message of the artist, if this universal drink is consumed with reason, it remains synonym of pleasure. The open drawer waits for the texts of wisdom to be placed there.

Balancing on the support used by painters to make large formats, observes the artist hidden behind the canvas, to try to guess his feelings at a time when the absolute serenity is required by the painter to achieve the success of his project. And in the often-difficult moments experienced by all creative artists in search of the desired result, images of intense happiness erase certain doubts, such as this lush flowering that embellishes the scarcity of the canvas.`,
    mediumsFr: ['Huile sur toile', 'Trompe l\'œil', 'Surréalisme & Hyperréalisme'],
    mediumsEn: ['Oil on canvas', 'Trompe l’oeil', 'Surrealism & Hyperrealism'],
    quoteFr: '« Mes tableaux expriment toujours une symbolique liée à l’existence humaine ou végétale, mêlant surréalisme et trompe l’œil. »',
    quoteEn: '“My paintings always express a symbolism linked to human or plant existence, combining surrealism with trompe l\'oeil.”'
  },
  {
    id: 'jean-pierre-umberto',
    name: 'Jean-Pierre UMBERTO',
    type: 'GLASS',
    featuredImage: featuredForArtist('jean-pierre-umberto', '/images/gallery/glass/glass-01-2434474031.jpg'),
    bioFr: 'Formé aux techniques ancestrales de Murano, Jean-Pierre UMBERTO maîtrise la fusion de la silice qu\'il pousse vers l\'épure absolue. Ses sculptures de verre soufflé de forte épaisseur jouent avec la gravité, emprisonnant des bulles d\'un vide parfait et réfractant la lumière en spectres lunaires.',
    bioEn: 'Trained in ancestral Murano techniques, Jean-Pierre UMBERTO commands the fusion of silica, pushing it toward absolute minimalism. His thick-blown glass structures play with gravity, trapping bubbles of perfect vacuum and refracting light in lunar spectrums.',
    mediumsFr: ['Cristal de Quartz soufflé', 'Verre fusionné multi-couches', 'Pâte de verre'],
    mediumsEn: ['Blown Quartz Crystal', 'Multi-layer fused glass', 'Pâte de verre'],
    quoteFr: '« Le verre n\'est pas solide, c\'est un liquide en suspens, un instant de lumière figé dans le froid de la matière. »',
    quoteEn: '“Glass is not solid, it is a liquid suspended, a moment of light frozen in the coldness of material.”'
  }
];

export const ARTWORKS: Artwork[] = GALLERY_ARTWORKS;

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 'permanent-bronzes',
    titleFr: 'BRONZES PERMANENTS : Serge COUVERT & Dominique RAYOU',
    titleEn: 'PERMANENT BRONZES: Serge COUVERT & Dominique RAYOU',
    dateRangeFr: 'Exposition Permanente',
    dateRangeEn: 'Permanent Exhibition',
    descriptionFr: 'Retrouvez en permanence au cœur de la galerie Pont-Neuf l\'alliance poétique de deux maîtres sculpteurs contemporains. Les volumes fluides de Dominique Rayou dialoguent en parfaite harmonie avec la verticalité puissante de Serge Couvert.',
    descriptionEn: 'Experience permanently in the heart of Pont-Neuf gallery the poetic alliance of two contemporary master sculptors. Dominique Rayou\'s fluid structures dialogue in perfect harmony with the powerful verticality of Serge Couvert.',
    featuredArtists: ['dominique-rayou', 'serge-couvert'],
    image: '/images/gallery/sculptors/sculptors-01-2489996626.jpg',
    status: 'PERMANENT'
  },
  {
    id: 'irini-online',
    titleFr: 'IRINI : Toiles Abstraites éphémères',
    titleEn: 'IRINI: Ephemeral Abstract Canvases',
    dateRangeFr: 'Vente Exclusive En Ligne',
    dateRangeEn: 'Exclusive Online Sale',
    descriptionFr: 'Les peintures d\'IRINI sont actuellement disponibles UNIQUEMENT à la vente en ligne. Une occasion rare d\'acquérir des pièces majeures depuis notre portail sécurisé avec expédition assurée mondiale.',
    descriptionEn: 'IRINI\'s paintings are currently available ONLY via online orders. A rare opportunity to acquire major paintings directly from our secure portal with insured global delivery.',
    featuredArtists: ['irini'],
    image: '/images/gallery/painters/painters-02-2489176450.jpg',
    status: 'TEMPORARY'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    date: '2026-05-15',
    titleFr: 'Nouvel écrin : ART GALLERY PONT-NEUF',
    titleEn: 'New Location: ART GALLERY PONT-NEUF',
    tagFr: 'Vie de la galerie',
    tagEn: 'Gallery Life',
    contentFr: 'Chers clients, chers collectionneurs, chers amis, Nous serons ravis de vous accueillir à nouveau à notre nouvelle adresse au 9, rue Dauphine 75006 à Paris à ART GALLERY PONT-NEUF. À très bientôt.',
    contentEn: 'Dear customer, dear collector of CLASS GALLERY-PARIS, We will be delighted to welcome you again this time at our new location: ART GALLERY PONT-NEUF. See you soon.'
  },
  {
    id: 'news-2',
    date: '2026-04-10',
    titleFr: 'Commandes d\'œuvres en ligne d\'IRINI',
    titleEn: 'Online Art Orders for IRINI\'s Paintings',
    tagFr: 'Vente en ligne',
    tagEn: 'Online Sales',
    contentFr: 'Nous attirons votre attention sur le fait que l\'ensemble des œuvres picturales de l\'artiste IRINI sont en vente exclusive en ligne. Le reste de notre collection (bronzes, marbres et verres) est visible en galerie sur rendez-vous ou à nos horaires d\'ouverture réguliers.',
    contentEn: 'Please note that the entire painterly collection of our artist IRINI is exclusively available for purchase online. The remainder of our collection (bronzes, marbles, and glass art) can be viewed in our gallery room.'
  }
];

export const GALLERY_INFO = {
  name: 'CLASS GALLERY-PARIS',
  space: 'ART GALLERY PONT-NEUF',
  address: '9, RUE DAUPHINE - PARIS 75006',
  phone: '+33 (0) 6 16 92 57 53',
  whatsapp: '+33616925753',
  owner: 'Marc MNEIMNÉ',
  instagram: 'class_gallery_paris',
  hoursFr: 'Du Mardi au Samedi : 11h00 - 19h00 (Ou sur rendez-vous)',
  hoursEn: 'Tuesday to Saturday: 11:00 AM - 7:00 PM (Or by appointment)'
};
