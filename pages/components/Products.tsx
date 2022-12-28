import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
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

export const Products: FC = ()=>{
    const [filtered, setFiltered] = useState(products)

    useEffect(()=>{

        const searchTextHandler = (event: Event)=>{
            const text = event.detail
            if(text==='') {
                setFiltered(products)
                return
            }
            setFiltered(products.filter((product)=>{
                return product.title.toLowerCase().indexOf(text.toLowerCase())>=0
            }))
        }
        const handleNavbarToggle = (event: Event)=>{
            const detailType = event.detail

            if(detailType==='all'){
                setFiltered(products)
            }else if(detailType==='stars'){
                setFiltered(products.filter((product)=>product.stars>=4.5))
            }else{
                setFiltered(products.filter((product)=>product.type===detailType))
            }
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