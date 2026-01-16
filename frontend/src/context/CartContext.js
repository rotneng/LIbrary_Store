import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === book._id);
      if (existing) {
        return prevCart;
      }
      return [...prevCart, book];
    });
    alert(`${book.title} added to cart!`);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((item) => item._id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
