import React, { useEffect, useState } from "react";
import { Flex, Button, Card, Col, Row, Modal, ConfigProvider } from "antd";
import IconSvg from "~/components/IconSvg";
import axios from "axios";
import Icons from "~/assets/icons";
import { useParams } from "react-router-dom";
import { getApi, putApi } from "~/common";
import { jwtDecode } from "jwt-decode";
import { LessonWithQuestion } from "~/types/LessonWithQuestion";

const FolderComponent = () => {
  const { folderId } = useParams();
  console.log(folderId);
  const folderIdNum: number = parseInt(folderId as string);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [folder, setFolder] = useState<any>({});
  const [allLessons, setAllLessons] = useState<LessonWithQuestion[]>([]);
  const [lessonsInFolder, setLessonsInFolder] = useState<LessonWithQuestion[]>(
    []
  );
  const changeToCreateNewSet = () => {
    window.location.href = "/create-set/" + folderIdNum;
  };
  const addLessonToFolder = (lessonId: number) => {
    const existedInFolder = lessonsInFolder.filter((lesson) => {
      return lesson.lessonId === lessonId;
    });
    if (existedInFolder.length > 0) {
      return;
    }
    const url = `http://localhost:5219/api/Lessons/UpdateLesson`;
    const data = allLessons.filter((lesson) => lesson.lessonId === lessonId);
    data[0].folderId = folderIdNum;
    const dataJson = JSON.stringify(data[0]);
    putApi(url, dataJson).then((res) => {
      console.log(res);
      // window.location.reload();
      setLessonsInFolder([...lessonsInFolder, data[0]]);
    });
  };
  const removeLessonToFolder = (lessonId: number) => {
    console.log(lessonId);
    console.log(lessonsInFolder);
    console.log(lessonsInFolder.length);
    const existedInFolder = lessonsInFolder.filter((lesson) => {
      return lesson.lessonId === lessonId;
    });
    if (existedInFolder.length === 0) {
      return;
    }
    const url = `http://localhost:5219/api/Lessons/UpdateLesson`;
    existedInFolder[0].folderId = 0;
    const dataJson = JSON.stringify(existedInFolder[0]);
    putApi(url, dataJson).then((res) => {
      const tmp = lessonsInFolder.filter(
        (lesson) => lesson.lessonId !== lessonId
      );
      console.log(tmp);
      setLessonsInFolder(tmp);
    });
  };
  const removeFolder = () => {
    const url = `http://localhost:5219/api/Folders/${folderIdNum}`;
    axios.delete(url).then((res) => {
      console.log(res);
      window.location.href = "/";
    });
  };
  const changeToLesson = (lessonId: number) => {
    window.location.href = "/lesson/" + lessonId;
  };
  useEffect(() => {
    const token: string = localStorage.getItem("token") as string;
    const userId = jwtDecode(token).sub;
    console.log(userId);
    const url = `http://localhost:5219/api/Lessons?$filter=UserId eq '${userId}'`;
    console.log(url);
    getApi(url).then((res) => {
      console.log(res);
      setAllLessons(res);
      const lessonsInFolder: LessonWithQuestion[] = res.filter(
        (lesson: LessonWithQuestion) => {
          return lesson.folderId === folderIdNum;
        }
      );
      setLessonsInFolder(lessonsInFolder);
    });
  }, []);
  return (
    <>
      <div className="bg-white">
        {/* Header Infor */}
        <div className="bg-white">
          <Flex vertical justify="flex-start" className="p-8">
            <Flex justify="space-between">
              <div>
                <Flex gap={"large"}>
                  <span>2 hoc phan</span>
                  <span>
                    {`tạo bởi ${
                      jwtDecode(localStorage.getItem("token") as string).sub
                    }`}
                  </span>
                </Flex>
              </div>
              <Flex align="center" gap={8}>
                <Button
                  size="large"
                  shape="circle"
                  icon={<IconSvg iconName="plus" />}
                  onClick={() => setIsAddModalVisible(true)}
                />
                <Button
                  size="large"
                  shape="circle"
                  icon={<IconSvg iconName="garbage" />}
                  onClick={removeFolder}
                />
              </Flex>
            </Flex>
            <Flex align="center" gap={"small"}>
              <IconSvg width={50} height={50} iconName="folder" />
              <h1>MLN122</h1>
            </Flex>
            <Flex>
              <p>Mon hoc MLN122</p>
            </Flex>
          </Flex>
        </div>
        {/* Content */}
        {lessonsInFolder.length === 0 && (
          <Flex
            justify="center"
            align="center"
            className="bg-white p-8 h-[60vh]"
          >
            <Flex
              id="noLesson"
              vertical
              align="center"
              className="w-1/2 text-center"
              gap={12}
            >
              <h1>Thư mục này chưa có học phần</h1>
              <span>Sắp xếp học phần cho bạn vè học sinh của bạn</span>
              <Button
                size="large"
                type="primary"
                onClick={() => setIsAddModalVisible(true)}
              >
                Thêm học phần
              </Button>
            </Flex>
          </Flex>
        )}

        <div className="mx-6">
          <div className="grid grid-flow-row-dense grid-cols-3 gap-4">
            {lessonsInFolder.map((lesson: LessonWithQuestion) => (
              <div className="col-span-1 border p-4">
                <Card
                  title={
                    <Flex vertical justify="center" align="flex-start">
                      <p className="text-lg">{lesson.title}</p>
                      <p>{lesson.questions.length} thuat ngu</p>
                    </Flex>
                  }
                  bordered={true}
                  className="border-2 shadow-md"
                  onClick={() => changeToLesson(lesson.lessonId)}
                >
                  <Flex justify="space-between" align="center">
                    <Flex gap={12}>
                      <span>Xok23</span>
                    </Flex>
                    <Button
                      type="text"
                      shape="circle"
                      size="small"
                      icon={
                        <IconSvg iconName="garbage" width={20} height={20} />
                      }
                      onClick={() => removeLessonToFolder(lesson.lessonId)}
                    />
                  </Flex>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title={<TitleModal closeHandle={() => setIsAddModalVisible(false)} />}
        width={500}
        centered
        closable={true}
        closeIcon={null}
        open={isAddModalVisible}
        footer={null}
      >
        <Flex className="p-6" vertical gap={12}>
          <ConfigProvider
            theme={{
              token: {
                controlHeightLG: 60,
              },
              components: {
                Button: {
                  paddingInlineLG: "80",
                  defaultBg: "#fff",
                  defaultColor: "#000",
                },
              },
            }}
          >
            <Button
              size="large"
              className="w-full h-[80px]"
              onClick={changeToCreateNewSet}
            >
              <p className=" border-b-2 border-black">+ Tao hoc phan moi</p>
            </Button>
          </ConfigProvider>
          {allLessons.map((lesson) => (
            <div className="border border-solid border-black">
              <Flex
                justify="space-between"
                align="center"
                className="py-3 px-5"
              >
                <span className="text-xl font-bold">{lesson.title}</span>
                {lesson.folderId === folderIdNum ? (
                  <Button
                    type="dashed"
                    size="large"
                    icon={<IconSvg iconName="minus" />}
                    onClick={() => removeLessonToFolder(lesson.lessonId)}
                  />
                ) : (
                  <Button
                    type="dashed"
                    size="large"
                    icon={<IconSvg iconName="plus" />}
                    onClick={() => addLessonToFolder(lesson.lessonId)}
                  />
                )}
              </Flex>
            </div>
          ))}
        </Flex>
      </Modal>
      <Icons />
    </>
  );
};
const TitleModal = ({ closeHandle }: { closeHandle: Function }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      className="h-[75px] bg-blue-700 px-6"
    >
      <h1 className="text-white text-3xl font-bold">Them hoc phan</h1>
      <Button
        shape="circle"
        type="text"
        icon={<IconSvg fill="#ffffff" iconName="close-x" />}
        onClick={() => closeHandle()}
      />
    </Flex>
  );
};
export default FolderComponent;
