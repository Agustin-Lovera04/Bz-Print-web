import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client.js";
import { ProductsList } from "../productsList-Component/productsList.jsx";
import fibronesIMG from "/images/fibrones.png";
import ReactPaginate from "react-paginate";
import "./style-productsContainer.css";
import { Loader } from "../loader/loader.jsx";
import { useLocation, useParams } from "react-router-dom";
import { Error } from "../errorComponent/error.jsx";
import { ProductsOFFList } from "../productsOFFList-Component/productsOFFList.jsx";
import Carrousel from "../Carrousel/Carrousel.jsx";
import SearchProduct from "../SearchProduct/SearchProduct.jsx";
import Categories from "../Categories/Categories.jsx";


export const ProductsComponent = () => {
  const [searchProduct, setSearchProduct] = useState([]); // Corregido el nombre de la variable
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsOFF, setProductsOFF] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [productOffset, setProductOffset] = useState(0);
  const [error, setError] = useState(null);
  const productsPerPage = 16;


  //OBTENER TITLE PERO DE QUERY PARAMS
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const title = queryParams.get("title")

  //OBTENER CATEGORY POR PARAMS
  const { category } = useParams()

  const productsRef = collection(db, "PRODUCTS");

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

  useEffect(() => {
    try {
      if (loading || products.length === 0) return;
      console.log('products', products)

      let codesFind = [237380, 121230, 35360, 36172, 29441, 51950,51990, 51970,51960,258400,258420,145880,"145220",121000,153130,84280,167120
      ];
      console.log('codes', codesFind)

      let newProductsOFF = products.filter((p) => codesFind.includes(p.code));
      console.log(newProductsOFF)
      setProductsOFF(newProductsOFF);
      console.log(productsOFF)
      let filteredProducts = products;

      if (title) {
        filteredProducts = products.filter(
          (p) => p.title && p.title.toLowerCase().includes(title.toLowerCase())
        );
        setSearchProduct(filteredProducts); // Corregido el nombre de la función
      }


      if(category) {
        let filterProdsByCategory = products.filter((p) => p.category === category);
        filteredProducts = filterProdsByCategory;
        setSearchProduct(filterProdsByCategory);
      }

      const endOffset = productOffset + productsPerPage;
      const currentProducts = filteredProducts.slice(productOffset, endOffset);
      
      setCurrentProducts(currentProducts);
      setPageCount(Math.max(1, Math.ceil(filteredProducts.length / productsPerPage)));
    } catch (error) {
      setError("Ocurrió un problema al procesar la paginación.");
    }
  }, [title, products, productOffset, loading, category]);

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
        </div>
        <div>
          {error ? (
            <Error error={error} />
          ) : loading ? (
            <div className="loader-Container">
              <Loader />
            </div>
          ) : (
            <>
              {title ? (
                <div>
                  <SearchProduct products={searchProduct} />
                </div>
              ) : (
                <div>
                  <div className="carrouselContainer">
                    <Carrousel />
                  </div>

                  {productsOFF.length > 0 ? (
                    <div>
                      <h1 className="text-center fw-bold promo-banner p-md-5 p-3"> PROMOS SEMANALES  <br /> 20% OFF</h1>
                      <ProductsOFFList productsOFF={productsOFF} />
                      <h1 className="text-center fw-bold promo-banner p-4"> Increibles promos semanales, no te las Pierdas!</h1>
                    </div>
                  ) : <></>}

                  <h1 className="text-center fw-bold">PRODUCTOS</h1>
                  <div>
                    <Categories/>
                  </div>

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
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error en el renderizado:", error);
    return (
      <Error error={error} />
    );
  }
};
