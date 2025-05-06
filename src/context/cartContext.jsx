import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartComponentContext = ({ children }) => {
    const [send, setSend] = useState(0)
    const [cart, setCart] = useState(() => {
        const savedCart = sessionStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });

      useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

  const cleanCart = () => {
    setCart([]);
  };

  const findProdInCartByIndex = (code) => {
    return cart.findIndex((prod) => prod.code === code);
  };

  const addProdInCart = (prod, quantity, details) => {
    const { code } = prod;
    if(!details){
      details = '-'
    }

    try {
      const newCart = [...cart];
      const existProdIndex = newCart.findIndex((item) => item.code === code);

      if (existProdIndex !== -1) {
        newCart[existProdIndex].quantity += quantity;
      } else {
        prod.quantity = quantity;
        prod.detail = details
        newCart.push(prod);
      }

      setCart(newCart);

      return { succes: true };
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      return { succes: false };
    }
  };
  const removeProdInCart = (code) => {
    const newCart = cart.filter((item) => item.code !== code);
    setCart(newCart);
  };

  const substractQuantityInCart = (code) => {
    const newCart = [...cart];
    const existProd = newCart.find((item) => item.code === code);

    if (existProd && existProd.quantity > 1) {
      existProd.quantity -= 1;
      setCart(newCart);
    }
  };

  const addQuantityInCart = (code) => {
    const newCart = [...cart];
    const existProd = newCart.find((item) => item.code === code);

    if (existProd) {
      existProd.quantity++;
      setCart(newCart);
    }
  };

  const counterCart = () => {
    return cart.length;
  };

  const totalPriceCart = cart.reduce(
    (acc, prod) => acc + prod.price * prod.quantity,
    0)

  const functionsContext = {
    cleanCart,
    addProdInCart,
    findProdInCartByIndex,
    removeProdInCart,
    substractQuantityInCart,
    addQuantityInCart,
    counterCart,
    totalPriceCart,
    cart,
    setCart,
    send,
    setSend
  };

  return (
    <CartContext.Provider value={functionsContext}>
      {children}
    </CartContext.Provider>
  );
};
