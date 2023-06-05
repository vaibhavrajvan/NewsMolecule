import React from "react";
import categories from "../data/Category";
import "./HeaderTab.css";

const HeaderTab = ({ setCategory, firstItemRef }) => {
  return (
    <div className="tabs">
      <div className="frame">
        {categories.map((each, key) => (
          <button
            key={key}
            className="tab-button custom-btn btn-3"
            onClick={() => setCategory(each[1])}
          >
            <span className="category-text">{each[0]}</span>
          </button>
        ))}
        <button
          onClick={() => firstItemRef.current.scrollIntoView()}
          className="custom-btn btn-15"
        >
          Horoscope
        </button>
      </div>
    </div>
  );
};

export default HeaderTab;
