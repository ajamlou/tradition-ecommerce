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
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const {
    orderTotal,
    shippingCost,
    city,
    postalCode,
    line1,
    recipientName,
    phoneNumber,
  } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, [dispatch, orderID]);

  return (
    <div className="confirmationContainer">
      <Subheader title={"ORDERBEKRÄFTELSE"} />
      <div className="description">
        <p>Tack för din beställning!</p>
        <p>
          Du kommer att få ett bekräftelsemail inom kort. Om du inte hittar det
          kan du behöva kolla i "Skräppost". Leverans görs med PostNord till
          närmaste postombud inom 3-10 arbetsdagar.
        </p>
        <p>
          Har du ett konto hos oss kan du också se dina beställningar under{" "}
          <Link to="/dashboard" style={{ color: globalStyles.primary }}>
            Mina ordrar
          </Link>
          . Har du frågor om din order kan du skicka ett mail till oss på
          order.tradition@gmail.com.
        </p>
      </div>
      <div className="orderWrap">
        <h1>Ordernummer: #{orderID}</h1>
        <OrderDetails order={orderDetails} />
        <h1>Leveransdetaljer</h1>
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
            <tr>
              <td>Telefonnummer:</td>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <td>Fraktkostnad:</td>
              <td>{shippingCost} SEK</td>
            </tr>
          </tbody>
        </table>

        <h1>Summa: {orderTotal} SEK</h1>
      </div>
    </div>
  );
};

export default OrderConfirmed;
