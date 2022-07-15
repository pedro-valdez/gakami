import axios from 'axios'
import { sanitizeCustomList, sanitizeMangaList, sanitizeManga, sanitizeChapter, sanitizeMangaFeed, sanitizeChapterImages } from '../sanitizing/mangadex'


// Axios mangadex instance
const mangadex = axios.create({
  baseURL: 'https://api.mangadex.org/',
  timeout: 5000,
})

// Get requests
/*
 * As you can see, the structure of the get requests is the same across
 * all functions. This can be generalized. However, I find that generalizing
 * the structure of these particular functions makes them less readable.
 * Maybe in the future I'll find a good, readable, efficient way of 
 * generalizing these functions.
*/
export const getCustomList = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`list/${id}`, { ...config, params }).then(res => sanitizeCustomList(res, includes))

export const getMangaList = ({
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga`, { ...config, params }).then(res => sanitizeMangaList(res, includes))

export const getManga = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga/${id}`, { ...config, params }).then(res => sanitizeManga(res, includes))

export const getChapter = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`chapter/${id}`, { ...config, params }).then(res => sanitizeChapter(res, includes))

export const getChapterImages = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`at-home/server/${id}`, { ...config, params }).then(res => sanitizeChapterImages(res, includes))

export const getMangaFeed = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga/${id}/feed`, { ...config, params }).then(res => sanitizeMangaFeed(res, includes))

// Specific gets
export const getSeasonalMangaList = async () => {
  const id = '7df1dabc-b1c5-4e8e-a757-de5a2a3d37e9'
  const list = await getCustomList(id, {})
  const mangas = await getMangaList({
    params: {
      ids: list.mangas,
      includes: ['cover_art'],
      'order[followedCount]': 'desc',
      contentRating: ['safe'],
      hasAvailableChapters: true,
      limit: list.mangas.length,
    },
    includes: { coverArt: true },
  })

  return mangas
}
