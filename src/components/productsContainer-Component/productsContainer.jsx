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
import HistoryBanner from "../HistoryBanner/HistoryBanner.jsx";

export const ProductsComponent = () => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsOFF, setProductsOFF] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [productOffset, setProductOffset] = useState(0);
  const [prodsDestacadosList, setProdsDestacadosList] = useState([]);
  const [currentDestacados, setCurrentDestacados] = useState([]);
  const [pageCountDestacados, setPageCountDestacados] = useState(0);
  const [destacadosOffset, setDestacadosOffset] = useState(0);
  const [error, setError] = useState(null);
  const productsPerPage = 6;
  const destacadosPerPage = 12;

  // Productos por lotes
  const [lote0, setLote0] = useState([]);
  const [lote1, setLote1] = useState([]);
  const [lote2, setLote2] = useState([]);

  // Obtener title pero de query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");

  // Obtener category por params
  const { category } = useParams();

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

  useEffect(() => {
    try {
      if (loading || products.length === 0) return;
  
      // Productos OFF
      let codesFind = [
        51910, 61820, 51950, 15024, 241940, 154170, 154860, 237380, 237450,
        212400, 214160, 214330, 214900, 156030, 156050, 156060, 241103,
        56540, 181040, 305992, 153440, 206550, 271943
      ];
      
      let newProductsOFF = products.filter((p) => codesFind.includes(p.code));
      setProductsOFF(newProductsOFF);
  
      // Filtros por búsqueda o categoría
      let filteredProducts = products;
      if (title) {
        filteredProducts = products.filter(
          (p) => p.title && p.title.toLowerCase().includes(title.toLowerCase())
        );
        setSearchProduct(filteredProducts);
      }
      if (category) {
        let filterProdsByCategory = products.filter(
          (p) => p.category === category
        );
        filteredProducts = filterProdsByCategory;
        setSearchProduct(filterProdsByCategory);
      }
  
      const endOffset = productOffset + productsPerPage;
      const currentProducts = filteredProducts.slice(productOffset, endOffset);
      setCurrentProducts(currentProducts);
      setPageCount(
        Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))
      );
  
      // Lotes
      let codeslote0 = [192810, 322010, 29330, 321790, 29441, 31560, 176880];
      let codeslote1 = [87280, 36450, 49040, 176290, 110010, 136010, 116670];
      let codeslote2 = [176880, 35010, 29081, 29085, 87280, 35150, 193010];
  
      let asignLote0 = products.filter((p) => codeslote1.includes(p.code));
      setLote0(asignLote0);
      let asignLote1 = products.filter((p) => codeslote0.includes(p.code));
      setLote1(asignLote1);
      let asignLote2 = products.filter((p) => codeslote2.includes(p.code));
      setLote2(asignLote2);
  
      // Productos destacados
      let codesProdsDestacados = [
        154225, 159000, 172390, 192280, 27230, 192370, 31240, 192420, 31450, 192960,
        31560, 206850, 34240, 208030, 34260, 208070, 44330, 212310, 51930, 212800,
        55220, 214440, 61990, 227020, 69710, 227060, 69910, 227110, 88700, 241203,
        88910, 241533, 95350, 241539, 95530, 241940, 95800, 241941, 242220, 121000,
        242422, 242750, 270010, 270360, 270400, 121729, 270410, 121730, 270430,
        145000, 270440, 145110, 270450, 145200, 270470, 145620, 270480, 154081,
        270500, 154280, 270523, 154382, 271010, 154384, 271040, 154475, 271920,
        215060, 270450,
      ];
  
      let last7Codes = [10000, 10850, 111660, 121130, 121220, 121270, 121566];
      let firstCodes = codesProdsDestacados.filter(code => !last7Codes.includes(code));
  
      let destacadosMain = products.filter((p) => firstCodes.includes(p.code));
      let destacadosLast7 = products.filter((p) => last7Codes.includes(p.code));
  
      let prodsForDestacados = [...destacadosMain, ...destacadosLast7];
      setProdsDestacadosList(prodsForDestacados);
  
      const endDestacadosOffset = destacadosOffset + destacadosPerPage;
      const currentDestacadosSlice = prodsForDestacados.slice(
        destacadosOffset,
        endDestacadosOffset
      );
      setCurrentDestacados(currentDestacadosSlice);
      setPageCountDestacados(
        Math.max(1, Math.ceil(prodsForDestacados.length / destacadosPerPage))
      );
    } catch (error) {
      setError("Ocurrió un problema al procesar la paginación.");
    }
  }, [title, products, productOffset, loading, category, destacadosOffset]);
  
  const handlePageClick = (e) => {
    const newOffset = (e.selected * productsPerPage) % products.length;
    setProductOffset(newOffset);
  };

  const handleDestacadosPageClick = (e) => {
    const newOffset = (e.selected * destacadosPerPage) % prodsDestacadosList.length;
    setDestacadosOffset(newOffset);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={fibronesIMG} alt="" className="fibronesIMG" />
      </div>
      <HistoryBanner />
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
                <div className="combo-section py-4 container">
                  <h2 className="text-center mb-3 section-title">
                    ¡Arma tu Combo y Ahorra!
                  </h2>
                  <h3 className="text-center benefit-text mb-4">
                    10% OFF + Envío Gratis
                  </h3>
                  <div className="carrouselBootstrapContainer">
                    <Carrousel lote0={lote0} lote1={lote1} lote2={lote2} />
                  </div>
                </div>

                {productsOFF.length > 0 && (
                  <div>
                    <h1 className="text-center fw-bold promo-banner p-md-5 p-3">
                      PROMOS SEMANALES <br /> 10% OFF <br />
                      <h3>
                        <mark className="bg-info mt-3">
                          Comprando <strong>5</strong> Productos o más, el{" "}
                          <strong>Envió es GRATíS</strong>
                        </mark>
                      </h3>
                    </h1>
                    <ProductsOFFList productsOFF={productsOFF} />
                  </div>
                )}

                {/* Productos Destacados */}
                <h1 className="destacados-title text-center fw-bold p-4 mb-0">
                  PRODUCTOS DESTACADOS
                </h1>
                <div className="prodsDestacados-Wrapper">
                  {currentDestacados.length > 0 && (
                    <ProductsList products={currentDestacados} />
                  )}

                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Siguiente >"
                    onPageChange={handleDestacadosPageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCountDestacados}
                    previousLabel="< Anterior"
                    containerClassName="pagination d-flex justify-content-center mt-4 p-2 flex-wrap"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                  />
                </div>

                {/* Productos */}
                <h2 className="catalogo-title text-center fw-bold p-4 mb-2">Catálogo General</h2>
                <Categories/>
                <div>
                  <ProductsList products={currentProducts} />

                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Siguiente >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Anterior"
                    containerClassName="pagination d-flex justify-content-center mt-4 p-2 flex-wrap"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
