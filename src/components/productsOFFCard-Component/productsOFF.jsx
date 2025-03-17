import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import {CartContext} from '../../context/cartContext.jsx'
import './productsOFF-style.css'

function formatNumber(num){
  return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 3 })
}

export function CardProductOFF({ productsOFF }) {
  const [ products, setProducts] = useState([])
  const { addProdInCart } = useContext(CartContext);


  useEffect(() => { 
      // Aplicar el descuento del 20% a cada producto
      let NewProductsOFF = productsOFF.map((p) => {
        const descuento = p.price * (20 / 100); // Calcular el descuento
        p.price = p.price - descuento; // Actualizar el precio con el descuento
        return p; // Devolver el producto actualizado
      });

      setProducts(NewProductsOFF)

  }, [])


  const launchAlert = (prod) => {
    let count = 1;

    Swal.fire({
      title: prod.title,
      html: `
        <div>
          <p class="fw-bold">CODE: ${prod.code}</p>
          <p class="fw-bold">PRICE: $${formatNumber(prod.price)}</p>
          <button id="subtractBtn" class="btn btn-danger">RESTAR</button>
          <button id="addBtn" class="btn btn-success">SUMAR</button>
          <h2 id="countDisplay">${count}</h2>
          <button id="addToCartBtn" class="btn btn-primary mt-3">AGREGAR AL CARRITO</button>
        </div>
      `,
      imageUrl: prod.URLIMAGE,
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      didOpen: () => {
        const countDisplay = document.getElementById('countDisplay');

        document.getElementById('subtractBtn').addEventListener('click', () => {
          if (count > 1) {
            count -= 1;
            countDisplay.textContent = count;
          }
        });

        document.getElementById('addBtn').addEventListener('click', () => {
          count += 1;
          countDisplay.textContent = count;
        });

        document.getElementById('addToCartBtn').addEventListener('click', () => {
          const result = addProdInCart(prod, count);

          if (result.succes) {
            Swal.close();
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: 'success',
              html: '<p class="fw-bold">PRODUCTO AGREGADO AL CARRITO</p>',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo agregar el producto al carrito.',
            });
          }
        });
      },
    });
  };



  return (
    <Row xs={1} sm={3} md={5} className="g-4">
      {products.map((prod) => (
        <Col  key={prod.code} className="d-flex justify-content-center align-items-center">
          <Card className="cardProduct CardProductOFF"color="light" >
            <Card.Img variant="top" src={prod.URLIMAGE} className="imgCardProduct" />
            <Card.Body>
              <Card.Title className="titleCard text-dark  fw-bold">{prod.title}</Card.Title>
              <Card.Text className="textCard text-dark">
               <span className='fw-bold'> CODE: {prod.code} <br />
                PRECIO:$ <span className='text-success'>{formatNumber(prod.price)}.-</span> <span className='text-warning bg-danger fw-bold'>Precio xUnidad</span> </span>
              </Card.Text>
              <Button variant="primary" className="mb-2" onClick={() => launchAlert(prod)}>
                Ver Detalle
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
    