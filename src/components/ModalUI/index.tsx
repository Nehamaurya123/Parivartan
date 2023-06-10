import React, { useState, useEffect } from "react";
type props = {
  onCloseRequest: any;
  children: any;
  showModal: boolean;
};
const Modal = ({ onCloseRequest, children, showModal }: props) => {
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp, false);
    document.addEventListener("click", handleOutsideClick, false);

    return () => {
      window.removeEventListener("keyup", handleKeyUp, false);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [showModal]);

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      onCloseRequest();
    }
  };

  const handleOutsideClick = (e: any) => {
    if (!showModal || !document.contains(e.target)) {
      onCloseRequest();
    }
  };

  return (
    <div className="modalOverlay" style={showModal ? {} : { display: "none" }}>
      <div className="modal" style={showModal ? {} : { display: "none" }}>
        <div className="modal-data">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
