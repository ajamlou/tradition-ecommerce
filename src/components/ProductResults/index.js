import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "./../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from "./../forms/FormSelect";
import LoadMore from "./../LoadMore";
import Subheader from "./../Subheader";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = (props) => {
  const dispatch = useDispatch();
  // const { category } = useParams();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType, dispatch]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/products/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Visa alla",
        value: "",
      },
      {
        name: "Dekorationer",
        value: "dekorationer",
      },
      {
        name: "Smycken",
        value: "smycken",
      },
      {
        name: "Till köket",
        value: "köket",
      },
      {
        name: "Övrigt",
        value: "övrigt",
      },
    ],
    handleChange: handleFilter,
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <Subheader title={"PRODUKTER"} />
        <FormSelect {...configFilters} />
        <p className="noProducts">
          Det finns tyvärr inga produkter för närvarande i denna kategori.
        </p>
      </div>
    );
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">
      <Subheader title={"PRODUKTER"} />

      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product key={pos} {...configProduct} />;
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
