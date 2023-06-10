import { FC } from "react";

const ConfirmBox: FC<any> = ({ onConfirm, onCancel }) => {
  
  return (
    <div className="cnf-outer">
				<div className="cnf-backdrop"></div>
				<div className="cnf-box">
					<div className="cnf-window">
						<div className="title">Are you sure to delete?</div>
						<div className="actions">
							<div className="action positive" onClick={onConfirm}><i className="icon-check"></i> Confirm</div>
							<div className="action negative" onClick={onCancel}><i className="icon-times"></i> Cancel</div>
						</div>
					</div>
				</div>
			</div>
  );
};

export default ConfirmBox;
