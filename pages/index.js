import { getSeasonalMangaList } from '../lib/fetching/mangadex'


export default function Home({ seasonal }) {
  console.log(seasonal)
  return (
    <h1 className='text-9xl font-black'>Hello, world!</h1>
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
