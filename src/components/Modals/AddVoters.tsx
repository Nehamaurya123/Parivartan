import { FC, useState } from "react";
import Validator from "../../utility/validator";
import API from "../../utility/api";
import { APIS } from "../../utility/constants";

export const AddVoters: FC<any> = ({ onSave, onClose }) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState<any>(null);

  const addAction = async (event: any) => {
    event.preventDefault();
    const form = new Validator("addvoter");

    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      var data = new FormData();
      data.append("file", file);
      let res: any = await API.post(APIS.VOTER.SAVE_VOTER, data, {
        headers: { "Content-Type": "application/" },
      });
      if (res.type === "success") {
        onSave();
      } else {
        setError(res.message);
      }
    }
  };

  const selectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="modal-news">
      <form
        className="form"
        method="POST"
        name="addvoter"
        onSubmit={addAction.bind(this)}
      >
        <div className="modal-header">
          <div className="title">
            {"Add"} Voters{" "}
            <a href="./other/VoterSample.xlsx">Download Sample</a>
          </div>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-row">
                <label>Select Excel File:</label>
                <input
                  type="file"
                  className="input-control"
                  placeholder="Select File"
                  name="file"
                  id="fileinput"
                  data-validate="required"
                  onChange={selectFile}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          {error && <div className="errorMessage">{error}</div>}
          <button className="action positive" type="submit">
            <i className="icon-check"></i>Upload
          </button>
          <div className="action negative" onClick={onClose.bind(this)}>
            <i className="icon-times"></i> Close
          </div>
        </div>
      </form>
    </div>
  );
};
