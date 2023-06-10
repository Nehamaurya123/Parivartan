import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dropdown = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const toggle = (id: any) => {
    setIsOpen(!isOpen);
  };

  const callbackDropdown = (callback: any) => {
    callback();
    toggle(props.id);
  };

  const dropdownClass = isOpen ? "dropdown open" : "dropdown";

  return (
    <div className={dropdownClass}>
      <div className="overlay" onClick={() => toggle(props.id)}></div>
      <a href="javascript:void(0);" onClick={() => toggle(props.id)}>
        {props.menu.icon && <i className={props.menu.icon}></i>}
        {props.menu.label && <span>{props.menu.label}</span>}
      </a>
      <ul
        className={`dropdown-options ${props.pos === "left" ? "left" : ""} ${
          props.pos === "right" ? "right" : ""
        }`}
      >
        {props.options &&
          props.options.map((option: any, index: number) => (
            <li key={index}>
              {option.href ? (
                <Link to={option.href}>
                  <i className={option.icon}></i> {option.label}
                </Link>
              ) : (
                <a
                  href="javascript:void(0);"
                  onClick={() => callbackDropdown(option.callback)}
                >
                  <i className={option.icon}></i> {option.label}
                </a>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
