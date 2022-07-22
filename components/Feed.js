import useSWRImmutable from 'swr/immutable'
import { getMangaFeed } from '../lib/fetching/mangadex'
import Link from 'next/link'


export default function Feed({ id, title, show }) {
  const { data: feed, error } = useSWRImmutable([id, {
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
  }], getMangaFeed)
  const isLoading = !error && !feed

  if (isLoading) {
    return (
      <div className='carousel-item h-full w-full'>
      </div>
    )
  }

  return (
    <section className='absolute h-full w-full z-20 bg-base-100'>
      <header>
        <h3>{ title }</h3>
        <button onClick={() => show(false)}>x</button>
      </header>

      <div>
        <div className='flex w-full'>
          <p className='basis-full'>Chapter</p>
          <p className='basis-full'>User</p>
          <p className='basis-full'>Scanlation</p>
        </div>
        {
          feed.map(chapter => (
            <Link href={`chapter/${chapter.id}`} key={chapter.id}>
              <article className='flex w-full'>
                <p className='basis-full'>{ chapter.chapterNumber }</p>
                <p className='basis-full'>{ chapter.username }</p>
                <p className='basis-full'>{ chapter.scanlationGroup }</p>
              </article>
            </Link>
          ))
        }
      </div>
    </section>
  )
}


