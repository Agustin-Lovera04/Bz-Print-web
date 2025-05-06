import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cartContext.jsx';
import { collection, doc, getDoc } from 'firebase/firestore';
import './style-productDetail.css';
import { db } from '../../firebase/client.js';
import { Loader } from '../loader/loader.jsx';

function formatNumber(num) {
    return num.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
    });
}

// Array con códigos de productos que tienen descuento
const discountedCodes = [237380, 121230, 35360, 36172, 29441, 51950,51990, 51970,51960,258400,258420,145880,2,121000,153130,84280,167120
];

const discountedCodes10 = [51910, 61820, 51950, 15024, 241940, 154170, 154860, 237380, 237450,
    212400, 214160, 214330, 214900, 156030, 156050, 156060, 241103,
    56540, 181040, 305992, 153440, 206550, 271943]

const ProductDetail = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const { addProdInCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const productRef = doc(collection(db, "products"), code);
        getDoc(productRef)
            .then((res) => {
                if (res.exists()) {
                    let prodData = { code: res.id, ...res.data() };

                    // Verificar si el código está en la lista de descuentos
                    if (discountedCodes.includes(prodData.code)) {
                        const discount = prodData.price * 0.20; // 20% de descuento
                        prodData.price = prodData.price - discount;
                        prodData.isDiscounted = true; // Opcional: marcar que tiene descuento
                    }
                    if (discountedCodes10.includes(prodData.code)) {
                        const discount = prodData.price * 0.10; // 20% de descuento
                        prodData.price = prodData.price - discount;
                        prodData.isDiscounted = true; // Opcional: marcar que tiene descuento
                    }

                    setProduct(prodData);
                } else {
                    setError("Producto no encontrado.");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Hubo un problema al cargar el producto.");
                setLoading(false);
            });
    }, [code]);

    const handleAddToCart = () => {
        const detailsForProduct = document.getElementById('details').value
        const result = addProdInCart(product, count, detailsForProduct);
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
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No pudimos agregar el producto en este momento.',
            });
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>Ocurrió un error inesperado</p>
            ) : (
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 bg-white rounded shadow p-4">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-center mb-4 mb-md-0">
                                    <div className="rounded overflow-hidden border">
                                        <img
                                            src={product?.URLIMAGE}
                                            alt={product?.title}
                                            className="img-fluid"
                                            style={{ maxHeight: '300px', objectFit: 'contain', width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="fw-bold mb-2 text-dark">{product?.title}</h3>
                                    <p className="text-muted small mb-3">Código: {product?.code}</p>
                                    
                                    <p className="text-success fw-bold h4 mb-3">
                                        ${formatNumber(product?.price)}{' '}
                                        <span className="badge bg-light text-secondary ms-2">
                                            Precio / Unidad
                                        </span>
                                        {product?.isDiscounted && (
                                            <span className="badge bg-danger">10% OFF</span>
                                        )}
                                    </p>
                                    
                                    {product?.stock === 0 ? (
                                        <div className="alert alert-warning mt-2">Sin stock</div>
                                    ) : (
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <button
                                                className="btn btn-danger rounded-pill btn-sm"
                                                onClick={() => count > 1 && setCount(count - 1)}
                                            >
                                                <span className="fs-6">-</span>
                                            </button>
                                            <h4 className="mb-0">{count}</h4>
                                            <button
                                                className="btn btn-success rounded-pill btn-sm"
                                                onClick={() => setCount(count + 1)}
                                            >
                                                <span className="fs-6">+</span>
                                            </button>
                                        </div>
                                    )}
                                    <div className='mt-2 mb-2'>
                                        <input className="form-control py-2" type="text" name="details" id="details" placeholder='Especifiaciones del producto:  ej: color azul'/>
                                    </div>
                                    {product?.stock > 0 && (
                                        <button
                                            className="btn btn-primary btn-lg w-100"
                                            onClick={handleAddToCart}
                                        >
                                            Añadir al Carrito
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
