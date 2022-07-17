import { getChapterImages } from '../../lib/fetching/mangadex'


export default function Chapter({ images }) {
  console.log(images)

  return (
    <main>
      <div className='h-screen carousel carousel-vertical'>
        {
          images.images.map(image => (
            <div
              className='carousel-item h-full'
              key={image}>
              <img
                src={`${images.baseUrl}/data/${images.hash}/${image}`}
                alt=""
                className="carousel-item mx-auto"
              />
            </div>
          ))
        }
      </div>
    </main>
  )
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
