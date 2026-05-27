/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 
  | 'HOME' 
  | 'GALLERY' 
  | 'ARTISTS'
  | 'PAINTERS' 
  | 'SCULPTORS' 
  | 'GLASS' 
  | 'EXHIBITIONS' 
  | 'CONTACT' 
  | 'MAP' 
  | 'LEGAL'
  | 'SITEMAP';

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  category: 'PAINTERS' | 'SCULPTORS' | 'GLASS';
  medium: string;
  year: string;
  dimensions: string;
  material: string;
  image: string;
  descriptionFr: string;
  descriptionEn: string;
  isOnlineOnly: boolean;
  price?: string;
  onExhibit: boolean;
}

export interface Artist {
  id: string;
  name: string;
  type: 'PAINTER' | 'SCULPTOR' | 'GLASS';
  featuredImage: string;
  bioFr: string;
  bioEn: string;
  mediumsFr: string[];
  mediumsEn: string[];
  quoteFr?: string;
  quoteEn?: string;
}

export interface Exhibition {
  id: string;
  titleFr: string;
  titleEn: string;
  dateRangeFr: string;
  dateRangeEn: string;
  descriptionFr: string;
  descriptionEn: string;
  featuredArtists: string[];
  image: string;
  status: 'PERMANENT' | 'TEMPORARY';
}

export interface NewsItem {
  id: string;
  date: string;
  titleFr: string;
  titleEn: string;
  contentFr: string;
  contentEn: string;
  tagFr: string;
  tagEn: string;
}
