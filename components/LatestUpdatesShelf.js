import useSWR from 'swr'
import { getMangaList } from '../lib/fetching/mangadex'
import Shelf from './Shelf'


export default function LatestUpdates() {
  const { data: mangas, error } = useSWR({
    params: {
      includes: ['cover_art'],
      'order[latestUploadedChapter]': 'desc',
      contentRating: ['safe'],
      hasAvailableChapters: true,
      limit: 20,
    },
    includes: {
      coverArt: true,
    },
  }, getMangaList)
  const isLoading = !error && !mangas

  if (isLoading) {
    return <div className='h-full animate-pulse'></div>
  }

  return <Shelf mangas={mangas} title='Latest Updates'/>
}
