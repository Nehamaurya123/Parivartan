import React from "react";

type props = {
  confirmview?: any;
  data?: any;
  onConfirmNo?: any;
  onConfirmYes?: any;
};

const ConfirmBox = ({
  confirmview,
  data,
  onConfirmNo,
  onConfirmYes,
}: props) => {
  if (!confirmview) {
    return null;
  }

  const handleConfirmNo = () => {
    onConfirmNo(data);
  };

  const handleConfirmYes = () => {
    onConfirmYes(data);
  };

  return (
    <div className="cnf-outer">
      <div className="cnf-backdrop"></div>
      <div className="cnf-box">
        <div className="cnf-window">
          <div className="title">Are you sure to delete?</div>
          <div className="actions">
            <div className="action positive" onClick={handleConfirmYes}>
              <i className="icon-check"></i> Confirm
            </div>
            <div className="action negative" onClick={handleConfirmNo}>
              <i className="icon-times"></i> Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
