import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Feed from './Feed'


export default function Shelf({ mangas, title }) {
  return (
    <section className='h-full relative'>
      <div className='absolute z-20 w-full px-8 py-4 bg-gradient-to-b from-black/60'>
        <h2 className='text-white font-bold text-lg'>{title}</h2>
      </div>
      <div className='carousel h-full'>
        { mangas.map(manga => <ShelfItem manga={manga} key={manga.id}/>) }
      </div>
    </section>
  )
}

function ShelfItem({ manga }) {
  const [expand, setExpand] = useState(false)
  const [showFeed, setShowFeed] = useState(false)

  return (
    <article className='carousel-item h-full w-full card rounded-none relative'>
      <Image
        src={manga.coverArt.src}
        alt={manga.coverArt.alt}
        layout='fill'
        objectFit='cover'
        onClick={() => setShowFeed(true)}
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
          <h3
            className={`card-title 
            ${expand ? 'line-clamp-none' : 'line-clamp-1'}`}
          >
            { manga.title }
          </h3>
          <p
            className={`${expand ? 'line-clamp-none' : 'line-clamp-2'}`}
          >
            { manga.description }
          </p>
        </div>
      </div>

      { showFeed ? <Feed id={manga.id} title={manga.title} show={setShowFeed}/> : <></> }
    </article>
  )
}
