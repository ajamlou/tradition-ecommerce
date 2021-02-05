import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetailsStart } from "./../../redux/Orders/orders.actions";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "./../../components/OrderDetails";
import "./styles.scss";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const Order = () => {
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
    <div className="order">
      <h1>Ordernummer: {orderID}</h1>

      <OrderDetails order={orderDetails} />

      <h2 style={{ paddingTop: 20 }}>Leveransdetaljer:</h2>
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
        </tbody>
      </table>

      <div className="shippingDetails">
        <h2>Frakt: {shippingCost} SEK</h2>
        <h2>Summa: {orderTotal} SEK</h2>
      </div>
    </div>
  );
};

export default Order;
