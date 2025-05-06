 import { Button } from "react-bootstrap";
import { CartContext } from "../../context/cartContext";
import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import basuraIMG from "/images/basura.png";
import "./style-cartContainer.css";
import { Link } from "react-router-dom";
import cuotaIMG from '/public/images/cuota.jpg'


function formatNumber(num) {
    return num.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
    });
}

export const CartComponent = () => {
    const { 
        cart, 
        cleanCart, 
        totalPriceCart, 
        substractQuantityInCart, 
        addQuantityInCart, 
        removeProdInCart, 
        setSend 
    } = useContext(CartContext);


    function hasComboInCart() {
        return cart.some(product => product.title.toLowerCase().includes("combo"));
    }
    

      function more5ProductsInCart() {
        return cart.length >= 5;
      }


    function returnCostSend(total) {
        if (hasComboInCart()) {
            setSend(0);
            return 0;
        }
        if(more5ProductsInCart()) {
            setSend(0);
            return 0
        }
        let cost = 0;
        if (total === 0) {
            cost = 0;
        } else if (total <= 5000) {
            cost = 1000;
        } else if (total > 5000 && total <= 20000) {
            cost = 2000;
        } else {
            cost = 3000;
        }

        setSend(cost)
        return cost;
    }


    function cartLength ( ) {
        let valid = false
        if(cart.length > 0){
            valid = true
        }

        return valid
    }
    return (
        <div className="bg-light cart-Container">
            <h1 className="text-center fw-bold">CARRITO</h1>
            <div className="prodsInCart-Container">
                <div className="tables-Container">
                   <div className="cards-cart-container">
    {cart.map((p) => (
        <div className="card-product-cart" key={p.code}>
            {p.URLIMAGE && (
                <img src={p.URLIMAGE} alt={p.title} className="img-cart-product" />
            )}
            <div className="info-cart-product">
                <h5 className="title-cart-product">{p.title}</h5>
                <p className="code-cart-product"><strong>Código:</strong> {p.code}</p>
                <p className="text-primary"><strong>Especificaciones:</strong> {p.detail}</p>
                <p><strong>Precio unitario:</strong> $ {formatNumber(p.price)}.-</p>
                <p><strong>Subtotal:</strong> $ {formatNumber(p.price * p.quantity)}.-</p>
                <div className="cart-actions">
                    <span className="fw-bold">Cantidad: x{p.quantity}</span>
                    <div className="btns-cart">
                        <Button
                            className="btn-danger btnOption"
                            onClick={() => substractQuantityInCart(p.code)}
                        >
                            -
                        </Button>
                        <Button
                            className="btn-success btnOption"
                            onClick={() => addQuantityInCart(p.code)}
                        >
                            +
                        </Button>
                        <Button
                            className="btn-danger btnOption"
                            onClick={() => removeProdInCart(p.code)}
                        >
                            <img className="trash" src={basuraIMG} alt="Eliminar" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

                </div>
                <div className="m-2 mt-0 alerts-Container">
                    <div className="d-flex justify-content-center mb-1 pb-1">
                        <img src={cuotaIMG} alt="" className="imgCuota"/>
                    </div>
                    <ul className="alert alert-warning p-4">
                        <span className="fw-bold">COSTO DE ENVÍOS: </span><br />
                        <li>En compras hasta <span className="fw-bold">$5.000.-</span> <br />El costo de envío: <span className="fw-bold">$1.000.- </span><br /></li>
                        <li>En compras hasta <span className="fw-bold">$20.000.- </span><br />El costo de envío: <span className="fw-bold">$2.000.- </span><br /></li>
                        <li>En compras mayores a <span className="fw-bold">$20.000.-</span> <br />El costo de envío: <span className="fw-bold">$3.000.-</span></li>
                    </ul>
                    <div className="alert alert-danger">
                        Informamos que algunos de nuestros productos pueden encontrarse sin Precio, por lo tanto, si es el caso de Ud., ha agregado dichos productos a su carrito <span className="fw-bold">el monto final puede ser APROXIMADO.</span>
                    </div>
    
                    <div className="table-scroll">
                        <Table striped bordered hover variant="secondary">
                            <thead>
                                <tr>
                                    <th className="fw-bold">TOTAL APROXIMADO</th>
                                    <th className="fw-bold">ENVÍO</th>
                                    <th className="fw-bold">TOTAL FINAL APROXIMADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>$ {formatNumber(totalPriceCart)}.-</td>
                                <td>$ {formatNumber(returnCostSend(totalPriceCart))}.-</td>
                                <td>$ {formatNumber(totalPriceCart + returnCostSend(totalPriceCart))}.-</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div className="d-flex flex-row">
                        <Button className="m-2 btn-danger" onClick={() => cleanCart()}>Vaciar Carrito</Button>
                        
                        {cartLength() ? 
                        
                        <Link className="m-2" to={'/confirmBuy'}>
                            <Button className="btn-success">Confirmar compra</Button>
                        </Link> :
                        <div className="alert alert-warning m-2">No hay productos en carrito</div>
                    }
                        
                    </div>

                </div>
            </div>
        </div>
    );
};
