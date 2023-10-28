import HeaderLink from "~/components/HeaderLink";
import { Input, Button, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";

function Header() {
  function handleSearch() {
    console.log("searching...");
  }

  return (
    <header
      className="sticky items-center justify-center flex h-[64px] gap-4 px-4"
      style={{ borderBottom: "1px solid #ccc" }}
    >
      <h2>Quizlet</h2>
      <HeaderLink title="Home"></HeaderLink>
      <HeaderLink title="Your library" icon></HeaderLink>
      <Input
        allowClear
        className="rounded-3xl w-[700px] h-[36px]"
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
      <Avatar size="large" icon={<FontAwesomeIcon icon={faUser} />}></Avatar>
      <Button className="bg-amber-400 w-[90px]" size="large">
        Update
      </Button>
    </header>
  );
}

export default Header;
