import { replaceAllianceCode, checkLength } from "../utils/helpers";

export default function AirlineCard({
  site,
  code,
  alliance,
  phone,
  name,
  logoURL
}) {
  // Experimenting with regex and string manipulation to have a shorter URL
  // 1. removing http or https
  // 2. removing www.
  // 3. removing last "/" if exists
  let shortURL = site.replace(/^https?:\/\//, "");
  shortURL = shortURL.replace(/^www./, "");
  if (shortURL.charAt(shortURL.length - 1) === "/") {
    shortURL = shortURL.substr(0, shortURL.length - 1);
  }

  return (
    <article className="airline-card">
      <div className="airline-card__content">
        <img src={`https://www.kayak.com${logoURL}`} alt="airline logo" />
        <div className="airline-card__info">
          <h3>
            {`${name} `}
            {/* Some of the airline code/link are too long (EX: Transportes del Norte), 
            if code is too long only chars fixed amount of char.
            Full code available on hover with the title property 
            */}
            <span className="show-card-code" title={code}>
              ({checkLength(code, 18)})
            </span>
          </h3>
          <div className="airline-card__details">
            <p>{alliance !== "none" ? replaceAllianceCode(alliance) : null}</p>
            {/* Checking for length for num validity - Some airlines have 0 as phone number (ex: BB Airways)*/}
            <p>{phone.length > 1 && phone}</p>
            <a href={site} title={site}>
              {checkLength(shortURL, 32)}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
