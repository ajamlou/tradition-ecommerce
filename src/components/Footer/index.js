import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailIcon from "@material-ui/icons/Mail";
import "./styles.scss";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="wrap">
        © EREE Woodcraft 2021
        <div style={{ paddingTop: 15 }}>
          <a href="https://instagram.com/ereewoodcraft">
            <InstagramIcon
              style={{ height: 35, width: "auto", color: "black" }}
            />
            <a href="mailto:info@ereewoodfract.com">
              <MailIcon style={{ height: 35, width: "auto", color: "black" }} />
            </a>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
