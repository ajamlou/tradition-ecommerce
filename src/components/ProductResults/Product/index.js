import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./../../forms/Button";
import Modal from "./../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./../../../redux/Cart/cart.actions";
import { selectCartItems } from "./../../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import globalStyles from "../../../globalStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
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
        <Alert
          style={{
            backgroundColor: globalStyles.snackBar,
            fontFamily: globalStyles.fontFamily,
            color: "white",
            fontSize: 16,
            maxWidth: 320,
          }}
          onClose={handleClose}
          severity="success"
        >
          {productName} tillagd i varukorgen
        </Alert>
      </Snackbar>
      <Modal style={{ zIndex: 1000, textAlign: "center" }} {...configModal}>
        <div>
          <p style={{ textAlign: "center" }}>
            Tyvärr finns det enbart 1 av detta föremål.
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
                      Lägg till
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
