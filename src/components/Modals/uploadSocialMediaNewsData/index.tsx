import React, { useEffect, useRef, useState } from "react";
import Validator from "../../../utility/validator";

type props = {
  data?: any;
  onClose?: any;
  callback?: any;
  success?: any;
  error?: any;
};

const UploadSocialMediaNewsData = ({
  data,
  callback,
  onClose,
  error,
  success,
}: props) => {
  const [selected, setSelected] = useState([]);
  const [uploading, setUploading] = useState(false);
  const formRef: any = useRef(null);

  useEffect(() => {
    formRef.current = new Validator("addvoter");
  }, []);

  const addAction = (event: any) => {
    setUploading(true);
    event.preventDefault();
    if (!formRef.current?.checkDirty()) formRef.current.validate();
    if (formRef.current?.valid()) {
      const input: any = document.querySelector('input[type="file"]');
      const formData = new FormData();
      for (const file of input?.files) {
        formData.append("file", file, file.name);
      }
      callback(formData);
    }
  };

  const onCloseHandler = () => {
    //formRef.current?.reset();
    onClose();
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
          <div className="title">Upload Social Media News</div>
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          <div className="errorMessage">{error}</div>
          {success && <div className="successMessage">{success}</div>}
          <button className="action positive" type="submit" hidden={uploading}>
            <i className="icon-check"></i> {data ? "Upload" : "Upload"}
          </button>
          <div className="action negative" onClick={onCloseHandler}>
            <i className="icon-times"></i> Close
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadSocialMediaNewsData;
