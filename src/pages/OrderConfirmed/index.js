import React, { useEffect } from "react";
import { getOrderDetailsStart } from "./../../redux/Orders/orders.actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import Subheader from "../../components/Subheader/index.js";
import OrderDetails from "./../../components/OrderDetails";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const OrderConfirmed = (props) => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, [dispatch, orderID]);

  return (
    <div className="confirmationContainer">
      <Subheader title={"ORDERBEKRÄFTELSE"} />
      <p
        style={{
          textAlign: "center",
          lineHeight: 2,
        }}
      >
        Tack för din beställning!
      </p>
      <p
        style={{
          textAlign: "center",
          lineHeight: 2,
        }}
      >
        Du kommer att få ett bekräftelsemail inom kort. Leverans görs till
        närmaste postombud inom ca 7 arbetsdagar.
      </p>
      <p
        style={{
          textAlign: "center",
          lineHeight: 2,
        }}
      >
        Har du ett konto hos oss kan du också se dina beställningar under "Mitt
        konto".
      </p>
      <div className="orderWrap">
        <h1>Ordernummer: #{orderID}</h1>
        <OrderDetails order={orderDetails} />
        <h2>Summa: {orderTotal}:-</h2>
      </div>
    </div>
  );
};

export default OrderConfirmed;