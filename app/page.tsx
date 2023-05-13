import styles from './page.module.css'

// Need full path url in server side rendering
async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`)
  if (!res.ok) {
    console.log(res)
  }
  return res.json();
}
export default async function Home() {
  const data = await getPosts()
  console.log(data)

  return (
    <main className={styles.main}>
      {data.map((post) => (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <h4>{post.content}</h4>
            <h4>{post.published.toString()}</h4>
        </div>
      ))}
    </main>
  )
}
