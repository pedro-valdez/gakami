import Link from 'next/link'


export default function Feed({ feed }) {
  return (
    <section>
      <table className='table'>
        <thead>
          <tr>
            <th>Chapter number</th>
            <th>User</th>
            <th>Scanlation group</th>
          </tr>
        </thead>

        <tbody>
          {
            feed.map(chapter => (
              <Link href={`/chapter/${chapter.id}`} key={chapter.id}>
                <tr>
                  <td>{ chapter.chapterNumber }</td>
                  <td>{ chapter.username }</td>
                  <td>{ chapter.scanlationGroup }</td>
                </tr>
              </Link>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}
