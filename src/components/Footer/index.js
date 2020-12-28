import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailIcon from "@material-ui/icons/Mail";
import StripeLogo from "./../../assets/stripe.png";
import globalStyles from "./../../globalStyles.js";
import "./styles.scss";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="wrap">
        <h3>© Trädition 2021</h3>
        <div>
          <a href="https://instagram.com/ereewoodcraft">
            <InstagramIcon
              style={{
                height: 35,
                width: "auto",
                marginRight: 15,
                color: globalStyles.secondary,
              }}
            />
          </a>
          <a href="mailto:info@ereewoodfract.com">
            <MailIcon
              style={{
                height: 35,
                width: "auto",
                color: globalStyles.secondary,
              }}
            />
          </a>
        </div>
        <div className="payments">
          <p>Vi utför säkra kortbetalningar tillsammans med Stripe.</p>
          <a href="https://stripe.com/en-gb-se">
            <img src={StripeLogo} alt="Stripe LOGO" />
          </a>
        </div>

        <p>
          Innehållet på denna webbplats är upphovsrättsskyddat och tillhör
          Trädition.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
