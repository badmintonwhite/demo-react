import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export default function Quantitybutton({ productinfo }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  //購物車有無該產品
  let productIndexpart = cartItems.findIndex((element) => {
    return element.id === productinfo.id;
  });
  let [numInCart, setNumInCart] = useState(
    productIndexpart === -1 ? 0 : cartItems[productIndexpart].quantity
  );
  const handleAdd = () => {
    if (productIndexpart === -1) {
      setCartItems([
        {
          id: productinfo.id,
          name: productinfo.name,
          price: productinfo.price,
          image: productinfo.image,
          description: productinfo.description,
          quantity: 1,
        },
        ...cartItems,
      ]);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexpart].quantity++;
      setCartItems(newCartArray);
    }
    setNumInCart(numInCart + 1);
  };
  const handleSubtract = () => {
    if (cartItems[productIndexpart].quantity === 1) {
      let newCartArray = [...cartItems];
      newCartArray.splice(productIndexpart, 1);
      setCartItems(newCartArray);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexpart].quantity--;
      setCartItems(newCartArray);
    }
    setNumInCart(numInCart - 1);
  };

  return (
    <div className="addToCart">
      {numInCart === 0 ? (
        <span className="addToCartBtn" onClick={handleAdd}>
          {" "}
          加入{productinfo.name}購物車
        </span>
      ) : (
        <div>
          <span className="subtractBtn" onClick={handleAdd}>
            +
          </span>
          {numInCart}件
          <span className="addBtn" onClick={handleSubtract}>
            -
          </span>
        </div>
      )}
    </div>
  );
}
