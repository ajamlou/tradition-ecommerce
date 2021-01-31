import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import Button from "./../forms/Button";
import Item from "./Item";
import Subheader from "../Subheader";

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
    const totalWeight = cartItems.reduce((a, b) => +a + +b.productWeight, 0);
    console.log(totalWeight);
    if (totalWeight < 1000) {
      setShippingCost(66);
    }
    if (totalWeight > 1000 && totalWeight < 6000) {
      setShippingCost(126);
    }
  }, []);

  return (
    <div className="checkout">
      <Subheader title={"VARUKORG"} />

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table
                    className="checkoutHeader"
                    border="0"
                    // cellPadding="10"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr>
                        <th>Produkt</th>
                        <th>Beskrivning</th>
                        <th>Antal</th>
                        <th>Pris</th>
                        <th>Ta bort</th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
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
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td className="total">
                                  <h5>
                                    Leveranstid är 3-10 arbetsdagar och sker
                                    till närmaste PostNord-ombud.
                                  </h5>
                                  <h3>Fraktkostnad: {shippingCost}:-</h3>
                                  <h2>Total: {total + shippingCost}:-</h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <Button onClick={() => history.goBack()}>
                                    Fortsätt handla
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    onClick={() => history.push("/payment")}
                                  >
                                    Gå till kassan
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
