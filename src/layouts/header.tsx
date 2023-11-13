import HeaderLink from "~/components/HeaderLink";
import { Input, Button, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFolder,
  faGear,
  faMagnifyingGlass,
  faPaste,
  faPlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import clsx from "clsx";
// import { useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

import style from "./style.module.css";
import { checkLoginSelector } from "~/redux/selector";
import Auth from "~/components/Auth/Auth";
import { useEffect } from "react";
import AuthSlice from "~/components/Auth/AuthSlice";

function Header() {
  const dispatch = useDispatch();
  // const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        jwtDecode(token);
        dispatch(AuthSlice.actions.login());
      } catch (error) {
        handlerLogout();
      }
    }
  });

  function handleSearch() {
    console.log("searching...");
  }

  function handlerLogout() {
    dispatch(AuthSlice.actions.logout());
    localStorage.removeItem("token");
    // signOut();
    navigate("/");
  }

  const auth = useSelector(checkLoginSelector);

  return (
    <header
      className="sticky top-0 z-10 bg-white items-center justify-center flex h-[64px] gap-4 px-4"
      style={{ borderBottom: "1px solid #ccc" }}
    >
      <h2 className="text-blue-600 cursor-pointer">Quizlet</h2>
      <HeaderLink title="Home" url="/"></HeaderLink>
      <HeaderLink title="Your library" icon showModal></HeaderLink>
      <Input
        allowClear
        className="rounded-3xl flex-1 h-[36px]"
        onChange={debounce(handleSearch, 500)}
        prefix={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}
        placeholder="Text sets, books, questions"
      ></Input>
      <div className={clsx(style.addBtn, "relative")}>
        <Button
          type="primary"
          shape="circle"
          icon={<FontAwesomeIcon size="lg" icon={faPlus} />}
          size="large"
        ></Button>
        <div className={clsx(style.addModal)}>
          <p className="text-start px-4 text-gray-600 py-2 cursor-pointer hover:bg-gray-300">
            <FontAwesomeIcon className="pr-2" icon={faFileCirclePlus} />
            <a className="no-underline text-gray-600" href="/create-set">
              Study sets
            </a>
          </p>
          <p className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300">
            <FontAwesomeIcon className="pr-2" icon={faFolder} />
            Folder
          </p>
          <p className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300">
            <FontAwesomeIcon className="pr-2" icon={faPaste} />
            Study sets
          </p>
        </div>
      </div>

      {auth && (
        <>
          <div className={clsx(style.accountBtn, "relative")}>
            <Avatar
              size="large"
              className="cursor-pointer"
              icon={<FontAwesomeIcon icon={faUser} />}
            ></Avatar>
            <div className={clsx(style.accountModal)}>
              <p className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300">
                <FontAwesomeIcon className="pr-2" icon={faUser} />
                <Link className="no-underline text-gray-600" to="/Profile">
                  Profile
                </Link>
              </p>
              <p className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300">
                <FontAwesomeIcon className="pr-2" icon={faGear} />
                Setting
              </p>
              <p
                className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300"
                onClick={handlerLogout}
              >
                <FontAwesomeIcon className="pr-2" icon={faRightFromBracket} />
                Log out
              </p>
            </div>
          </div>
          <Button className="bg-amber-400 w-[90px]" size="large">
            Update
          </Button>
        </>
      )}

      {!auth && (
        <GoogleOAuthProvider clientId="154388147697-unlnaumepc2n6c3k7u1vc0g9fa82pao0.apps.googleusercontent.com">
          <FacebookProvider appId="162645856871115">
            <Auth></Auth>
          </FacebookProvider>
        </GoogleOAuthProvider>
      )}
    </header>
  );
}

export default Header;
