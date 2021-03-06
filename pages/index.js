import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { createServer } from "miragejs"


createServer({
  routes() {
    this.get("/api/v1/pgs", () => ({
      pgs: [
        {
          id: 1,
          name: "VSS-MGMT-100"
        },
        {
          id: 2,
          name: "vDS-VMO-99"
        },
        {
          id: 3,
          name: "VSS-Storage-800"
        },
      ],
    }))
  },
})


export default function Home() {

  let [ports, setPorts] = useState([]);
  let [port, setPort] = useState('VSS-MGMT-100');

  useEffect(() => {
    fetch('/api/v1/pgs')
    .then(response => response.json())
    .then(data => setPorts(data.pgs))
  },[])

  const handleSelect = e => {
    console.log(e);
    setPort(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fetch data useEffect Hook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <label htmlFor="portgroups">Choose a portgroup:</label>

        <select name="pgs" onChange={handleSelect}>
          <optgroup label="pggroup">
          {ports && ports.map(p => (
            <option value={p.name} key={p.id}>{p.name}</option>
          ))}
        </optgroup>
        </select>
        <h2>The port you selected was: {port}</h2>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
