import Hero from '../components/Hero'
import Shelf from '../components/Shelf'
import LatestShelf from '../components/LatestUpdatesShelf'
import { getSeasonalMangaList } from '../lib/fetching/mangadex'


export default function Home({ seasonal }) {
  return (
    <main className='h-full'>
      <Hero />
      <Shelf mangas={seasonal} title={'Seasonal'} />
      <LatestShelf />
    </main>
  )
}

export async function getStaticProps() {
  const seasonal = await getSeasonalMangaList()

  return {
    props: {
      seasonal,
    },
  }
}
