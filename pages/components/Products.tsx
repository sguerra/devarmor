import Image from "next/image";
import { FC } from "react";
import { Rating } from "react-simple-star-rating";
import products from "../data/products.json"

type ProductItemProps = {
    title: string
    image: string
    stars: number
    price: string
    currency: string
    wagon?: boolean
}

const ProductItem: FC<ProductItemProps> = ({title, image, stars, price, currency, wagon=false})=>{
    const ellipsisTitle = `${title.slice(0,40)} ${title.slice(40)?'...':''}`
    return (
        <article className="flex flex-col text-center border-2 rounded-lg p-4 h-80 justify-between">
            <div className="flex w-full justify-center">
             <Image src={image} alt="image" width={100} height={20}/>
            </div>
            <h5>{ellipsisTitle}</h5>
            <strong>{price} {currency}</strong>
            <Rating initialValue={stars} readonly size={20} fillClassName="!flex flex-row" emptyClassName="!flex flex-row"/>
            <button className=" bg-white hover:bg-sky-700 hover:text-white  border-2 border-sky-700 text-sky-700 p-1 rounded-lg">Add to wagon</button>
        </article>
    )
}

export const Products: FC = ()=>{

    return (
        <section className="grid grid-cols-3 gap-4">
        {products.map((product)=>(
            <ProductItem
                image={product.image}
                title={product.title}
                stars={product.stars}
                price={product.price}
                currency="MXN"
            />
        ))}
        </section>
    )
}