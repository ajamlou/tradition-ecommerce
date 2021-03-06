import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailIcon from "@material-ui/icons/Mail";
import StripeLogo from "./../../assets/stripe.svg";
import Mastercard from "./../../assets/mastercard.svg";
import Visa from "./../../assets/visa.png";
import globalStyles from "./../../globalStyles.js";
import "./styles.scss";

const Footer = (props) => {
  return (
    <footer className="footer">
      <hr />
      <div className="wrap">
        <a href="https://instagram.com/ereewoodcraft">
          <InstagramIcon
            style={{
              height: 35,
              width: "auto",
              color: globalStyles.primary,
            }}
          />
        </a>
        <a href="mailto:order.tradition@gmail.com">
          <MailIcon
            style={{
              height: 35,
              width: "auto",
              color: globalStyles.primary,
            }}
          />
        </a>
      </div>

      <div className="payments">
        <div className="stripe">
          <a href="https://stripe.com/en-gb-se">
            <img src={StripeLogo} alt="Stripe LOGO" />
          </a>
          <a>
            <img src={Mastercard} alt="mastercard" />
          </a>
          <a>
            <img src={Visa} alt="visa" />
          </a>
        </div>
        <p>
          Innehållet på denna webbplats är upphovsrättsskyddat och tillhör
          Trädition. Vi använder cookies för att förbättra användarupplevelsen
          och om du vill veta mer om våra cookies och vår integritetspolicy
          klicka{" "}
          <Link style={{ fontWeight: 600 }} to="/cookies">
            här
          </Link>
          .
        </p>
        <p>© Trädition 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
