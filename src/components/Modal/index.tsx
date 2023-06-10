import { FC } from "react";

export const Modal: FC<any> = ({ children }) => {
  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modal-data">{children}</div>
      </div>
    </div>
  );
};
