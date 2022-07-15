import Image from 'next/image'


export default function Shelf({ mangas, title }) {
  return (
    <section>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight'>{title}</h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {
            mangas.map(manga => (
              <article className='card' key={manga.id}>
                <figure>
                  <Image
                    src={manga.coverArt.src}
                    alt={manga.coverArt.alt}
                    width={600}
                    height={900}
                  />
                </figure>
                <div className='card-body'>
                  <h1 className='card-title'>{manga.title}</h1>
                </div>
              </article>
            ))
          }
        </div>
      </div>
    </section>
  )
}
