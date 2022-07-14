import axios from 'axios'
import { sanitizeCustomList, sanitizeMangaList, sanitizeManga, sanitizeChapter } from '../sanitizing/mangadex'


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
}) => mangadex.get(`list/${id}`, { ...config, params }).then(sanitizeCustomList)

export const getMangaList = ({
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga`, { ...config, params }).then(sanitizeMangaList)

export const getManga = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga/${id}`, { ...config, params }).then(sanitizeManga)

export const getChapter = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`chapter/${id}`, { ...config, params }).then(sanitizeChapter)

export const getChapterImages = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`at-home/server/${id}`, { ...config, params })
