import Hero from '../../components/MangaHero'
import Feed from '../../components/Feed'
import { getManga, getMangaFeed } from '../../lib/fetching/mangadex'


export default function Manga({ manga, feed }) {
  return (
    <div>
      <Hero {...manga}/>

      <Feed feed={feed}/>
    </div>
  )
}

export async function getStaticProps({ params: { id } }) {
  const manga = await getManga(id, {
    params: {
      includes: ['cover_art'],
    },
    includes: {
      coverArt: true,
    },
  })
  const feed = await getMangaFeed(id, {
    params: {
      includes: ['scanlation_group', 'user'],
      'order[volume]': 'desc',
      'order[chapter]': 'desc',
      offset: 0,
      contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
    },
    includes: {
      scanlationGroup: true,
      user: true,
    },
  })

  return {
    props: {
      manga,
      feed,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
