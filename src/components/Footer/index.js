import React from "react";
import { Link } from "react-router-dom";
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
                paddingLeft: 30,
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
      </div>

      <div className="payments">
        <div className="stripe">
          <p style={{ fontSize: 16 }}>Säkra kortbetalningar med </p>
          <a href="https://stripe.com/en-gb-se">
            <img src={StripeLogo} alt="Stripe LOGO" />
          </a>
        </div>
        <p>
          Innehållet på denna webbplats är upphovsrättsskyddat och tillhör
          Trädition. Vi använder cookies för att förbättra användarupplevelsen
          och genom att använda hemsidan godkänner du detta. Vill du veta mer
          våra cookies och vår integritetspolicy klicka{" "}
          <Link style={{ fontWeight: 600 }} to="/cookies">
            här
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
