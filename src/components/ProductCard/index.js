import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
import { selectCartItems } from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "./../forms/Button";
import Modal from "./../../components/Modal";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.scss";
import globalStyles from "../../globalStyles";

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
  const history = useHistory();
  const [hideModal, setHideModal] = useState(true);
  const { productID } = useParams();
  const { cartItems } = useSelector(mapCartState);
  const { product, loading } = useSelector(mapState);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();

  const {
    productThumbnail,
    productName,
    productPrice,
    productDesc,
    productCategory,
    productSold,
  } = product;

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    setTimeout(function () {
      setLoading(false);
    }, 850);

    return () => {
      dispatch(setProduct({}));
    };
  }, [productID, dispatch, loading]);

  const handleAddToCart = (product) => {
    if (!product) return;

    if (cartItems.some((item) => item.documentID === productID)) {
      setHideModal(!hideModal);
    } else {
      dispatch(addProduct(product));
      history.push("/cart");
    }
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard">
      <div className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/products">
            Produkter
          </Link>
          <Typography
            style={{ textTransform: "capitalize" }}
            color="textPrimary"
          >
            {productCategory}
          </Typography>
        </Breadcrumbs>
      </div>
      <Modal style={{ zIndex: 1000, textAlign: "center" }} {...configModal}>
        <div>
          <p style={{ textAlign: "center" }}>
            Tyvärr finns det enbart 1 av detta föremål.
          </p>
          <Button onClick={() => toggleModal()}>OK</Button>
        </div>
      </Modal>
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
            <img alt="thumbnail" src={productThumbnail} />
          </div>
          <div className="productDetails">
            <ul>
              <li>
                <h1>{productName}</h1>
              </li>
              <li>
                <span className="price">{productPrice}:-</span>
              </li>
              <li>
                {productSold ? (
                  <p style={{ color: globalStyles.tertiary, fontWeight: 600 }}>
                    Slutsåld
                  </p>
                ) : (
                  <p></p>
                )}
              </li>
              <li>
                <Link
                  to={`/products/${productCategory}`}
                  style={{ textTransform: "capitalize" }}
                >
                  Kategori: {productCategory}
                </Link>
              </li>
              <li>
                <div className="addToCart">
                  {productSold ? null : (
                    <Button
                      {...configAddToCartBtn}
                      onClick={() => handleAddToCart(product)}
                    >
                      Köp
                    </Button>
                  )}
                </div>
              </li>
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
