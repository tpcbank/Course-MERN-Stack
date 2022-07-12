import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../service/authorize";

export default function EditComponent(props) {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  const { title, author, slug } = state;
  const [content, setContent] = useState("");

  const submitContent = (e) => {
    setContent(e);
  };
  // eslint-disable-next-line
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const showupdateForm = () => (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label>ขื่อบทความ</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={inputValue("title")}
        />
      </div>
      <div className="form-group">
        <label>รายละเอียด</label>
        <ReactQuill
          className="pd-5 mb-3"
          value={content}
          onChange={submitContent}
          theme="snow"
          style={{ border: "1px solid #666" }}
        />
      </div>
      <div className="form-group">
        <label>ผู้แต่ง</label>
        <input
          type="text"
          className="form-control"
          value={author}
          onChange={inputValue("author")}
        />
      </div>
      <br />
      <input type="submit" value="อัพเดท" className="btn btn-primary" />
    </form>
  );

  const inputValue = (name) => (event) => {
    console.log(name);
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/blog/${slug}`,
        {
          title,
          content,
          author,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("แจ้งเตือน", "อัพเดทบทความเรียบร้อย", "success");
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err, "error");
      });
    console.log(process.env.REACT_APP_API);
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>แก้ไขบนความ</h1>
      {showupdateForm()}
    </div>
  );
}
