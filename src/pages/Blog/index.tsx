import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlogType } from "~/type";
import axios from "axios";
import { blogApi } from "~/api/Blog";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, FormInstance, Input, Modal, message } from "antd";
import { jwtDecode } from "jwt-decode";
import ReactQuill from "react-quill";

function BlogPage() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogType>(Object);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogForm] = Form.useForm();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    axios
      .get(blogApi + `?$filter=blogId eq ${blogId}`)
      .then((res) => {
        setBlog(res.data[0]);
        setValue(res.data[0].description);
        setTitle(res.data[0].title);
      })
      .catch((err) => {
        console.log(err);
      });
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
  function onFinish(values: BlogType) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const id = jwtDecode(token).sub || "";
      values.userId = id;
      values.createAt = blog.createAt;
      values.modifiedAt = new Date();
      values.blogId = parseInt(blogId || "");
      values.title = title;
      values.description = value;
      axios
        .put(blogApi, values, {
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
          getBlog();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }

  function isValidateInfo(form: FormInstance) {
    for (const key in form.getFieldsValue()) {
      if (!form.getFieldsValue()[key]) {
        console.log(form.getFieldsValue());
        return false;
      }
    }
    return !form.getFieldsError().filter(({ errors }) => errors.length).length;
  }

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Update blog successfully",
      duration: 5,
    });
  };

  return (
    <div className="py-12">
      {contextHolder}
      <div className="mx-60 py-8 bg-white relative">
        <FontAwesomeIcon
          onClick={showModal}
          className="cursor-pointer absolute top-4 right-4"
          icon={faPen}
        />
        <h1 className="mb-8">{blog.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
      </div>
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
              className="font-semibold"
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your title"
                size="large"
              />
              <div hidden>{title}</div>
            </Form.Item>

            <Form.Item
              hasFeedback
              label="Description"
              name="description"
              validateFirst
              className="font-semibold"
            >
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
              />
              <div hidden>{blog.description}</div>
            </Form.Item>

            <Form.Item shouldUpdate className="mt-2 mb-0">
              {() => (
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default BlogPage;
