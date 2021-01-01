import React from "react";
import globalStyles from "./../../globalStyles.js";
import "./styles.scss";
import Subheader from "../../components/Subheader/index.js";

const Cookies = (props) => {
  return (
    <div className="cookiesWrapper">
      <Subheader title={"INTEGRITETSPOLICY & COOKIES"} />
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
          Hemsidan använder analysverktyget Google Analytics för att få en bild
          av hur besökare använder webbplatsen. Syftet är att kunna förbättra
          innehåll, navigation och struktur på webbplatsen. Analysverktyget
          använder kakor och den information som genereras av dessa genom din
          användning av webbplatsen (inklusive din IP-adress) kommer att
          vidarebefordras till leverantören Google och lagras av dem på servrar
          i USA respektive EU. Google kan också överföra denna information till
          tredje parter om det krävs enligt lag eller i de fall en tredje part
          behandlar informationen för Googles räkning. Google kommer inte att
          koppla samman IP-adresser med andra data som Google innehar.
        </p>
        <p>
          Här hittar du mer information om vilken information våra analysverktyg
          sparar:
          <ul>
            <li>
              <a href="https://policies.google.com/technologies/partner-sites">
                Google Analytics
              </a>
            </li>
          </ul>
        </p>
        <p>
          Genom att använda Hemsidan utan att avböja kakor från tredje part,
          samtycker du till att Google behandlar dina uppgifter på det sätt och
          för de syften som beskrivs ovan. Om du inte vill att dina besök på
          Hemsidan ska finnas med i statistiken i Google Analytics finns{" "}
          <a href="http://tools.google.com/dlpage/gaoptout">
            ett tillägg som du kan installera i din webbläsare
          </a>
          .
        </p>
        <p>
          Hantering av hur lokal information får lagras och radering och
          blockering av cookies kan du styra över själv genom att ändra på
          inställningarna i din webbläsare. Avaktivering av en cookie eller av
          en cookie-kategori raderar inte en redan befintlig cookie, detta måste
          du göra själv genom din webbläsare.
        </p>
        <p>
          Här hittar du information om hur du hanterar kakor i din webbläsare:
        </p>
        <ul style={{ color: globalStyles.primary }}>
          <li>
            <a href="https://support.microsoft.com/sv-se/topic/ta-bort-och-hantera-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
              Internet Explorer
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">
              Firefox
            </a>
          </li>
          <li>
            <a href="https://support.google.com/chrome/answer/95647?hl=sv">
              Chrome
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/kb/PH21411?viewlocale=sv_SE&locale=sv_SE">
              Safari
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/sv-se/HT201265">Safari på iOS</a>
          </li>
          <li>
            <a href="Opera">Opera</a>
          </li>
        </ul>
        <h2>Informationshantering</h2>
        <p>
          Den information som registreras, sparas och används av Hemsidan
          behandlas endast av ansvariga för hemsidan. Informationen kommer inte
          att säljas eller delas med till en tredje part utan explicit uttryckt
          samtycke. Hemsidan är ansvarig för behandling av samtliga
          personuppgifter, och de skyddas av lämpliga strukturella och tekniska
          processer.
        </p>
        <h2>Inbäddat innehåll från andra webbplatser</h2>
        <p>
          Hemsidan kan innehålla artiklar med inbäddat innehåll (exempelvis
          videoklipp, bilder, artiklar o.s.v.). Inbäddat innehåll från andra
          webbplatser hanterar besökaren som om den har besökt den andra
          webbplatsen. Dessa webbplatser kan samla in uppgifter om dig, använda
          cookie-filer, bädda in ytterligare spårning från tredje part och
          övervaka din interaktion med sagda inbäddade innehåll, inklusive
          spårning av din interaktion med detta inbäddade innehåll om du har ett
          konto och är inloggad på webbplatsen i fråga.
        </p>
        <h2>Ditt val</h2>
        <p>
          Du har rätt att veta och bestämma hur dina personuppgifter används. Du
          har rätt till att veta vilka av dina personuppgifter Hemsidan
          behandlar. Du har även rätt att ångra ditt samtycke eller protestera
          användningen av dina personuppgifter. Om du vill ångra ditt samtycke
          eller veta vilka personuppgifter Hemsidan behandlar samt om du har
          några frågor gällande vår integritetspolicy, kontakta gärna oss på{" "}
          <a href="mailto:info@tradition.nu">info@tradition.nu</a>. Du behöver
          inte ladda upp några personuppgifter, men om du inte väljer att göra
          det går inte alla funktioner på Hemsidan att användas.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
