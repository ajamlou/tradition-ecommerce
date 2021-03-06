import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import Button from "./../forms/Button";
import InvertedButton from "./../forms/InvertedButton";
import Item from "./Item";
import Subheader from "../Subheader";
import globalStyles from "../../globalStyles";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = (props) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  const [shippingCost, setShippingCost] = useState(0);

  const errMsg = "Din varukorg är tom.";

  useEffect(() => {
    getShippingCost();
  }, [cartItems]);

  const getShippingCost = () => {
    const totalWeight = cartItems.reduce((a, b) => +a + +b.productWeight, 0);

    if (totalWeight < 1000) {
      setShippingCost(66);
    }
    if (totalWeight > 1000 && totalWeight < 2000) {
      setShippingCost(99);
    }
    if (totalWeight > 2000 && totalWeight < 3000) {
      setShippingCost(122);
    }
    if (totalWeight > 3000 && totalWeight < 5000) {
      setShippingCost(149);
    }
    if (totalWeight > 5000 && totalWeight < 10000) {
      setShippingCost(199);
    }
    if (totalWeight > 10000 && totalWeight < 15000) {
      setShippingCost(240);
    }
    if (totalWeight > 15000 && totalWeight < 20000) {
      setShippingCost(285);
    }
  };

  return (
    <div className="checkout">
      <Subheader title={"VARUKORG"} />
      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <div className="sum">
                            <div className="amountRow">
                              <h3>Subtotal:</h3>
                              <h3>{total} SEK</h3>
                            </div>
                            <div className="amountRow">
                              <h3>Leveranskostnad*:</h3>
                              <h3>{shippingCost} SEK</h3>
                            </div>
                            <div
                              style={{
                                paddingBottom: 50,
                                fontSize: 18,
                              }}
                              className="amountRow"
                            >
                              <h3>Total:</h3>
                              <h3>{total + shippingCost} SEK</h3>
                            </div>
                            <h5
                              style={{
                                fontStyle: "italics",
                                fontSize: 12,
                                fontWeight: 300,
                              }}
                            >
                              *Leveranskostnad beräknas utifrån föremålens vikt
                            </h5>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: 30 }}>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <InvertedButton
                                    onClick={() => history.goBack()}
                                  >
                                    Tillbaka
                                  </InvertedButton>
                                </td>
                                <td>
                                  <Button
                                    onClick={() => history.push("/payment")}
                                  >
                                    Betala
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div style={{ paddingTop: 100, paddingBottom: 100 }}>
            <p>{errMsg}</p>
            <p>
              Fortsätt att handla{" "}
              <Link style={{ fontWeight: 600 }} to="/products">
                här
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
