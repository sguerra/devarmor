import { FC } from "react";

type ProductItemProps = {
    title: string
    stars: number
    price: number
    currency: string
    wagon?: boolean
}

const ProductItem: FC<ProductItemProps> = ({title, stars, price, currency, wagon=false})=>{
    return (
        <article className="text-center border-2 rounded-lg p-4">
            <span>Photo</span>
            <h3>{title}</h3>
            <strong>${price} {currency}</strong>
            <br/>
            <span>{stars} stars</span>
            <br/>
            <button className=" bg-white hover:bg-sky-700 hover:text-white  border-2 border-sky-700 text-sky-700 p-1 rounded-lg">Add to wagon</button>
        </article>
    )
}

export const Products: FC = ()=>{
    return (
        <section className="grid grid-cols-3 gap-4">
            <ProductItem 
                title="Product"
                stars={5}
                price={10}
                currency="USD"
            />
        </section>
    )
}