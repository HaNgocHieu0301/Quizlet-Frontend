import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, FormInstance, Input, Modal, message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { blogApi } from "~/api/Blog";
import { BlogType } from "~/type";

function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogForm] = Form.useForm();
  const [value, setValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
      ["bold", "italic", "underline", "strike"], // Bold, italic, underline, and strike
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Subscript and superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indent and outdent
      [{ direction: "rtl" }], // Text direction
      [{ size: ["small", false, "large", "huge"] }], // Font size
      [{ color: [] }, { background: [] }], // Text color and background color
      [{ font: [] }], // Font family
      [{ align: [] }], // Text alignment
      ["link", "image", "video"], // Links, images, and videos
      ["clean"], // Remove formatting
    ],
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function onFinish(value: BlogType) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const id = jwtDecode(token).sub || "";
      value.userId = id;
      value.createAt = new Date();
      value.modifiedAt = new Date();
      value.blogId = 0;
      axios
        .post(blogApi, value, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setLoading(false);
          success();
          handleCancel();
          blogForm.resetFields();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    console.log(value);
  }

  function isValidateInfo(form: FormInstance) {
    for (const key in form.getFieldsValue()) {
      if (!form.getFieldsValue()[key]) {
        return false;
      }
    }
    return !form.getFieldsError().filter(({ errors }) => errors.length).length;
  }

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Created new blog successfully",
      duration: 5,
    });
  };

  return (
    <>
      {contextHolder}
      <p
        onClick={showModal}
        className="text-start px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-300"
      >
        <FontAwesomeIcon className="pr-2" icon={faPaste} />
        Blog
      </p>
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1000}
        destroyOnClose
        centered
      >
        <div className="p-8">
          <h1 className="mb-4">Create new blog</h1>
          <Form
            layout="vertical"
            autoComplete="off"
            autoCapitalize="off"
            onFinish={onFinish}
            form={blogForm}
          >
            <Form.Item
              hasFeedback
              label="Title"
              name="title"
              validateFirst
              rules={[
                {
                  required: true,
                },
              ]}
              className="font-semibold"
            >
              <Input placeholder="Your title" size="large" />
            </Form.Item>

            <Form.Item
              hasFeedback
              label="Description"
              name="description"
              validateFirst
              rules={[
                {
                  required: true,
                },
              ]}
              className="font-semibold"
            >
              <ReactQuill
                placeholder="Description"
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
              />
            </Form.Item>

            <Form.Item shouldUpdate className="mt-2 mb-0">
              {() => (
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!isValidateInfo(blogForm)}
                >
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default Blog;
