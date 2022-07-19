import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


export default function Shelf({ mangas, title }) {
  return (
    <section className='h-full'>
      <div className='carousel h-full'>
        { mangas.map(manga => <ShelfItem manga={manga} key={manga.id}/>) }
      </div>
    </section>
  )
}

function ShelfItem({ manga }) {
  const [expand, setExpand] = useState(false)

  return (
    <article className='carousel-item h-full w-full card rounded-none relative'>
      <Image
        src={manga.coverArt.src}
        alt={manga.coverArt.alt}
        layout='fill'
        objectFit='cover'
      />
      <div
        className={`absolute bottom-0 bg-gradient-to-t break-words w-full 
        ${expand 
          ? `from-black/80 to-black/60 
          before:absolute before:py-8 before:top-0 
          before:-translate-y-full before:w-full 
          before:bg-gradient-to-t before:from-black/60`
          : 'pt-16 from-black/60'}
        `}
      >
        <div
          onClick={() => setExpand(!expand)}
          className='card-body max-h-full overflow-y-scroll text-white'>
          <h1
            className={`card-title 
            ${expand ? 'line-clamp-none' : 'line-clamp-1'}`}
          >
            { manga.title }
          </h1>
          <p
            className={`${expand ? 'line-clamp-none' : 'line-clamp-2'}`}
          >
            { manga.description }
          </p>
        </div>
      </div>
    </article>
  )
}
