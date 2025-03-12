import React, { useContext } from 'react';
import './carrousel.css'
import { CartContext } from '../../context/cartContext';


let combo1 = {
  URLIMAGE: "https://storage.googleapis.com/bz-print-9007b.firebasestorage.app/images/0001.png",
  code: "0001",
  description:"CARP 2A A4 PVC CARTOPEL PASTEL (15) ||	REP A4 HUSARES MULTISET === x80h. (20) || CUA T/E 16x21 HUSARES TRENDY ===x80h.",
  price: 10116,
  title:"Combo 1"
}

let combo2 = {
  URLIMAGE: "https://storage.googleapis.com/bz-print-9007b.firebasestorage.app/images/0002.png",
  code: "0002",
  description:"CUA T/E 16x21 T/D ASAMBLEA x96h.(4) || NOTA-AD EZCO 75x75mm. NEON x12u. E-725 || RESALT. PELIKAN FLASH PASTEL x4u. Surt",
  price: 14355.7,
  title:"Combo 2"
}

let combo3 = {
  URLIMAGE: "https://storage.googleapis.com/bz-print-9007b.firebasestorage.app/images/0003.png",
  code: "0003",
  description:"CUA A4 T/B LEDESMA NAT === x70h || CAN GOTCCI LONA TRIANGULAR 74 || CORRECTOR LAPIZ TAIKO 7ml. || BOLIG FILGO STICK 024 1.0x2 || RESALT. FILGO FINO x4u.",
  price: 9732,
  title:"Combo 3"
}

let combo4 = {
  URLIMAGE: "https://storage.googleapis.com/bz-print-9007b.firebasestorage.app/images/0004.png",
  code: "0004",
  description:"RESALT. PELIKAN FLASH PASTEL x6u. Surt. ||	ROLLER FILGO GEL POP PASTEL 0.8 x6u. || PORTAMINA FILGO TECNICO H205 0.7 || CUA A4 T/D TRIUNF. PVC COL. === x120h.",
  price: 23146,
  title:"Combo 4"
}

let combo5 = {
  URLIMAGE: "https://storage.googleapis.com/bz-print-9007b.firebasestorage.app/images/0005.png",
  code: "0005",
  description:"CUA A4 T/B AVON === x84h.(10/40).X3 || BOLIG BIC OPACO 1.0 x50u.x2",
  price: 10025,
  title:"Combo 5"
}

let combo6 = {
  URLIMAGE: "https://storage.googleapis.com/bz-print-9007b.firebasestorage.app/images/0006.png",
  code: "0006",
  description:"FICHAS RAYADAS N 2 x100 || ROLLER FILGO BORRAX SE AZUL	",
  price: 2914,
  title:"Combo 6"
}



function formatNumber(num){
  return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 3 })
}


const Carrousel = () => {
  const { addProdInCart } = useContext(CartContext);
  
    const launchAlert = (prod) => {
      let count = 1;
  
      Swal.fire({
        title: prod.title,
        html: `
          <div>
            <p class="fw-bold">CODIGO: ${prod.code}</p>
            <p class="fw-bold">${prod.description}</p>
            <p class="fw-bold">PRECIO: $${formatNumber(prod.price)}</p>
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
                html: '<p class="fw-bold">COMBO AGREGADO AL CARRITO</p>',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo agregar el combo al carrito.',
              });
            }
          });
        },
      });
    };
  

  return (
    <div id="carouselExampleCaptions" className="carousel slide carrousel" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>

      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="2500">
          <img src={combo1.URLIMAGE} className="d-block w-100 imgCarrousel" alt="..." />
          <div className="carousel-caption">
            <h5 className='textDiapoCarrousel d-none d-md-block fw-bold'>COMBO 1</h5>
            <p className='textDiapoCarrousel d-none d-md-block'> {combo1.description}  <br/> <strong className='bg-secundary'> $- {formatNumber(combo1.price)}</strong></p>
            <button className='btn-warning btnCarrousel' onClick={() => launchAlert(combo1)}>
              <p className='pBtn'>VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img src={combo2.URLIMAGE} className="d-block w-100 imgCarrousel" alt="..." />
          <div className="carousel-caption">
            <h5 className='textDiapoCarrousel d-none d-md-block fw-bold'>COMBO 2</h5>
            <p className='textDiapoCarrousel d-none d-md-block'>{combo2.description} <br/> <strong className='bg-secundary'> $- {formatNumber(combo2.price)}</strong></p>
            <button className='btn-warning btnCarrousel'onClick={() => launchAlert(combo2)}>
              <p className='pBtn'>VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img src={combo3.URLIMAGE} className="d-block w-100 imgCarrousel" alt="..." />
          <div className="carousel-caption">
            <h5 className='textDiapoCarrousel d-none d-md-block fw-bold'>COMBO 3 </h5>
            <p className='textDiapoCarrousel d-none d-md-block'>{combo3.description} <br/> <strong className='bg-secundary'> $- {formatNumber(combo3.price)}</strong></p>
            <button className='btn-warning btnCarrousel'onClick={() => launchAlert(combo3)}>
              <p className='pBtn'>VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img src={combo4.URLIMAGE} className="d-block w-100 imgCarrousel" alt="..." />
          <div className="carousel-caption">
            <h5 className='textDiapoCarrousel d-none d-md-block fw-bold'>COMBO 4 </h5>
            <p className='textDiapoCarrousel d-none d-md-block'>{combo4.description} <br/> <strong className='bg-secundary'> $- {formatNumber(combo4.price)}</strong></p>
            <button className='btn-warning btnCarrousel'onClick={() => launchAlert(combo4)}>
              <p className='pBtn'>VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img src={combo5.URLIMAGE} className="d-block w-100 imgCarrousel" alt="..." />
          <div className="carousel-caption">
            <h5 className='textDiapoCarrousel d-none d-md-block fw-bold'>COMBO 5 </h5>
            <p className='textDiapoCarrousel d-none d-md-block'>{combo5.description} <br/>  <strong className='bg-secundary'> $- {formatNumber(combo5.price)}</strong></p>
            <button className='btn-warning btnCarrousel'onClick={() => launchAlert(combo5)}>
              <p className='pBtn'>VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img src={combo6.URLIMAGE} className="d-block w-100 imgCarrousel" alt="..." />
          <div className="carousel-caption">
            <h5 className='textDiapoCarrousel d-none d-md-block fw-bold'>COMBO 6</h5>
            <p className='textDiapoCarrousel d-none d-md-block'>{combo6.description} <br/> <strong className='bg-secundary'> $- {formatNumber(combo6.price)}</strong></p>
            <button className='btn-warning btnCarrousel'onClick={() => launchAlert(combo6)}>
              <p className='pBtn'>VER MAS</p>
            </button>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carrousel;
