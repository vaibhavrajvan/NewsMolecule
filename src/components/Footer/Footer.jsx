import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span className="name">
        Made With ❤ by{" "}
        <a
          className="myName"
          href="https://github.com/vaibhavrajvan"
          target="__blank"
        >
          Vaibhav
        </a>
      </span>
    </div>
  );
};

export default Footer;
