import Link from 'next/link'

export default function NavBar() {
  return (
    <header>
      <ul className='flex gap-4 p-3'>
        <li className='p-6'>
          <Link href="/create-post">Create blog post</Link>
        </li>
        <li className='p-6'>
        <Link href={`/user-profile/`}>Update profile</Link>
        </li>
        <li className='p-6'>
          <Link href="/">View posts</Link>
        </li>
        <li className='p-6'>
          <Link href="/register">Register to post blogs</Link>
          </li>
          <li className='p-6'>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </header>
  )
}