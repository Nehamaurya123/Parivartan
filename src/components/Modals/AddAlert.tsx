import { FC, useState } from "react";
import Validator from "../../utility/validator";
import API from "../../utility/api";
import { APIS } from "../../utility/constants";

export const AddAlert: FC<any> = ({ onSave, booths, record, onClose }) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState(record?record:{});
  const [news_type, setNews_type] = useState<any>("alert");

  const addAction = (event: any) => {
    event.preventDefault();
    const form = new Validator("addalert");
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      var data = new FormData();
      let values = form.data();
      if (file) {
        if (news_type == "news") {
          data.append("image", file);
        } else {
          data.append("file", file);
        }
        data.append("has_file", "1");
      }
      for (var key in values) {
        if (key != "news_type") {
          data.append(key, values[key]);
        }
        data.append("news_type", news_type);
      }
      saveNews(data);
    }
  };

  const saveNews = async (params: any) => {
    const object: any = {};
    params.forEach(function (value: any, key: number) {
      object[key] = value;
    });

    const news_type = object.news_type;
    if (params.get("has_file") == "1") {
      let UPLOAD_URL = APIS.UPLOAD.FILE;
      if (news_type == "news") {
        UPLOAD_URL = APIS.UPLOAD.IMAGE;
      } else {
        object.title = object.alert_type;
      }
      let data: any = await API.post(UPLOAD_URL, params, {headers: {'Content-Type': 'application/'}});
      if (data.type === "success") {
        object.file_id = data.data.id;
        object.publisher = "Parivartan";
        let data_save: any = await API.post(APIS.NEWS.SAVE_NEWS, object);
        if (data_save.type === "success") {
          onSave();
        } else {
          setError(data_save.message);
        }
      } else {
        setError(data.message);
      }
    } else {
      object.file_id = 0;
      object.publisher = "Parivartan";
      let data_save: any = await API.post(APIS.NEWS.SAVE_NEWS, object);
      if (data_save.type === "success") {
        onSave();
      } else {
        setError(data_save.message);
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
        name="addalert"
        onSubmit={(event) => addAction(event)}
      >
        <input
          type="hidden"
          name="id"
          value={data ? data.id : ""}
          data-validate=""
        />
        <div className="modal-header">
          <div className="title">
            {data ? "Edit" : "Add"} News/Alert{" "}
          </div>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-row">
                <label>Booth</label>
                <select
                  className="input-control"
                  name="booth_id"
                  data-validate=""
                  value={data ? data.booth_id : "0"}
                >
                  <option value="0">All Booths</option>
                  {booths
                    ? booths.map((a: any, i: number) => {
                        return <option value={a.id} key={i}>{a.boothname}</option>;
                      })
                    : ""}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Post Type:</label>
                <div className="row margin-top-20">
                  <div className="col-md-3">
                    <input
                      type="radio"
                      data-validate=""
                      name="news_type"
                      value="news"
                      onClick={()=>setNews_type("news")}
                      checked={ news_type == "news"}
                    />{" "}
                    &nbsp; News
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      data-validate=""
                      name="n"
                      value="alert"
                      onClick={()=>setNews_type("alert")}
                      checked={news_type == "alert"}
                    />{" "}
                    &nbsp; Alert
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {news_type == "alert" ? (
              <div className="col-md-6">
                <div className="form-row">
                  <label>Alert Type</label>
                  <select
                    className="input-control"
                    name="alert_type"
                    data-validate=""
                    value={data ? data.title : "Urgent"}
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="Major">Major</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="col-md-12">
                <div className="form-row">
                  <label>Title</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Enter news title"
                    name="title"
                    data-validate="required"
                    value={data ? data.title : ""}
                  />
                </div>
              </div>
            )}

            <div className="col-md-12">
              <div className="form-row">
                <label>Content</label>
                <textarea
                  className="input-control textarea"
                  placeholder="Enter content"
                  name="text"
                  cols={4}
                  data-validate="required"
                >
                  {data ? data.text : ""}
                </textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Image/Attachment</label>
                <input
                  type="file"
                  data-validate=""
                  className="input-control"
                  placeholder="Select File"
                  name="file"
                  id="fileinput"
                  onChange={selectFile}
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
