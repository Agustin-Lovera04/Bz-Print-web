import { CardProduct } from '../productCard-Component/productCard'

export const ProductsList = ({products}) => {

    return ( 
        <div className=' d-flex justify-content-center aling-items-center container-fluid px-4'>
                <CardProduct products={products}/>
        </div>
    )
}