import { CardProductOFF } from "../productsOFFCard-Component/productsOFF"


export const ProductsOFFList = ({productsOFF}) => {

    return ( 
        <div className=' d-flex justify-content-center aling-items-center container-fluid px-4'>
                <CardProductOFF productsOFF={productsOFF}/>
        </div>
    )
}