import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, getSortedPostsDataExternal } from '../lib/posts'

export default function Home({allPostsData, todosArray}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, my name is Tebello Ramantso and I'm a developer :).</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <hr />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={utilStyles.headingLg}>Todos from <a href="https://jsonplaceholder.typicode.com" target="blank"><strong>jsonplaceholder</strong></a></h2>
        <ul >
        {todosArray.map(({ id, completed, title }) => (
            <li className={utilStyles.listItem} key={id}>
                {title} |  {completed ? <span>Completed</span> : <span>Still to do</span>}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const todosArray = await getSortedPostsDataExternal();
  console.log(todosArray);
  return {
    props: {
      allPostsData,
      todosArray
    }
  }
}
