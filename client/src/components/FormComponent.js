import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../service/authorize";

export default function FormComponent() {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });

  const { title, author } = state;

  const [content, setContent] = useState();

  const inputValue = (name) => (event) => {
    console.log(name);
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        { title, content, author },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
    console.log(process.env.REACT_APP_API);
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เขียนบนความ</h1>
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
            placeholder="เขียนรายละเอียดบทความของคุณ"
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
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
}
