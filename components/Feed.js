import useSWRImmutable from 'swr/immutable'
import { getMangaFeed } from '../lib/fetching/mangadex'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'


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
    <section className="w-full h-full bg-base-100 absolute z-20">
      <div className="card h-full">
        <div className="card-body h-full">
          <header className="mb-2 card-title w-full break-words flex justify-between gap-x-4">
            <h4>{title}</h4>
            <button onClick={() => show(false)}>
              <FiArrowLeft />
            </button>
          </header>

          <div className="overflow-y-scroll">
            <table className="table table-fixed w-full">
              <thead>
                <tr>
                  <th className="whitespace-normal break-words">Chapter</th>
                  <th className="whitespace-normal break-words">User</th>
                  <th className="whitespace-normal break-words">Scanlation</th>
                </tr>
              </thead>
              <tbody>
                {
                  feed.map(chapter => (
                  <tr key={chapter.id}>
                    <td className="whitespace-normal break-words">{chapter.chapterNumber}</td>
                    <td className="whitespace-normal break-words">{chapter.username}</td>
                    <td className="whitespace-normal break-words">{chapter.scanlationGroup}</td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}


