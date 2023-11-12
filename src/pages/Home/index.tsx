import { useSelector } from "react-redux";
import HomeAfterLogin from "./HomeAfterLogin";
import { checkLoginSelector } from "~/redux/selector";
import HomeBeforeLogin from "./HomeBeforeLogin";

function Home() {
  const auth = useSelector(checkLoginSelector);
  return <div>{auth ? <HomeAfterLogin /> : <HomeBeforeLogin />}</div>;
}

export default Home;
