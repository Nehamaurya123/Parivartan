import { FC, useState } from "react";
import Validator from "../../utility/validator";
import API from "../../utility/api";
import { APIS } from "../../utility/constants";

export const AddNewsMaster: FC<any> = ({ onSave, record, onClose }) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState(record ? record : {});
  const addAction = (event: any) => {
    event.preventDefault();
    const form = new Validator("addnewsmaster");
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      var data = new FormData();
      data.append("file", file);
      saveNews(data);
    }
  };

  const saveNews = async (params: any) => {
    let data: any = await API.post(APIS.NEWS.UPLOAD_NEWS, params, {
      headers: { "Content-Type": "application/" },
    });
    if (data.type === "success") {
      onSave();
    } else {
      setError(data.message);
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
        name="addnewsmaster"
        onSubmit={(event) => addAction(event)}
      >
        <input
          type="hidden"
          name="id"
          value={data ? data.id : ""}
          data-validate=""
        />
        <div className="modal-header">
          <div className="title">{data ? "Edit" : "Add"} News Master </div>
        </div>
        <div className="modal-content">
          <a href="/other/NewsSample.xlsx">Download Sample</a>

          <div className="row margin-top-10">
            <div className="col-md-6">
              <div className="form-row">
                <label>Select Excel File:</label>
                <input
                  type="file"
                  className="input-control"
                  placeholder="Select File"
                  name="file"
                  id="fileinput"
                  onChange={selectFile}
                  data-validate="required"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          {error && <div className="errorMessage">{error}</div>}
          <button className="action positive" type="submit">
            <i className="icon-check"></i> {data.id ? "Update" : "Save"}
          </button>
          <div className="action negative" onClick={onClose}>
            <i className="icon-times"></i> Cancel
          </div>
        </div>
      </form>
    </div>
  );
};
