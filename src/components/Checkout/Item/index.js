import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeCartItem,
  // addProduct,
  // reduceCartItem,
} from "./../../../redux/Cart/cart.actions";
import DeleteIcon from "@material-ui/icons/Delete";
import globalStyles from "./../../../globalStyles.js";
import "./styles.scss";

const Item = (product) => {
  const dispatch = useDispatch();
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };

  // const handleAddProduct = (product) => {
  //   dispatch(addProduct(product));
  // };

  // const handleReduceItem = (product) => {
  //   dispatch(reduceCartItem(product));
  // };

  return (
    <div className="cartItem">
      <div className="productItem">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
        <div className="descInfo">
          <h2>{productName}</h2>
          <h3>{quantity} st</h3>
          <h3>{productPrice} SEK</h3>
        </div>
      </div>
      <span
        className="cartBtn"
        onClick={() => handleRemoveCartItem(documentID)}
      >
        <DeleteIcon
          style={{
            height: 25,
            width: "auto",
            color: globalStyles.tertiary,
          }}
        />
      </span>
    </div>
  );
};

export default Item;
