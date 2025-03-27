import Link from 'next/link'

export default function NavBar() {
  return (
    <header>
      <ul className='flex gap-3 p-3'>
        <li>
          <Link href="/create-post">Create blog post</Link>
        </li>
        <li>
          <Link href="/">View posts</Link>
        </li>
      </ul>
    </header>
  )
}