import React, { useContext } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import Quantitybutton from "./Quantitybutton";
import { CartContext } from "./CartContext";
export default function Check() {
  let { cartItems } = useContext(CartContext);

  let cartempty = cartItems <= 0 ? true : false;
  let grandtotal = cartItems.reduce((total, product) => {
    return (total += product.price * product.quantity);
  }, 0);
  let freeshoppingPrice = 99;
  return (
    <>
      <div>
        <Title maintitle="你的購物車" />
        {cartempty && (
          <div className="nothingInCart">
            購物車現在沒有商品
            <br />
            <Link to="/">去首頁看看吧</Link>
          </div>
        )}
        {!cartempty && (
          <div className="container">
            <div id="cartSection">
              <table className="checkoutTable">
                <tbody>
                  {cartItems.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <Link to={"/productdetail/" + product.id}>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/img/" + product.image
                            }
                            alt={product.name}
                          />
                        </Link>
                      </td>
                      <td>
                        <p>名稱:{product.name}</p>
                        <p>價錢:{product.price}</p>
                        <p>描述:{product.description}</p>
                      </td>
                      <td>
                        <Quantitybutton productinfo={product} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="checkoutSection">
              <div>全部價錢總共{grandtotal}元</div>
              {grandtotal > freeshoppingPrice ? (
                <div className="freeShipping">我們免費送貨✔️</div>
              ) : (
                <div className="noShipping">
                  滿{freeshoppingPrice}元可以免運
                  <br />
                  還差{freeshoppingPrice - grandtotal}元
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
