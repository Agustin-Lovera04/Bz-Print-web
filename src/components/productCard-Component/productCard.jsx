import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import {CartContext} from '../../context/cartContext.jsx'
import './style-productCard.css'
import { useNavigate } from 'react-router-dom';

function formatNumber(num){
  return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 3 })
}

export function CardProduct({ products }) {
  const { addProdInCart } = useContext(CartContext);
  const navigate  = useNavigate()

 /*  const launchAlert = (prod) => {
    let count = 1;

    Swal.fire({
      title: prod.title,
      html: `
        <div>
          <p class="fw-bold">CODIGO: ${prod.code}</p>
          <p class="fw-bold">PRECIO: $${prod.price}</p>
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
              html: `<p class="fw-bold">PRODUCTO AGREGADO AL CARRITO</p>
                    <button class="btn btn-warning" id="btn-navigateCart">Ir a carrito</button>`,
              didOpen:() => {
                document.getElementById('btn-navigateCart').addEventListener("click", (e)=>{
                  navigate("/cart")
                })
              }
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
  }; */

  return (
    <Row className="g-2">
      {products.map((prod) => (
        <Col md={3} key={prod.code} className="d-flex justify-content-center align-items-center">
          <Card className="cardProduct"  >
            <Card.Img variant="top" src={prod.URLIMAGE} className="imgCardProduct" />
            <Card.Body>
              <Card.Title className="titleCard fw-bold">{prod.title}</Card.Title>
              <Card.Text className="textCard">
               <span className='fw-bold'> CODE: {prod.code} <br />
                PRECIO:$ <span className='text-warning'>{prod.price && prod.price !== undefined && formatNumber(prod.price)}.-</span> <span className='text-warning bg-danger fw-bold'>Precio xUnidad</span> </span>
              </Card.Text>
              {prod.stock === 0 ? (
                <div className="alert alert-danger"> SIN STOCK </div>
              ) : (
                <Button className="mb-2 btn-primary" onClick={() => navigate(`/product/${prod.code}`)}>
                  Ver detalle
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
