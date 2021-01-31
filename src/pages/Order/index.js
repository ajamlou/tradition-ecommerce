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
  } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, [dispatch, orderID]);

  return (
    <div className="order">
      <h1>Ordernummer: {orderID}</h1>

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

      <h2>Frakt: {shippingCost}:-</h2>
      <h2>Summa: {orderTotal}:-</h2>
    </div>
  );
};

export default Order;
