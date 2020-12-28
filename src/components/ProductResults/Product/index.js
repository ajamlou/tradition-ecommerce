import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./../../forms/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "./../../../redux/Cart/cart.actions";
import globalStyles from "../../../globalStyles";
import Skeleton from "@material-ui/lab/Skeleton";

const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice,
    productSold,
  } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  setTimeout(function () {
    setLoading(false);
  }, 800);

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <div className="product">
      {loading ? (
        <div>
          <Skeleton height={300} />
          <Skeleton height={40} style={{ marginTop: -50 }} />
          <Skeleton height={40} />
        </div>
      ) : (
        <div>
          <div className="thumb">
            <Link to={`/product/${documentID}`}>
              <img src={productThumbnail} alt={productName} />
              <div className="showProduct">Visa produkt</div>
            </Link>
          </div>

          <div className="details">
            <ul>
              <li>
                <span className="name">
                  <Link
                    to={`/product/${documentID}`}
                    style={{ color: globalStyles.primary }}
                  >
                    {productName}
                  </Link>
                </span>
              </li>
              <li>
                <span className="price">{productPrice}:-</span>
              </li>
              <li>
                <div className="addToCart">
                  {productSold ? (
                    <Button
                      style={{ backgroundColor: globalStyles.tertiary }}
                      disabled
                    >
                      Slutsåld
                    </Button>
                  ) : (
                    <Button
                      {...configAddToCartBtn}
                      onClick={() => handleAddToCart(product)}
                    >
                      Köp
                    </Button>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
