import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import './carrousel.css'; // Importa el archivo de estilos
import { useNavigate } from "react-router-dom";


function formatNumber(num) {
  return num.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
  });
}

function generateIdAlphaNumeric(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}


const Carrousel = ({ lote0, lote1, lote2 }) => {
  const navigate = useNavigate()
  const { addProdInCart } = useContext(CartContext);
  const [combo, setCombo] = useState([]);

  const addToCombo = (prod) => {
    const duplicateCombo = [...combo];
    const searchProdCombo = duplicateCombo.findIndex((item) => item.code === prod.code);

    if (searchProdCombo !== -1) {
      const updatedItem = {
        ...duplicateCombo[searchProdCombo],
        quantity: duplicateCombo[searchProdCombo].quantity + 1,
      };
      duplicateCombo[searchProdCombo] = updatedItem;
    } else {
      prod.quantity = 1;
      duplicateCombo.push(prod);
    }
    return setCombo(duplicateCombo);
  };

  const createCombo = () => {
    let calculateTotal = combo.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
    let calculateDiscount = calculateTotal * (10 / 100);
    let totalCombo = calculateTotal - calculateDiscount;

    let title = 'COMBO PERSONALIZADO: ';
    combo.forEach(p => {
      title += ` ${p.code} - (x${p.quantity}) / `;
      return (title);
    });

    const newCode = generateIdAlphaNumeric(10);


    let prod = { title: title, price: totalCombo, code: newCode };
    const result = addProdInCart(prod, 1, " - ");
    if (result.succes) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            html: `<p class="fw-bold m-0">¡Genial! Se añadió a tu carrito.</p>
                   <button class="btn btn-sm btn-info mt-2" id="btn-navigateCart">Ver mi carrito ahora</button>`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                document
                    .getElementById('btn-navigateCart')
                    .addEventListener('click', () => navigate('/cart'));
            },
        }
      );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'No pudimos agregar el producto en este momento.',
        });
    }
    setCombo([]);
    return prod;
  };




  return (
    <div className="carrousel-bootstrap-container carousel-dark">
      <div id="comboCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#comboCarousel"
            data-bs-slide-to="0"
            className="active carousel-indicator-custom"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#comboCarousel"
            data-bs-slide-to="1"
            className="carousel-indicator-custom"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#comboCarousel"
            data-bs-slide-to="2"
            className="carousel-indicator-custom"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active"data-bs-interval="8000">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-1">
              {lote0.map((product) => (
                <div key={product.code} className="col">
                  <div className="card h-100 product-card-sm">
                    <div className="img-wrapper">
                      <img
                        src={product.URLIMAGE}
                        className="card-img-top product-img-sm"
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body product-body-sm d-flex flex-column justify-content-between align-items-center">
                      <h6 className="card-title text-center product-title-sm mb-1">
                        {product.title}
                      </h6>
                      <p className="card-text text-success fw-bold text-center card-price mb-1">
                         $- {formatNumber(product.price)}
                      </p>
                      <button
                        onClick={() => addToCombo(product)}
                        className="btn btn-sm btn-outline-primary mt-2 product-add-btn"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item"data-bs-interval="8000">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-1">
              {lote1.map((product) => (
                <div key={product.code} className="col">
                  <div className="card h-100 product-card-sm">
                    <div className="img-wrapper">
                      <img
                        src={product.URLIMAGE}
                        className="card-img-top product-img-sm"
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body product-body-sm d-flex flex-column justify-content-between align-items-center">
                      <h6 className="card-title text-center product-title-sm mb-1">
                        {product.title}
                      </h6>
                      <p className="card-text text-success fw-bold text-center card-price mb-1">
                         $- {formatNumber(product.price)}
                      </p>
                      <button
                        onClick={() => addToCombo(product)}
                        className="btn btn-sm btn-outline-primary mt-2 product-add-btn"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="8000">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-1">
              {lote2.map((product) => (
                <div key={product.code} className="col">
                  <div className="card h-100 product-card-sm">
                    <div className="img-wrapper">
                      <img
                        src={product.URLIMAGE}
                        className="card-img-top product-img-sm"
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body product-body-sm d-flex flex-column justify-content-between align-items-center">
                      <h6 className="card-title text-center product-title-sm mb-1">
                        {product.title}
                      </h6>
                      <p className="card-text text-success fw-bold text-center card-price mb-1">
                         $- {formatNumber(product.price)}
                      </p>
                      <button
                        onClick={() => addToCombo(product)}
                        className="btn btn-sm btn-outline-primary mt-2 product-add-btn"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev carousel-control-dark"
          type="button"
          data-bs-target="#comboCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next carousel-control-dark"
          type="button"
          data-bs-target="#comboCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="mt-5 combo-preview">
        <h4 className="mb-3">Tu Combo Personalizado:</h4>
        {combo.length === 0 ? (
          <p className="text-muted">No hay productos en el combo aún.</p>
        ) : (
          <ul className="list-group mb-3">
            {combo.map((prod) => (
              <li
                key={prod.code}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {prod.title} (x{prod.quantity})
                </span>
                <span className="text-muted">Código: {prod.code}</span>
              </li>
            ))}
          </ul>
        )}
        <button onClick={createCombo} className="btn btn-success">
          Agregar Combo al Carrito
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
/* Cponente viejo
import React, { useContext } from "react";
import "./carrousel.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

let combo1 = {
  URLIMAGE:
    "https://firebasestorage.googleapis.com/v0/b/bz-print-9007b.firebasestorage.app/o/images%2Fcombo1.png?alt=media&token=4c3f58fc-41fd-481f-ae5f-c8ce06855d0d",
  code: "0001",
  description:
    "CARP 2A A4 PVC CARTOPEL PASTEL (15) ||	REP A4 HUSARES MULTISET === x80h. (20) || CUA T/E 16x21 HUSARES TRENDY ===x80h.",
  price: 10116,
  title: "Combo 1",
};

let combo2 = {
  URLIMAGE:
    "https://firebasestorage.googleapis.com/v0/b/bz-print-9007b.firebasestorage.app/o/images%2Fcombo2.png?alt=media&token=3569d9c5-1eaf-4a2f-951c-95fc03f0b948",
  code: "0002",
  description:
    "CUA T/E 16x21 T/D ASAMBLEA x96h.(4) || NOTA-AD EZCO 75x75mm. NEON x12u. E-725 || RESALT. PELIKAN FLASH PASTEL x4u. Surt",
  price: 14355.7,
  title: "Combo 2",
};

let combo3 = {
  URLIMAGE:
    "https://firebasestorage.googleapis.com/v0/b/bz-print-9007b.firebasestorage.app/o/images%2Fcombo3.png?alt=media&token=d2909af6-8da9-4ec9-a9eb-07ec81286c70",
  code: "0003",
  description:
    "CUA A4 T/B LEDESMA NAT === x70h || CAN GOTCCI LONA TRIANGULAR 74 || CORRECTOR LAPIZ TAIKO 7ml. || BOLIG FILGO STICK 024 1.0x2 || RESALT. FILGO FINO x4u.",
  price: 9732,
  title: "Combo 3",
};

let combo4 = {
  URLIMAGE:
    "https://firebasestorage.googleapis.com/v0/b/bz-print-9007b.firebasestorage.app/o/images%2Fcombo4.png?alt=media&token=2f8b4fe0-843d-40b2-94fa-822b3ce371a4",
  code: "0004",
  description:
    "RESALT. PELIKAN FLASH PASTEL x6u. Surt. ||	ROLLER FILGO GEL POP PASTEL 0.8 x6u. || PORTAMINA FILGO TECNICO H205 0.7 || CUA A4 T/D TRIUNF. PVC COL. === x120h.",
  price: 23146,
  title: "Combo 4",
};

let combo5 = {
  URLIMAGE:
    "https://firebasestorage.googleapis.com/v0/b/bz-print-9007b.firebasestorage.app/o/images%2Fcombo5.png?alt=media&token=79c2288d-fb88-4dd2-9e78-c15b68b0cea9",
  code: "0005",
  description:
    "CUA A4 T/B AVON === x84h.(10/40).X3 || BOLIG BIC OPACO 1.0 x50u.x2",
  price: 10025,
  title: "Combo 5",
};

let combo6 = {
  URLIMAGE:
    "https://firebasestorage.googleapis.com/v0/b/bz-print-9007b.firebasestorage.app/o/images%2Fcombo6.png?alt=media&token=c23bd4f1-ba27-41ff-b5ec-2722ae011890",
  code: "0006",
  description: "FICHAS RAYADAS N 2 x100 || ROLLER FILGO BORRAX SE AZUL	",
  price: 2914,
  title: "Combo 6",
};
 
function formatNumber(num) {
  return num.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
}

const Carrousel = () => {
  const { addProdInCart } = useContext(CartContext);
  const navigate = useNavigate()

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
      imageAlt: "Custom image",
      showConfirmButton: false,
      didOpen: () => {
        const countDisplay = document.getElementById("countDisplay");

        document.getElementById("subtractBtn").addEventListener("click", () => {
          if (count > 1) {
            count -= 1;
            countDisplay.textContent = count;
          }
        });

        document.getElementById("addBtn").addEventListener("click", () => {
          count += 1;
          countDisplay.textContent = count;
        });

        document
          .getElementById("addToCartBtn")
          .addEventListener("click", () => {
            const result = addProdInCart(prod, count);

            if (result.succes) {
              Swal.close();
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                html: `<p class="fw-bold">COMBO AGREGADO AL CARRITO</p>
                <button class="btn btn-warning" id="btn-navigateCart">Ir a carrito</button>`,
                didOpen: () => {
                  document
                    .getElementById("btn-navigateCart")
                    .addEventListener("click", (e) => {
                      navigate("/cart");
                    });
                },
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo agregar el combo al carrito.",
              });
            }
          });
      },
    });
  };

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carrousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="5"
          aria-label="Slide 6"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="2500">
        <img
            src={combo1.URLIMAGE}
            className="d-block w-100 imgCarrousel"
            alt="..."
          />
          <div className="carousel-caption">
             <h5 className="textDiapoCarrousel d-none d-md-block fw-bold">
              COMBO 1
            </h5>
            <p className="textDiapoCarrousel d-none d-md-block">
              {" "}
              {combo1.description} <br />{" "}
              <strong className="bg-secundary">
                {" "}
                $- {formatNumber(combo1.price)}
              </strong>
            </p>
            <button
              className="btn-warning btnCarrousel"
              onClick={() => launchAlert(combo1)}
            >
              <p className="pBtn">VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={combo2.URLIMAGE}
            className="d-block w-100 imgCarrousel"
            alt="..."
          />
          <div className="carousel-caption">
            <h5 className="textDiapoCarrousel d-none d-md-block fw-bold">
              COMBO 2
            </h5>
            <p className="textDiapoCarrousel d-none d-md-block">
              {combo2.description} <br />{" "}
              <strong className="bg-secundary">
                {" "}
                $- {formatNumber(combo2.price)}
              </strong>
            </p>
            <button
              className="btn-warning btnCarrousel"
              onClick={() => launchAlert(combo2)}
            >
              <p className="pBtn">VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={combo3.URLIMAGE}
            className="d-block w-100 imgCarrousel"
            alt="..."
          />
          <div className="carousel-caption">
            <h5 className="textDiapoCarrousel d-none d-md-block fw-bold">
              COMBO 3{" "}
            </h5>
            <p className="textDiapoCarrousel d-none d-md-block">
              {combo3.description} <br />{" "}
              <strong className="bg-secundary">
                {" "}
                $- {formatNumber(combo3.price)}
              </strong>
            </p>
            <button
              className="btn-warning btnCarrousel"
              onClick={() => launchAlert(combo3)}
            >
              <p className="pBtn">VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={combo4.URLIMAGE}
            className="d-block w-100 imgCarrousel"
            alt="..."
          />
          <div className="carousel-caption">
            <h5 className="textDiapoCarrousel d-none d-md-block fw-bold">
              COMBO 4{" "}
            </h5>
            <p className="textDiapoCarrousel d-none d-md-block">
              {combo4.description} <br />{" "}
              <strong className="bg-secundary">
                {" "}
                $- {formatNumber(combo4.price)}
              </strong>
            </p>
            <button
              className="btn-warning btnCarrousel"
              onClick={() => launchAlert(combo4)}
            >
              <p className="pBtn">VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={combo5.URLIMAGE}
            className="d-block w-100 imgCarrousel"
            alt="..."
          />
          <div className="carousel-caption">
            <h5 className="textDiapoCarrousel d-none d-md-block fw-bold">
              COMBO 5{" "}
            </h5>
            <p className="textDiapoCarrousel d-none d-md-block">
              {combo5.description} <br />{" "}
              <strong className="bg-secundary">
                {" "}
                $- {formatNumber(combo5.price)}
              </strong>
            </p>
            <button
              className="btn-warning btnCarrousel"
              onClick={() => launchAlert(combo5)}
            >
              <p className="pBtn">VER MAS</p>
            </button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={combo6.URLIMAGE}
            className="d-block w-100 imgCarrousel"
            alt="..."
          />
          <div className="carousel-caption">
            <h5 className="textDiapoCarrousel d-none d-md-block fw-bold">
              COMBO 6
            </h5>
            <p className="textDiapoCarrousel d-none d-md-block">
              {combo6.description} <br />{" "}
              <strong className="bg-secundary">
                {" "}
                $- {formatNumber(combo6.price)}
              </strong>
            </p>
            <button
              className="btn-warning btnCarrousel"
              onClick={() => launchAlert(combo6)}
            >
              <p className="pBtn">VER MAS</p>
            </button>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carrousel;
 */
