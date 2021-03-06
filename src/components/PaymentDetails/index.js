import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import CircularProgress from "@material-ui/core/CircularProgress";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Item from "./../Checkout/Item";
import Modal from "./../../components/Modal";
import { firestore } from "./../../firebase/utils";
import { apiInstance } from "./../../Utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "./../../redux/Cart/cart.selectors";
import { markAsSoldStart } from "./../../redux/Products/products.actions";
import {
  saveOrderHistory,
  getUserOrderHistory,
} from "./../../redux/Orders/orders.actions";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import globalStyles from "../../globalStyles";
import TermsAndConditions from "../TermsAndConditions";
import Subheader from "../Subheader";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const PAY = "Betala nu";

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const mapUserState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const { currentUser, orderHistory } = useSelector(mapUserState);
  const dispatch = useDispatch();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [accept, setAccept] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkboxSame, setCheckboxSame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [documentID, setDocumentID] = useState("");
  const [hideModal, setHideModal] = useState(true);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

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

  useEffect(() => {
    if (!transactionCompleted && itemCount < 1) {
      history.push("/products");
      setLoading(false);
    }
  }, [itemCount, currentUser, history]);

  useEffect(() => {
    if (transactionCompleted) {
      const orderID = orderHistory[0].documentID;
      history.push(`/orderConfirmed/${orderID}`);
      //triggerEmail(orderID);
      setLoading(false);
      setTransactionCompleted(false);
    }
  }, [itemCount, currentUser, history]);

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const toggleModal = () => setHideModal(!hideModal);

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setCheckboxSame(!checkboxSame);
    if (checkboxSame) {
      setNameOnCard(recipientName);
      setBillingAddress(shippingAddress);
    } else if (!checkboxSame) {
      setNameOnCard("");
      setBillingAddress({ ...initialAddressState });
    }
  };

  const triggerEmail = (orderID) => {
    const html = `

      <h2>Tack för din beställning!</h2>

      <p>Ditt order-ID är: ${orderID}</p>
      <h3>Produkter</h3>
      <table className="deliveryDetails">
            <tbody>
              <tr>
                ${cartItems.map((item, pos) => {
                  return (
                    <tr key={pos}>
                      <td>{item.productName}</td>
                    </tr>
                  );
                })}
              </tr>
              <tr>
                <td>Subtotal:</td>
                <td>${total}</td>
              </tr>
              <tr>
                <td>Fraktkostnad:</td>
                <td>${shippingCost}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>${total + shippingCost}</td>
              </tr>
            </tbody>
          </table>

      <h3>Leveransdetaljer</h3>
      <table className="deliveryDetails">
            <tbody>
              <tr>
                <td>Namn:</td>
                <td>${recipientName}</td>
              </tr>
              <tr>
                <td>Gatuadress:</td>
                <td>${shippingAddress.line1}</td>
                <td>${shippingAddress.line2}</td>
              </tr>
              <tr>
                <td>Postnummer:</td>
                <td>${shippingAddress.postal_code}</td>
              </tr>
              <tr>
                <td>Postort:</td>
                <td>${shippingAddress.city}</td>
              </tr>
              <tr>
                <td>Telefonnummer:</td>
                <td>${phoneNumber}</td>
              </tr>
            </tbody>
          </table>
      <br />
      <p>
      Leverans görs med PostNord till närmaste postombud inom 3-10
      arbetsdagar.
      </p>
      <p>
        Har du ett konto hos oss kan du också se dina beställningar under
        "Mina Ordrar".
      </p>
      <p>Om du inte har ett konto kan du skapa ett med samma mailadress du använde när du beställde dina varor och därefter se dina ordrar.
      </p>
      <p>Har du frågor om din order kan du skicka ett mail till
      oss på order.tradition@gmail.com.</p>
      <br />
      <img src="https://firebasestorage.googleapis.com/v0/b/eree-woodcraft.appspot.com/o/logo.png?alt=media&token=8efa0ff3-31c4-40a4-848d-d835020c0851"/>
      <p>www.tradition.nu</p>
    `;

    firestore
      .collection("mail")
      .add({
        to: email,
        message: {
          subject: "Orderbekräftelse",
          text: "Trädition",
          html: html,
        },
      })
      .then(() => console.log("Queued email for delivery!"));
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const cardElement = elements.getElement("card");
    setLoading(true);

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !email ||
      !phoneNumber ||
      !nameOnCard ||
      !accept
    ) {
      if (!accept) {
        setShowErrorMsg(true);
        setLoading(false);
      }
      return;
    }

    apiInstance
      .post("/payments/create", {
        amount: (total + shippingCost) * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  line1: shippingAddress.line1,
                  city: shippingAddress.city,
                  state: shippingAddress.state,
                  postalCode: shippingAddress.postal_code,
                  country: shippingAddress.country,
                  recipientName: recipientName,
                  email: email,
                  phoneNumber: phoneNumber,
                  shippingCost: shippingCost,
                  orderTotal: total + shippingCost,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;
                    setDocumentID(item.documentID);

                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                cartItems.forEach((item) => {
                  console.log("sold");
                  dispatch(
                    markAsSoldStart([item.documentID, item.productSold])
                  );
                });
                dispatch(saveOrderHistory(configOrder));
                if (currentUser) {
                  dispatch(getUserOrderHistory(currentUser.email));
                } else if (!currentUser) {
                  dispatch(getUserOrderHistory(email));
                }
                setTransactionCompleted(true);
                setLoading(false);
                //triggerEmail("okkUIIJKJN87986dZz");
              });
          });
      });
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <Subheader title={"KASSA"} />
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <div className="group">
            <div className="cart">
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <table border="0" cellSpacing="0" cellPadding="0">
                        <tbody className="items">
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
                </tbody>
              </table>
            </div>
            <div className="sum">
              <div className="amountRow">
                <h3>Subtotal:</h3>
                <h3>{total} SEK</h3>
              </div>
              <div className="amountRow">
                <h3>Leveranskostnad:</h3>
                <h3>{shippingCost} SEK</h3>
              </div>
              <div
                style={{
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
                  paddingTop: 20,
                }}
              >
                *Leveranskostnad beräknas utifrån föremålens vikt
              </h5>
            </div>
          </div>

          <h2>Leverans</h2>
          <div className="shippingBox">
            <h3 style={{ textAlign: "left" }}>PostNord</h3>
            <div className="delivery">
              <div className="postnord">
                <div className="radio">
                  <FormControl component="fieldset">
                    <FormControlLabel
                      value="radio"
                      control={<Radio />}
                      checked={true}
                      label="PostNord Ombud"
                    />
                  </FormControl>
                </div>
                <h4>Leveranstid ca 3-10 arbetsdagar</h4>
              </div>
              <h3>{shippingCost} SEK</h3>
            </div>
          </div>

          <h2>Leveransadress</h2>
          <FormInput
            required
            placeholder="För- och efternamn (obligatorisk)"
            name="recipientName"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
            type="text"
          />

          <FormInput
            required
            placeholder="Gatuadress (obligatorisk)"
            name="line1"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder=""
            name="line2"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="Stad (obligatorisk)"
            name="city"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="Län (obligatorisk)"
            name="state"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postadress (obligatorisk)"
            name="postal_code"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.postal_code}
            type="text"
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              defaultOptionLabel="Välj land (obligatorisk)"
              whitelist={["SE", "NO", "DK", "FI", "IS"]}
              priorityOptions={["SE"]}
              required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
          <FormInput
            required
            placeholder="Telefonnummer för SMS-avi (obligatorisk)"
            name="phone_number"
            handleChange={(evt) => setPhoneNumber(evt.target.value)}
            value={phoneNumber}
            type="text"
          />
        </div>

        <div className="group">
          <h2>Fakturadress</h2>
          <div className="sameDetails">
            <Checkbox
              checked={!checkboxSame}
              onChange={handleCheckboxChange}
              name="checked"
            />
            <p>Samma som leveransadress</p>
          </div>

          <FormInput
            required
            placeholder="Namn på betalkort (obligatorisk)"
            name="nameOnCard"
            handleChange={(evt) => setNameOnCard(evt.target.value)}
            value={nameOnCard}
            type="text"
          />

          <FormInput
            required
            placeholder="Gatuadress (obligatorisk)"
            name="line1"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder=" "
            name="line2"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="Stad (obligatorisk)"
            name="city"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="Län (obligatorisk)"
            name="state"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postadress (obligatorisk)"
            name="postal_code"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.postal_code}
            type="text"
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              defaultOptionLabel="Välj land (obligatorisk)"
              whitelist={["SE", "NO", "DK", "FI", "IS"]}
              priorityOptions={["SE"]}
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>

          {/* {currentUser ? null : ( */}
          <FormInput
            required
            placeholder="Emailadress för orderbekräftelse (obligatorisk)"
            name="email_adress"
            handleChange={(evt) => setEmail(evt.target.value)}
            value={email}
            type="email"
          />
          {/* )} */}
        </div>

        <div className="group">
          <h2 style={{ paddingBottom: 10, paddingTop: 10 }}>Betalning</h2>
          <CardElement options={configCardElement} />

          <h3 style={{ fontSize: 18, paddingTop: 20 }}>
            Att betala: {total + shippingCost} SEK
          </h3>

          {/* {currentUser ? null : ( */}
          <div className="checkbox">
            {showErrorMsg ? (
              <p style={{ color: globalStyles.tertiary }}>
                Du måste acceptera villkoren för att bli medlem.
              </p>
            ) : null}

            <div className="accept">
              <Checkbox checked={accept} onChange={() => setAccept(!accept)} />
              <p>
                Jag accepterar Träditions{" "}
                <span
                  className="link"
                  onClick={toggleModal}
                  style={{ color: globalStyles.primary }}
                >
                  användar- och köpvillkor
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        <Button type="submit">
          {loading ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            PAY
          )}
        </Button>
        <Modal {...configModal}>
          <div style={{ textAlign: "justify" }}>
            <TermsAndConditions />
            <Button onClick={() => toggleModal()}>Stäng</Button>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default PaymentDetails;
