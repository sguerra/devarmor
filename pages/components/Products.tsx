import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";
import products from "../data/products.json"

type ProductItemProps = {
    title: string
    image: string
    stars: number
    price: string
    currency: string
    link: string
    type: string
    wagon?: boolean
}

// TODO: Wagon: <button className=" bg-white hover:bg-sky-700 hover:text-white  border-2 border-sky-700 text-sky-700 p-1 rounded-lg">Add to wagon</button>

const ProductItem: FC<ProductItemProps> = ({title, image, stars, price, currency, link, wagon=false})=>{
    const ellipsisTitle = `${title.slice(0,40)} ${title.slice(40)?'...':''}`
    return (
        <article className="flex flex-col text-center border-2 rounded-lg p-4 h-80 justify-between">
            <div className="flex w-full justify-center">
             <Image src={image} alt="image" width={100} height={20}/>
            </div>
            <h5>{ellipsisTitle}</h5>
            <strong>{price} {currency}</strong>
            <Rating initialValue={stars} readonly size={20} fillClassName="!flex flex-row" emptyClassName="!flex flex-row"/>
            <a target="_new" href={link} className="bg-white hover:bg-slate-800 hover:text-amber-600  border-2 border-slate-800 text-slate-800 p-1 rounded-lg cursor-pointer">Buy in shop</a>
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
        {filtered.map((product)=>(
            <ProductItem
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