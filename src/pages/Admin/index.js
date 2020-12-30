import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
  editProductStart,
  markAsSoldStart,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import globalStyles from "./../../globalStyles.js";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/LoadMore";
import CKEditor from "ckeditor4-react";
import "./styles.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("bestick");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productSold, setProductSold] = useState(false);

  const [editing, setEditing] = useState(false);
  const [productID, setProductID] = useState("");

  const ADD = "Lägg till produkt";
  const EDIT = "Ändra produkt";
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const toggleModal = () => {
    setProductCategory("bestick");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
    setEditing(false);
    setHideModal(!hideModal);
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const categories = [
    {
      name: "Bestick",
      value: "bestick",
    },
    {
      name: "Smycken",
      value: "smycken",
    },
    {
      name: "Lådor",
      value: "lådor",
    },
  ];

  const editProduct = (documentID) => {
    const product = data.filter((prod) => prod.documentID === documentID)[0];

    setHideModal(!hideModal);
    setProductID(documentID);
    setEditing(true);
    setProductCategory(product.productCategory);
    setProductThumbnail(product.productThumbnail);
    setProductName(product.productName);
    setProductPrice(product.productPrice);
    setProductDesc(product.productDesc);
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("bestick");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
    setEditing(false);
    setProductID("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editing) {
      dispatch(
        addProductStart({
          productCategory,
          productName,
          productThumbnail,
          productPrice,
          productDesc,
          productSold,
        })
      );
    } else if (editing) {
      dispatch(
        editProductStart({
          productID,
          productCategory,
          productName,
          productThumbnail,
          productPrice,
          productDesc,
        })
      );
    }

    resetForm();
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button style={{ width: 250 }} onClick={() => toggleModal()}>
              Lägg till produkt
            </Button>
          </li>
        </ul>
      </div>

      <Modal style={{ zIndex: 1000 }} {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            {editing ? <h2>Ändra produkt</h2> : <h2>Skapa produkt</h2>}

            <FormSelect
              label="Kategori"
              options={categories}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Namn"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label="Bildlänk"
              type="url"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Pris"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <CKEditor
              className="ckeditor"
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            />

            <br />
            <Button type="submit">{editing ? EDIT : ADD}</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Hantera produkter</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {
                          productCategory,
                          productName,
                          productThumbnail,
                          productPrice,
                          documentID,
                          productSold,
                        } = product;

                        return (
                          <tr key={index}>
                            <td>
                              <Link to={`/product/${documentID}`}>
                                <img
                                  className="thumb"
                                  alt="thumb"
                                  src={productThumbnail}
                                />
                              </Link>
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {productName}
                            </td>
                            <td>{productPrice}:-</td>
                            <td
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "600",
                              }}
                            >
                              {productCategory}
                              {productSold ? (
                                <p style={{ color: globalStyles.tertiary }}>
                                  Slutsåld
                                </p>
                              ) : (
                                <p style={{ color: globalStyles.primary }}>
                                  I lager
                                </p>
                              )}
                            </td>

                            <td>
                              <EditIcon
                                style={{
                                  cursor: "pointer",
                                  height: 25,
                                  width: "auto",
                                  color: globalStyles.secondary,
                                }}
                                onClick={() => editProduct(documentID)}
                              />
                            </td>
                            <td>
                              {productSold ? (
                                <p>Sätt åter i lager: </p>
                              ) : (
                                <p>Markera som såld: </p>
                              )}
                            </td>
                            <td>
                              {productSold ? (
                                <DoneIcon
                                  style={{
                                    cursor: "pointer",
                                    height: 25,
                                    width: "auto",
                                    color: globalStyles.primary,
                                  }}
                                  onClick={() =>
                                    dispatch(
                                      markAsSoldStart([documentID, productSold])
                                    )
                                  }
                                />
                              ) : (
                                <DoneOutlineIcon
                                  style={{
                                    cursor: "pointer",
                                    height: 25,
                                    width: "auto",
                                    color: globalStyles.primary,
                                  }}
                                  onClick={() =>
                                    dispatch(
                                      markAsSoldStart([documentID, productSold])
                                    )
                                  }
                                />
                              )}
                            </td>
                            <td>
                              <DeleteIcon
                                style={{
                                  height: 25,
                                  width: "auto",
                                  color: globalStyles.tertiary,
                                }}
                                className="delete"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Är du säker på att du vill ta bort den här produkten?"
                                    )
                                  ) {
                                    dispatch(deleteProductStart(documentID));
                                  }
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
