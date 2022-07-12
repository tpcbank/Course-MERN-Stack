import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import parse from "html-react-parser";

export default function SingleComponent(props) {
  const [blog, setBlog] = useState("");

  // eslint-disable-next-line
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <div className="pt-3">{parse(blog.content)}</div>
          <p className="text-muted">
            ผู้เขียน:{blog.author} , เผยแพร่:{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
