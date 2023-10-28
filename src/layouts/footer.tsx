import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTiktok,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div
      className="flex justify-between p-8 items-center"
      style={{ borderTop: "1px solid #ccc" }}
    >
      <div>
        <div>
          <FontAwesomeIcon cursor="pointer" className="mx-2" icon={faTiktok} />
          <FontAwesomeIcon cursor="pointer" className="mx-2" icon={faTwitter} />
          <FontAwesomeIcon
            cursor="pointer"
            className="mx-2"
            icon={faFacebook}
          />
          <FontAwesomeIcon
            cursor="pointer"
            className="mx-2"
            icon={faInstagram}
          />
          <FontAwesomeIcon cursor="pointer" className="mx-2" icon={faYoutube} />
        </div>
        <p className="mt-2">© 2023 Quizlet, Inc.</p>
      </div>
      <div>
        <img
          src="https://quizlet.com/cdn-cgi/image/f=auto,fit=cover,h=70,onerror=redirect,w=140/https://assets.quizlet.com/_next/static/media/coppa-seal.0efe00c1.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Footer;
