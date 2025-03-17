import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client.js";
import { ProductsList } from "../productsList-Component/productsList.jsx";
import fibronesIMG from "/images/fibrones.png";
import ReactPaginate from "react-paginate";
import "./style-productsContainer.css";
import { Loader } from "../loader/loader.jsx";
import { useParams } from "react-router-dom";
import { Error } from "../errorComponent/error.jsx";
import { ProductsOFFList } from "../productsOFFList-Component/productsOFFList.jsx";
import Carrousel from "../Carrousel/Carrousel.jsx";

export const ProductsComponent = () => {
  const { title } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsOFF, setProductsOFF]  = useState([])
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [productOffset, setProductOffset] = useState(0);
  const [error, setError] = useState(null);
  const productsPerPage = 16;

  const productsRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productsRef);
        const productsData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al cargar los productos.");
        setLoading(false);
      }
    };

    getProducts();
  }, []);

/*   useEffect(()=>{ 
    const modal = () => {
      Swal.fire({
        title: "8M DIA DE LA MUJER",
        html: "<p>En este 8M, desde BZ Print reconocemos la lucha por la igualdad.</p> No es un día de celebración, sino de <strong>reflexión y acción.</strong><br/> Por eso, acompañamos este día con promociones especiales, porque el empoderamiento también se construye con oportunidades.<br/><strong> Descubre nuestras ofertas y sigamos construyendo un futuro más justo juntos.</strong></p>",
        imageUrl: "/images/dia de la mujer.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        background: '#DCD0FF'
      });
    }

    modal()
  },[]) */

  useEffect(() => {
    try {
      if (loading || products.length === 0) return;

              
      let codesFind = ["121250", "154950", "237450", "237380", "121230", "61820", "116460", "35360", "36172", "155760", "29441", "51950", "116140", "121360"];

      let newProductsOFF = products.filter((p) => codesFind.includes(p.code));

      setProductsOFF(newProductsOFF);
      
      let filteredProducts = products;

      if (title) {
        filteredProducts = products.filter(
          (p) => p.title && p.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      const endOffset = productOffset + productsPerPage;
      const currentProducts = filteredProducts.slice(productOffset, endOffset);

      setCurrentProducts(currentProducts);
      setPageCount(Math.max(1, Math.ceil(filteredProducts.length / productsPerPage)));
    } catch (error) {
      setError("Ocurrió un problema al procesar la paginación.");
    }
  }, [title, products, productOffset, loading]);

  const handlePageClick = (e) => {
    try {
      if (products.length === 0) return;
      const newOffset = (e.selected * productsPerPage) % products.length;
      setProductOffset(newOffset);
    } catch (error) {
      console.error("Error en el cambio de página:", error);
      setError("Ocurrió un problema al cambiar de página.");
    }
  };


  try {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={fibronesIMG} alt="" className="fibronesIMG" />
          {/* <img src={diaMujerPNG} className="diaMujerIMG" /> */}
        </div>
        <div>
          {error ? (
            <Error error = {error} />
          ) : loading ? (
            <div className="loader-Container">
              <Loader />
            </div>
          ) : (
            <div>

              <div className="carrouselContainer">
                <Carrousel/>
              </div>



              {productsOFF.length > 0 ? (
                <div>
                  <h1 className="text-center fw-bold promo-banner p-md-5 p-3"> PROMOS SEMANALES  <br /> 20% OFF</h1>
                    <ProductsOFFList productsOFF={productsOFF} />
                  <h1 className="text-center fw-bold promo-banner p-4"> Increibles promos semanales, no te las Pierdas!</h1>
                </div>
              ) : <></>}

            <h1 className="text-center fw-bold">PRODUCTOS</h1>

              <ProductsList products={currentProducts} />

              <ReactPaginate
                breakLabel="..."
                nextLabel="Siguiente >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Anterior"
                renderOnZeroPageCount={null}
                containerClassName="pagination d-flex justify-content-center mt-4 p-2 flex-wrap"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error en el renderizado:", error);
    return (
      <Error error = {error} />
    );
  }
};
