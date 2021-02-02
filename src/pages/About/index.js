import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailIcon from "@material-ui/icons/Mail";
import globalStyles from "./../../globalStyles.js";
import "./styles.scss";
import Subheader from "../../components/Subheader/index.js";

const About = (props) => {
  return (
    <div className="about">
      <Subheader title={"OM OSS"} />
      <h3 className="desc">
        Trädition erbjuder unika och handgjorda föremål helt i trä. Våra
        produkter är tillverkade med hjälp av traditionella slöjdtekniker där
        processen har hållbarhet, design och funktionalitet i fokus.
      </h3>

      <div className="contact">
        <h1>Kontakt</h1>
        <div>
          <a href="https://instagram.com/ereewoodcraft">
            <InstagramIcon
              style={{
                height: 35,
                width: "auto",
                color: globalStyles.secondary,
              }}
            />
            <p>@tradition</p>
          </a>
        </div>
        <div>
          <a href="mailto:info@ereewoodfract.com">
            <MailIcon
              style={{
                height: 35,
                width: "auto",
                color: globalStyles.secondary,
              }}
            />
            <p>info@tradition.nu</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
