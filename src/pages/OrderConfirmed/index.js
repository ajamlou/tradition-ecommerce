import React, { useEffect } from "react";
import { getOrderDetailsStart } from "./../../redux/Orders/orders.actions";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import Subheader from "../../components/Subheader/index.js";
import OrderDetails from "./../../components/OrderDetails";
import globalStyles from "../../globalStyles";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const OrderConfirmed = (props) => {
  const { orderID } = useParams();
  // const shippingCost = 66;
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const {
    orderTotal,
    shippingCost,
    city,
    postalCode,
    line1,
    recipientName,
  } = orderDetails;

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
        Har du ett konto hos oss kan du också se dina beställningar under{" "}
        <Link to="/dashboard" style={{ color: globalStyles.primary }}>
          Mitt konto
        </Link>
        . Har du frågor om din order kan du skicka ett mail till oss på
        info@tradition.nu.
      </p>
      <div className="orderWrap">
        <h1>Ordernummer: #{orderID}</h1>
        <OrderDetails order={orderDetails} />
        <h2>Leveransdetaljer:</h2>
        <table className="deliveryDetails">
          <tbody>
            <tr>
              <td>Namn:</td>
              <td>{recipientName}</td>
            </tr>
            <tr>
              <td>Gatuadress:</td>
              <td>{line1}</td>
            </tr>
            <tr>
              <td>Postnummer:</td>
              <td>{postalCode}</td>
            </tr>
            <tr>
              <td>Postort:</td>
              <td>{city}</td>
            </tr>
          </tbody>
        </table>

        <h2>Fraktkostnad: {shippingCost}:-</h2>
        <h1>Summa: {orderTotal}:-</h1>
      </div>
    </div>
  );
};

export default OrderConfirmed;
