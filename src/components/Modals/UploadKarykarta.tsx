import { FC, useEffect, useState } from "react";
import Validator from "../../utility/validator";

type props = {
  data?: any;
  booths?: any;
  callback?: any;
  onClose?: any;
  error?: any;
  success?: any;
};

const UploadKaryakarta : FC<any>=({
  callback,
  onClose,
  data,
  error,
  success,
}: props) =>{
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const form: any = new Validator("addvoter");
    return () => {
    //  form?.reset();
    };
  }, []);

  const addAction = (event: any) => {
    event.preventDefault();
    const form = new Validator("addvoter");
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      const input: any = document.querySelector('input[type="file"]');
      const data = new FormData();
      for (const file of input?.files) {
        data.append("file", file, file.name);
      }
      callback(data);
    }
  };

  const handleFileChange = (event: any) => {
    // Handle file change event if needed
  };

  return (
    <div className="modal-news">
      <form className="form" method="POST" name="addvoter" onSubmit={addAction}>
        <input
          type="hidden"
          name="id"
          value={data ? data.id : ""}
          data-validate=""
        />
        <div className="modal-header">
          <div className="title">Upload Volunteer</div>
        </div>
        <div className="modal-content">
          <a href="./assets/other/VolunteerSample.xlsx">Download Sample</a>
          <div className="row margin-top-15">
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
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          <div className="errorMessage">{error}</div>
          {success !== "" && <div className="successMessage">{success}</div>}
          <button className="action positive" type="submit">
            <i className="icon-check"></i> {data ? "Upload" : "Upload"}
          </button>
          <div className="action negative" onClick={onClose}>
            <i className="icon-times"></i> Cancel
          </div>
        </div>
      </form>
    </div>
  );
}
export default UploadKaryakarta;
