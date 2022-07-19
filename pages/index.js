import Hero from '../components/Hero'
import Shelf from '../components/Shelf'
import { getSeasonalMangaList } from '../lib/fetching/mangadex'


export default function Home({ seasonal }) {
  return (
    <main className='h-full'>
      <Hero />
      <Shelf mangas={seasonal} title={'Seasonal'} />
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
