import useSWRImmutable from 'swr/immutable'
import { getMangaList } from '../lib/fetching/mangadex'
import Shelf from './Shelf'

export default function SearchShelf({ search }) {
  const { data: mangas, error } = useSWRImmutable({
    params: {
      includes: ['cover_art'],
      'order[relevance]': 'desc',
      contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
      limit: 10,
      title: search,
    },
    includes: {
      coverArt: true,
    },
  }, getMangaList)
  const isLoading = !error && !mangas

  if (isLoading) { return <div></div> }

  return <Shelf mangas={mangas} title={`Result for ${search}`}/>
}
