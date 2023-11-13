import HeaderLink from "~/components/HeaderLink";
import { Input, Button, Avatar, Modal, Flex, Form } from "antd";
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
import axios from "axios";
import { getFlashCards } from "~/api/FlashCard";
import { useState } from "react";
import { Lesson } from "~/type";
import IconSvg from "~/components/IconSvg";
import Icons from "~/assets/icons";
import { Folder } from "~/types/Folder";
import { postApi } from "~/common";

function Header() {
  const dispatch = useDispatch();
  // const signOut = useSignOut();
  const navigate = useNavigate();
  const [serachList, setSearchList] = useState<Lesson[]>([]);
  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] =
    useState<boolean>(false);
  const [form] = Form.useForm();

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

  function handleSearch(e: any) {
    if (e.target.value) {
      axios
        .get(getFlashCards + `?$filter=contains(title, '${e.target.value}')`)
        .then((res) => {
          setSearchList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchList([]);
    }
  }

  function handlerLogout() {
    dispatch(AuthSlice.actions.logout());
    localStorage.removeItem("token");
    // signOut();
    navigate("/");
  }
  const onCreateNewFolder = (values: any) => {
    console.log(values);
    const dataFolder: Folder = {
      folderId: 0,
      title: values.title,
      description: values.description,
      userId: jwtDecode(localStorage.getItem("token") as string).sub as string,
      modifiedAt: new Date(),
      createdAt: new Date(),
    };
    const json = JSON.stringify(dataFolder);
    postApi("http://localhost:5025/api/folder", json).then((res) => {
      console.log(res);
      window.location.href = "/Folder/" + res;
    });
  };
  const handleCloseModal = () => {
    // Reset các trường của form
    form.resetFields();

    // Sau đó mới đóng modal
    setIsOpenCreateFolderModal(false);
  };
  const auth = useSelector(checkLoginSelector);

  return (
    <header
      className="sticky top-0 z-10 bg-white items-center justify-center flex h-[64px] gap-4 px-4"
      style={{ borderBottom: "1px solid #ccc" }}
    >
      <h2 className="text-blue-600 cursor-pointer">Quizlet</h2>
      <HeaderLink title="Home" url="/"></HeaderLink>
      <HeaderLink title="Your library" icon showModal></HeaderLink>
      <div className="flex-1 relative">
        <Input
          allowClear
          className="rounded-3xl h-[36px]"
          onChange={debounce(handleSearch, 500)}
          prefix={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}
          placeholder="Text sets, books, questions"
        ></Input>
        <div className="max-h-40 mt-1 w-full bg-white overflow-auto rounded-lg shadow-md absolute">
          {serachList.map((flashcard, index) => (
            <p
              key={index}
              className="text-start w-full px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300"
            >
              <FontAwesomeIcon className="pr-2" icon={faMagnifyingGlass} />
              <Link
                className="pr-96 no-underline text-gray-600"
                to={`/Lesson/${flashcard.lessonId}`}
              >
                {flashcard.title}
              </Link>
            </p>
          ))}
        </div>
      </div>

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
          <p
            className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300"
            onClick={() => setIsOpenCreateFolderModal(true)}
          >
            <FontAwesomeIcon className="pr-2" icon={faFolder} />
            Folder
          </p>
          {/* <p className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300">
            <FontAwesomeIcon className="pr-2" icon={faPaste} />
            Study sets
          </p> */}
        </div>
      </div>

      <Modal
        open={isOpenCreateFolderModal}
        closeIcon={null}
        footer={null}
        title={
          <Flex
            justify="space-between"
            align="center"
            className="h-[75px] px-6"
          >
            <h1 className=" text-3xl font-bold">Tạo thư mục mới</h1>
            <Button
              shape="circle"
              type="text"
              icon={<IconSvg fill="#000000" iconName="close-x" />}
              onClick={handleCloseModal}
            />
          </Flex>
        }
      >
        <Form
          form={form}
          className="px-6"
          name="createNewFolderForm"
          onFinish={onCreateNewFolder}
        >
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Tên thư mục không được để trống!" },
            ]}
          >
            <Input
              placeholder="Tên thư mục*"
              className="rounded-3xl h-[36px]"
            />
          </Form.Item>
          <Form.Item name="description">
            <Input
              placeholder="Nhập mô tả (tùy chọn)"
              className="rounded-3xl h-[36px]"
            />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              className="w-[90px]"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
      <Icons />
    </header>
  );
}

export default Header;
