import HeaderLink from "~/components/HeaderLink";
import { Input, Button, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";

import Auth from "~/components/Auth/Auth";

function Header() {
  function handleSearch() {
    console.log("searching...");
  }

  return (
    <header
      className="sticky items-center justify-center flex h-[64px] gap-4 px-4"
      style={{ borderBottom: "1px solid #ccc" }}
    >
      <h2 className="text-blue-600 cursor-pointer">Quizlet</h2>
      <HeaderLink title="Home"></HeaderLink>
      <HeaderLink title="Your library" icon></HeaderLink>
      <Input
        allowClear
        className="rounded-3xl flex-1 h-[36px]"
        onChange={debounce(handleSearch, 500)}
        prefix={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}
        placeholder="Text sets, books, questions"
      ></Input>
      <Button
        type="primary"
        shape="circle"
        icon={<FontAwesomeIcon size="lg" icon={faPlus} />}
        size="large"
      ></Button>
      {/* <Avatar size="large" icon={<FontAwesomeIcon icon={faUser} />}></Avatar> */}
      <GoogleOAuthProvider clientId="154388147697-unlnaumepc2n6c3k7u1vc0g9fa82pao0.apps.googleusercontent.com">
        <FacebookProvider appId="162645856871115">
          <Auth></Auth>
        </FacebookProvider>
      </GoogleOAuthProvider>
      {/* <Button className="bg-amber-400 w-[90px]" size="large">
        Update
      </Button> */}
    </header>
  );
}

export default Header;
