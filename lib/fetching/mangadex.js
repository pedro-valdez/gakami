import axios from 'axios'


// Axios mangadex instance
const mangadex = axios.create({
  baseURL: 'https://api.mangadex.org/',
  timeout: 5000,
})

// Get requests
const getCustomList = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`list/${id}`, { ...config, params })

const getMangaList = ({
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga`, { ...config, params })

const getManga = (id, {
  config = {},
  params = {},
  includes = {},
}) => mangadex.get(`manga/${id}`, { ...config, params })
