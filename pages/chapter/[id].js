import { getChapterImages } from '../../lib/fetching/mangadex'


export default function Chapter({ images }) {
  console.log(images)

  return <div></div>
}

export async function getStaticProps({ params: { id } }) {
  const images = await getChapterImages(id, {})

  return {
    props: {
      images,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
