import NavbarComponent from "./components/NavbarComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getUser, getToken } from "./service/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // กดปุ่ม Ok หรือตกลง
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    // ส่ง request ไปที่ api เพื่อลบข้อมูล
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success").then(
          (result) => {
            if (result.isConfirmed) {
              fetchData();
            }
          }
        );
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blogs, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blogs.slug}`}>
              <h2>{blogs.title}</h2>
            </Link>
            <div className="pt-3">{parse(blogs.content.substring(0, 250))}</div>
            <p className="text-muted">
              ผู้เขียน:{blogs.author} , เผยแพร่:{" "}
              {new Date(blogs.createdAt).toLocaleString()}
            </p>
            {getUser() && (
              <div>
                <Link
                  to={`/blog/edit/${blogs.slug}`}
                  className="btn btn-outline-success"
                >
                  แก้ไขบทความ
                </Link>
                &nbsp;
                <buttion
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(blogs.slug)}
                >
                  ลบบทความ
                </buttion>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
