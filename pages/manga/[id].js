import { getManga, getMangaFeed } from '../../lib/fetching/mangadex'


export default function Manga({ manga, feed }) {
  console.log(manga, feed)

  return <div></div>
}

export async function getStaticProps({ params: { id } }) {
  const manga = await getManga(id, {})
  const feed = await getMangaFeed(id, {})

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
