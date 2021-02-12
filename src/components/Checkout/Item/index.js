import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeCartItem,
  // addProduct,
  // reduceCartItem,
} from "./../../../redux/Cart/cart.actions";
import {
  fetchProductStart,
  setProduct,
} from "./../../../redux/Products/products.actions";
import DeleteIcon from "@material-ui/icons/Delete";
import globalStyles from "./../../../globalStyles.js";
import "./styles.scss";

const mapState = (state) => ({
  productInDb: state.productsData.product,
});

const Item = (product) => {
  const dispatch = useDispatch();
  const { productInDb } = useSelector(mapState);
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;

  // const { documentID } = productInDb;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProductStart(documentID));
    return () => {
      dispatch(setProduct({}));
    };
  }, [documentID, dispatch]);

  useEffect(() => {
    // || !Object.keys(productInDb)
    if (productInDb.productSold) {
      handleRemoveCartItem(documentID);
    }
  });

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
