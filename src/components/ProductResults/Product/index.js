import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./../../forms/Button";
import Modal from "./../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./../../../redux/Cart/cart.actions";
import { selectCartItems } from "./../../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import globalStyles from "../../../globalStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    fontSize: 20,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

const Product = (product) => {
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector(mapState);
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

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  setTimeout(function () {
    setLoading(false);
  }, 800);

  const configAddToCartBtn = {
    type: "button",
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    if (cartItems.some((item) => item.documentID === documentID)) {
      setHideModal(!hideModal);
    } else {
      setOpen(true);
      dispatch(addProduct(product));
    }
  };

  return (
    <div className="product">
      <Snackbar
        className={classes.root}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: globalStyles.snackBar,
            fontSize: 14,
          }}
          message={"Tillagd i varukorgen!"}
          action={
            <IconButton
              aria-label="close"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          }
        />
      </Snackbar>
      <Modal style={{ zIndex: 1000, textAlign: "center" }} {...configModal}>
        <div>
          <p style={{ textAlign: "center" }}>
            Denna vara är redan tillagd i varukorgen
          </p>
          <Button onClick={() => toggleModal()}>OK</Button>
        </div>
      </Modal>
      {loading ? (
        <div style={{ marginTop: -70 }}>
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
                <span className="price">{productPrice} SEK</span>
              </li>
              <li>
                <div className="addToCart">
                  {productSold ? (
                    <Button
                      style={{
                        backgroundColor: globalStyles.secondary,
                        borderColor: globalStyles.secondary,
                      }}
                      disabled
                    >
                      Slutsåld
                    </Button>
                  ) : (
                    <Button
                      {...configAddToCartBtn}
                      onClick={() => handleAddToCart(product)}
                    >
                      Lägg i varukorg
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
