import React from "react";
import HamburgerComp from "./HamburgerComp";
import "./NavbarComp.css";

const NavbarComp = ({ setCategory }) => {
  return (
    <>
      <div className="nav">
        <div className="icon">
          <div className="search">
            <HamburgerComp setCategory={setCategory} />
          </div>
        </div>
        <img
          style={{ cursor: "pointer" }}
          src="https://cdn-icons-png.flaticon.com/512/21/21601.png"
          alt="logo"
          height="80%"
        />
      </div>
    </>
  );
};

export default NavbarComp;
