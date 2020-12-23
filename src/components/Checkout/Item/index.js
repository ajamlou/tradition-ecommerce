import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../../redux/Cart/cart.actions";
import DeleteIcon from "@material-ui/icons/Delete";

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

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span className="cartBtn" onClick={() => handleReduceItem(product)}>
              {`– `}
            </span>
            <span>{quantity}</span>
            <span className="cartBtn" onClick={() => handleAddProduct(product)}>
              {` +`}
            </span>
          </td>
          <td>{productPrice}:-</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              <DeleteIcon style={{ height: 25, width: "auto" }} />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
