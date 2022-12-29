import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Logo} from './components/Logo'
import { SearchInput } from './components/SearchInput'
import { TopMenu } from './components/TopMenu'
import { Navigation } from './components/Navigation'
import { Products } from './components/Products'

export default function Home() {
  return (
    <>
      <Head>
        <title>devarmor</title>
        <meta name="description" content="The Dev Armor Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Offside&family=Zilla+Slab&family=Zilla+Slab+Highlight&display=swap" rel="stylesheet"></link>
      </Head>
      <main className={`${styles.main} grid grid-cols-3 gap-20 p-10 h-screen`}>
        <div>
          <Logo/>
        </div>
        <div>
          <SearchInput/>
        </div>
        <div>
          <TopMenu/>
        </div>
        <div>
          <Navigation/>
        </div>
        <div className="col-span-2 h-full overflow-auto">
          <Products/>
        </div>
      </main>
    </>
  )
}
