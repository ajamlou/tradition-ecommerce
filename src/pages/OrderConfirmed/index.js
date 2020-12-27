import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetailsStart } from "./../../redux/Orders/orders.actions";
import { useDispatch, useSelector } from "react-redux";
// import globalStyles from "./../../globalStyles.js";
import "./styles.scss";
import Subheader from "../../components/Subheader/index.js";
import OrderDetails from "./../../components/OrderDetails";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const OrderConfirmed = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, [dispatch, orderID]);

  return (
    <div>
      <Subheader title={"ORDERBEKRÄFTELSE"} />
      <h1>Ordernummer: #{orderID}</h1>

      <OrderDetails order={orderDetails} />
      <h2>Summa: {orderTotal}</h2>
    </div>
  );
};

export default OrderConfirmed;
