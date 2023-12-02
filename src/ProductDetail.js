import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "./Title";
import Quantitybutton from "./Quantitybutton";

export default function ProductDetail() {
  let param = useParams();
  let [productDetail, setProductDetail] = useState(null);
  useEffect(() => {
    //1.無第二個參數，component每次render都會觸發
    //2.Dependency array是空array時，只會在第一次網頁render時會觸發
    //3.Dependency array是有變數時，第一次網頁render時，指定的變數改變會觸發
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((response) => response.json())
      .then((data) => {
        let productinfo = data.find((element) => {
          return element.id === parseInt(param.id);
        });
        setProductDetail(productinfo);
      });
  }, [param.id]);
  return (
    <div>
      {productDetail && (
        <div className="ProductDetail">
          <Title maintitle={productDetail.name + "產品介紹"} />
          <table width="100%">
            <tbody>
              <tr>
                <td align="right">
                  <img
                    src={process.env.PUBLIC_URL + "/img/" + productDetail.image}
                    alt={productDetail.name}
                    width="400"
                  />
                </td>
                <td width="50%" padding="10">
                  <p>名稱:{productDetail.name}</p>
                  <p>售價:{productDetail.price}</p>
                  <p>描述:{productDetail.description}</p>
                  <br />
                  <Quantitybutton productinfo={productDetail} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Link to="/">
        <div className="backToGoodsListBtn">↩️ 返回首頁</div>
      </Link>
    </div>
  );
}
