import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Item from "./../Checkout/Item";
import Modal from "./../../components/Modal";
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
  const [checkboxSame, setCheckboxSame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [documentID, setDocumentID] = useState("");
  const [hideModal, setHideModal] = useState(true);

  const shippingCost = 63;

  useEffect(() => {
    if (itemCount < 1) {
      history.push(`/orderConfirmed/${orderHistory[0].documentID}`);
      setLoading(false);
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
      !nameOnCard ||
      !accept
    ) {
      if (!accept) {
        toggleModal();
        setLoading(false);
      }
      return;
    }

    // if (currentUser) {
    //   setEmail(currentUser.email);
    //   console.log(email);
    // }

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
                  email: email,
                  orderTotal: total,
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
                cartItems.forEach((item) =>
                  dispatch(markAsSoldStart([item.documentID, item.productSold]))
                );
                dispatch(saveOrderHistory(configOrder));
                if (currentUser) {
                  dispatch(getUserOrderHistory(currentUser.email));
                } else if (!currentUser) {
                  dispatch(getUserOrderHistory(email));
                }

                setLoading(false);
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
      <Modal {...configModal}>
        <div>
          <p style={{ textAlign: "justify" }}>
            Du måste acceptera hur Trädition hanterar dina perosnuppgifter för
            att kunna handla.
          </p>
          <Button onClick={() => toggleModal()}>Stäng</Button>
        </div>
      </Modal>
      <form onSubmit={handleFormSubmit}>
        <div className="group">
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
            placeholder=" "
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
              priorityOptions={["SWE"]}
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
        </div>

        <div className="group">
          <h2>Fakturadress</h2>
          <div className="checkbox">
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
        <div className="cart">
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="checkoutHeader" border="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th>Produkt</th>
                        <th>Beskrivning</th>
                        <th>Antal</th>
                        <th>Pris</th>
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
            </tbody>
          </table>
        </div>

        <div className="group">
          <h2>Betalningsinformation</h2>
          <CardElement options={configCardElement} />
          <h2 className="sum">Summa inkl. frakt: {total + shippingCost}:-</h2>
        </div>

        <div className="checkbox">
          <Checkbox checked={accept} onChange={() => setAccept(!accept)} />
          <p>
            Jag accepterar{" "}
            <Link to="/cookies" style={{ color: globalStyles.primary }}>
              Träditions hantering av mina personuppgifter
            </Link>
            .
          </p>
        </div>

        <Button type="submit">
          {loading ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            PAY
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
