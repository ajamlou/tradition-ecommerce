import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
import { selectCartItems } from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "./../forms/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.scss";
import globalStyles from "../../globalStyles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const mapState = (state) => ({
  product: state.productsData.product,
});

const mapCartState = createStructuredSelector({
  cartItems: selectCartItems,
});

const useStyles = makeStyles((theme) => ({
  media: {
    margin: 0,
  },
}));

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { productID } = useParams();
  const { cartItems } = useSelector(mapCartState);
  const { product, loading } = useSelector(mapState);
  const [isLoading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const classes = useStyles();

  const {
    productThumbnail,
    productThumbnail2,
    productThumbnail3,
    productName,
    productPrice,
    productDesc,
    productCategory,
    productSold,
  } = product;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    setIsInCart(cartItems.some((item) => item.documentID === productID));
    setTimeout(function () {
      setLoading(false);
    }, 850);

    return () => {
      dispatch(setProduct({}));
    };
  }, [productID, dispatch, loading]);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    setIsInCart(true);
    setOpen(true);
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard">
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
      <div className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/products">
            Produkter
          </Link>
          <Link
            style={{ textTransform: "capitalize" }}
            color="inherit"
            to={`/products/${productCategory}`}
          >
            {productCategory}
          </Link>
          <Typography color="textPrimary">{productName}</Typography>
        </Breadcrumbs>
      </div>
      {isLoading ? (
        <div style={{ marginTop: -100 }}>
          <Skeleton height={500} className={classes.media} />
          <Skeleton height={40} style={{ marginTop: -70 }} width={"60%"} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
      ) : (
        <div>
          <div className="hero">
            <Carousel>
              <img alt="thumbnail" src={productThumbnail} />
              <img alt="thumbnail2" src={productThumbnail2} />
              <img alt="thumbnail3" src={productThumbnail3} />
            </Carousel>
          </div>
          <div className="productDetails">
            <ul>
              <div className="shortInfo">
                <li>
                  <h1 className="name">{productName}</h1>
                </li>
                <li>
                  <span className="price">{productPrice} SEK</span>
                </li>
                <li>
                  <div className="addToCart">
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
                  </div>
                </li>
              </div>
              <li>
                <span
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: productDesc }}
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
