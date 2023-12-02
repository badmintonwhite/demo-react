import React, { useEffect } from "react";
import styles from "./ProductList.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import Quantitybutton from "./Quantitybutton";

export default function ProductList() {
  const [showProduct, setShowProduct] = useState(true);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    //1.無第二個參數，component每次render都會觸發
    //2.Dependency array是空array時，只會在第一次網頁render時會觸發
    //3.Dependency array是有變數時，第一次網頁render時，指定的變數改變會觸發
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  return (
    //React.Fragment簡寫
    <>
      <Title maintitle="請選擇要購買的水果" subtitle="今天有九折" />
      <div>
        <div className="button">
          {showProduct && (
            <button onClick={() => setShowProduct(false)}>隱藏產品</button>
          )}
          {!showProduct && (
            <button onClick={() => setShowProduct(true)}>顯示產品</button>
          )}
        </div>
        <div className="container">
          {showProduct &&
            productList.map((product) => (
              <React.Fragment key={product.id}>
                <div className="containerItem">
                  <div className="productName">
                    {product.name}
                    <br />
                    {product.price}元
                    <br />
                    {product.description}
                    <br />
                  </div>
                  <Link to={"/productdetail/" + product.id}>
                    <img
                      src={process.env.PUBLIC_URL + "/img/" + product.image}
                      alt={product.name}
                    />
                  </Link>
                  <br />
                  <Quantitybutton productinfo={product} />
                  <br />
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
}
