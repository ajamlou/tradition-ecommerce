import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "./../../redux/Orders/orders.actions";
import { signOutUserStart } from "./../../redux/User/user.actions";
import OrderHistory from "./../../components/OrderHistory";

import "./styles.scss";
import Subheader from "../../components/Subheader";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.email));
  }, [currentUser, dispatch]);

  return (
    <div className="orderHistory">
      <Subheader title={"MINA ORDRAR"} />

      <div className="history">
        <OrderHistory orders={orderHistory} />
      </div>
      <span className="signOut" onClick={() => signOut()}>
        Logga ut
      </span>
    </div>
  );
};

export default Dashboard;
