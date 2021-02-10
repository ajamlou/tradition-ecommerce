import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./../../forms/Button";
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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector(mapState);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice,
    productSold,
  } = product;

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.documentID === documentID));
  }, [cartItems]);

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    setOpen(true);
    setIsInCart(true);
    dispatch(addProduct(product));
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
            fontSize: 16,
            fontFamily: globalStyles.fontFamily,
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
              <h3>VISA PRODUKT</h3>
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
                    <div>
                      {isInCart ? (
                        <Button
                          style={{
                            backgroundColor: globalStyles.hover,
                            borderColor: globalStyles.hover,
                          }}
                          disabled
                        >
                          Tillagd i varukorg
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
