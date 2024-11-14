import React, { useRef, useEffect } from "react";
import "./dropdown.css";

const Dropdown = (props) => {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  // This effect handles the click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdown_toggle_el.current &&
        dropdown_toggle_el.current.contains(e.target)
      ) {
        dropdown_content_el.current.classList.toggle("active");
      } else if (
        dropdown_content_el.current &&
        !dropdown_content_el.current.contains(e.target)
      ) {
        dropdown_content_el.current.classList.remove("active");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <div className="dropdown">
      <button ref={dropdown_toggle_el} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </button>
      <div ref={dropdown_content_el} className="dropdown__content">
        {props.contentData && props.renderItems
          ? props.contentData.map((item, index) =>
              props.renderItems(item, index)
            )
          : ""}
        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dropdown;
