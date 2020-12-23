import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailIcon from "@material-ui/icons/Mail";
import "./styles.scss";

const About = (props) => {
  return (
    <div className="about">
      <h1>Om oss</h1>
      <h2 className="desc">
        EREE Woodcraft erbjuder unika och handgjorda föremål helt i trä. Våra
        produkter är tillverkade med hjälp av traditionella slöjdtekniker där
        processen har hållbarhet, design och funktionalitet i fokus.
      </h2>

      <div className="contact">
        <h1>Kontakt</h1>
        <div>
          <a href="https://instagram.com">
            <InstagramIcon style={{ height: 35, width: "auto" }} />
            <p>@ereewoodcraft</p>
          </a>
        </div>
        <div>
          <a href="mailto:info@ereewoodfract.com">
            <MailIcon style={{ height: 35, width: "auto" }} />
            <p>info@ereewodcraft.com</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
