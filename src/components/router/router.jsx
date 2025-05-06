import { NavBar } from '../navBar/navBarComponent.jsx';
import { Footer } from '../footer/footerComponent.jsx';
import { Home } from '../home/homeComponent.jsx';
import { CartComponentContext } from '../../context/cartContext.jsx';
import './router.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { CartComponent } from '../cartContainer-Component/cartContainer.jsx';
import { ConfirmBuy } from '../confirmBuy/confirmBuy.jsx';
import ProductDetail from '../ProductDetailComponent/ProductDetailComponent.jsx';
import Historia from '../Historia/Historia.jsx';


export const Router = () => {
  return (
    <CartComponentContext>
      <BrowserRouter>
        <div className="containerAPP">
          <nav>
            <NavBar />
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:code" element={< ProductDetail/>} />
              <Route path="/:category" element={<Home />} />
              <Route path="/cart" element={<CartComponent />} />
              <Route path="/confirmBuy" element={<ConfirmBuy />} />
              <Route path='/historia' element={<Historia/>} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </CartComponentContext>
  );
};
