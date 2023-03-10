import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import products from "../data/products.json"

type ProductItemProps = {
    title: string
    image: string
    stars: number
    price: string
    currency: string
    link: string
    wagon?: boolean
}

// TODO: Wagon: <button className=" bg-white hover:bg-sky-700 hover:text-white  border-2 border-sky-700 text-sky-700 p-1 rounded-lg">Add to wagon</button>

const ProductItem: FC<ProductItemProps> = ({title, image, stars, price, currency, link, wagon=false})=>{
    const ellipsisTitle = `${title.slice(0,50)} ${title.slice(50)?'...':''}`

    const handleBuyInShop = ()=>{
        (new Audio('/buy_sound.mp3')).play()
    }

    return (
        <article className="flex flex-col text-center border-2 rounded-lg p-4 h-96 justify-between">
            <div className="flex w-full justify-center max-h-80 overflow-hidden">
             <Image src={image} alt="image" width={100} height={20}/>
            </div>
            <h5 className="text-lg" style={{ fontFamily: 'Zilla Slab Highlight' }}>{ellipsisTitle}</h5>
            <strong className="text-lg">{price} {currency}</strong>
            <ReactStars classNames="mx-5" count={5} value={stars} edit={false} size={40} isHalf={true} activeColor="#FF9900"/>
            <a target="_new" href={link} className="group bg-white hover:bg-slate-800 hover:text-amber-500 border-2 border-slate-800 text-slate-800 p-1 rounded-lg cursor-pointer flex" onClick={handleBuyInShop}>
                <Image src="/product_buy.png" width={25} height={20} alt="Buy icon" className="group-hover:invert mx-2"/>
                <strong className="ml-2">Buy in shop</strong>
            </a>
        </article>
    )
}

type productFilters = {
    search: string,
    navbar: string
}

export const Products: FC = ()=>{
    const [filters, setFilters] = useState<productFilters>({search: '', navbar: 'all'})
    const filtered = useMemo(()=>{
        let filteredProducts = [...products]
        
        // filter by type
        if(filters.navbar==='stars')
            filteredProducts = filteredProducts.filter((product)=>product.stars>=4.5)
        else if(filters.navbar!=='all')
            filteredProducts = filteredProducts.filter((product)=>product.type===filters.navbar)

        // filter by search text
        if(filters.search!=='') {
            filteredProducts = filteredProducts.filter((product)=>{
                return product.title.toLowerCase().indexOf(filters.search.toLowerCase())>=0
            })
        }

        return filteredProducts
    }, [filters])

    useEffect(()=>{

        const searchTextHandler = (event: Event)=>{
            const search = `${event.detail}`
            setFilters((filters)=>{
                return {...filters, search}
            })
        }
        const handleNavbarToggle = (event: Event)=>{
            const navbar = `${event.detail}`
            setFilters((filters)=>{
                return {...filters, navbar}
            })
        }

        // listeners
        window.addEventListener('search:text', searchTextHandler)
        window.addEventListener('navbar:toggle', handleNavbarToggle)
        return ()=>{
            // cleanup
            window.removeEventListener('search:text', searchTextHandler)
            window.removeEventListener('navbar:toggle', handleNavbarToggle)
        }
    })

    return (
        <section className="grid grid-cols-3 gap-4">
        {filtered.map((product, i)=>(
            <ProductItem
                key={i}
                image={product.image}
                title={product.title}
                stars={product.stars}
                price={product.price}
                link={product.link}
                currency="MXN"
            />
        ))}
        </section>
    )
}