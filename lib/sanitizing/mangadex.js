// CONSTANTS ==================================================================
const coverArtBaseURL = 'https://uploads.mangadex.org/covers'

// HELPER FUNCTIONS ===========================================================
// For filters
const byType = type => rel => rel.type === type
const byManga = byType('manga')
const byCover = byType('cover_art')
const byScanlation = byType('scanlation_group')
const byUser = byType('user')

// For maps
const toAttribute = attribute => res => res[attribute]
const toId = toAttribute('id')

// Other
/*
 * For now we'll keep it english centric,
 * but in the future the user will select a prefered language.
*/
const languageFinder = (obj) => obj.en ?? obj.ja ?? ''

// SANITIZING FUNCTIONS =======================================================
export const sanitizeCustomList = (res) => {
  const list = res.data.data
  const { attributes, id, relationships } = list
  const { name } = attributes
  const mangas = relationships
    .filter(byManga)
    .map(toId)

  return {
    id,
    mangas,
    name,
  }
}

export const sanitizeManga = (res, includes = {}) => {
  const manga = res?.data?.data ?? res
  const { attributes, id, relationships } = manga
  const title = languageFinder(attributes.title)
  const description = languageFinder(attributes.description)
  const coverArt = {
    src: '',
    alt: '',
  }

  if (includes.coverArt) {
    const coverRelationship = relationships.find(byCover)

    // Possible for cover not to exist
    if (coverRelationship) {
      const { fileName } = coverRelationship.attributes

      coverArt.src = `${coverArtBaseURL}/${id}/${fileName}`
      coverArt.alt = '' // Empty for now, maybe in the future it'll be something useful
    }
  }

  return {
    coverArt,
    description,
    id,
    title,
  }
}

export const sanitizeMangaList = (res, includes = {}) => {
  /*
   * Just to be safe, I'll filter the list making sure everything is of
   * manga type. I think sometimes the list might contain other types
   * of resources like author or artists or whatever.
  */
  const list = res.data.data
  const mangas = list.filter(byManga)

  return mangas.map(manga => sanitizeManga(manga, includes))
}

export const sanitizeChapter = (res, includes) => {
  const chapter = res?.data?.data ?? res
  const { id, attributes, relationships } = chapter
  const { volume, chapter: chapterNumber, title } = attributes
  const mangaId = relationships.find(byManga)?.id
  let scanlationGroup = ''
  let username = ''

  if (includes.scanlationGroup) {
    const group = relationships.find(byScanlation)

    if (group) {
      scanlationGroup = group.attributes.name
    }
  }

  if (includes.user) {
    const user = relationships.find(byUser)

    if (user) {
      username = user.attributes.username
    }
  }

  return {
    id,
    volume,
    chapterNumber,
    title,
    mangaId,
    scanlationGroup,
    username,
  }
}

export const sanitizeMangaFeed = (res, includes = {}) => {
  const list = res.data.data
  const feed = list.map(chapter => sanitizeChapter(chapter, includes))

  return feed
}

export const sanitizeChapterImages = (res, includes = {}) => {
  const list = res.data
  const { baseUrl, chapter: { data: images, hash } } = list

  return {
    baseUrl,
    images,
    hash,
  }
}
