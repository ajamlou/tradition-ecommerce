import React from "react";
import globalStyles from "./../../globalStyles.js";
import "./styles.scss";
import Subheader from "../../components/Subheader/index.js";

const Cookies = (props) => {
  return (
    <div className="cookiesWrapper">
      <Subheader title={"COOKIES"} />
      <div className="information">
        <h1>Information om cookies</h1>
        <p>
          Den här webbplatsen använder cookies för att den ska fungera normalt
          och för att kunna förbättra upplevelsen för dig som användare. Både så
          kallade sessionscookies och varaktiga cookies används. Det kan finnas
          andra cookies lagrade på den här domänen, som inte används i det här
          forumet.
        </p>

        <h2>Vad är cookies?</h2>
        <p>
          Cookies är små textfiler som innehåller data. De lagras på besökarens
          dator och skapas av de webbplatser som besökts. Syftet är att ge
          besökare tillgång till olika funktioner. Det finns två typer av
          cookies:
        </p>
        <ul style={{ color: globalStyles.secondary }}>
          <li>
            En sessionscookie lagras tillfälligt tiden en besökare är inne på en
            webbplats. Sessionscookien försvinner när besökaren stänger
            webbläsaren.
          </li>
          <li>
            En varaktig cookie finns kvar på besökarens dator tills den tas
            bort.
          </li>
        </ul>
        <p>
          Om du inte accepterar att cookies används kan du göra inställningar i
          din webbläsare så att du inte tar emot några cookies. Det kan göra att
          vissa delar av webbplatsen inte fungerar korrekt för dig.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
