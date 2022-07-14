// CONSTANTS ==================================================================
const coverArtBaseURL = 'https://uploads.mangadex.org/covers'

// HELPER FUNCTIONS ===========================================================
// For filters
const byType = type => rel => rel.type === type
const byManga = byType('manga')
const byCover = byType('cover_art')

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
export const sanitizeCustomList = ({ attributes, id, relationships }) => {
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

export const sanitizeManga = ({ attributes, id, relationships }, options = {}) => {
  const title = languageFinder(attributes.title)
  const description = languageFinder(attributes.description)
  const coverArt = {
    src: '',
    alt: '',
  }

  if (options.coverArt) {
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

export const sanitizeMangaList = (list, options = {}) => {
  /*
   * Just to be safe, I'll filter the list making sure everything is of
   * manga type. I think sometimes the list might contain other types
   * of resources like author or artists or whatever.
  */
  const mangas = list.filter(byManga)

  return mangas.map(manga => sanitizeManga(manga, options))
}

export const sanitizeChapter = (chapter, options) => {
  const { id, attributes, relationships } = chapter
  const { volume, chapter: chapterNumber, title } = attributes
  const mangaId = relationships.find(byManga)?.id

  return {
    id,
    volume,
    chapterNumber,
    title,
    mangaId,
  }
}

export const sanitizeMangaFeed = (list, options) => {
  const feed = list.map(chapter => sanitizeChapter(chapter))

  return feed
}
