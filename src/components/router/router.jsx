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
              <Route path="/:category" element={<Home />} />
              <Route path="/cart" element={<CartComponent />} />
              <Route path="/confirmBuy" element={<ConfirmBuy />} />
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
