import { FC } from "react";
import { formatDateMysql } from "../../utility/helper";
import Validator from "../../utility/validator";

export const ViewNews: FC<any> = ({ data, booths, onPublish, onClose }) => {

  const addAction = (event: any) => {
    event.preventDefault();
    const form = new Validator('convertnews');
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      let data = form.data();
      onPublish(data);
    }
  }

  return (
    <div className="modal-news">
      <form className="form" method="POST" name="convertnews" onSubmit={addAction}>
        <div className="modal-news-header">
          <div className="date">{formatDateMysql(data.newsdate)}</div>
          <div className="title">{data.title}</div>
          {data.publisher == "ndtv" ? (
            <img className="logo" src="/img/ndtv-logo_70.jpg" />
          ) : (
            ""
          )}
        </div>
        <div className="modal-news-content">
          {data.image != "" ? <img src={data.image} /> : ""}
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: data.content.replace(/\n/g, "<br>"),
            }}
          ></div>

          <input
            type="hidden"
            name="id"
            value={data ? data.id : ""}
            data-validate=""
          />
          <div className="margin-top-10"></div>
          <div className="row margin-top-10">
            <div className="col-md-3">
              <label className="margin-top-10 display-block">
                Publish to Booth
              </label>
            </div>
            <div className="col-md-6">
              <div className="form-row">
                <select
                  className="input-control"
                  name="booth_id"
                  data-validate=""
                  value="0"
                >
                  <option value="0">All Booths</option>
                  {booths
                    ? booths.map((a: any, i: number) => {
                        return (
                          <option value={a.id} key={i}>
                            {a.boothname}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          <div className="social">
            <div className="social-item">
              <i className="icon-facebook"></i> {data.facebook}
            </div>
            <div className="social-item">
              <i className="icon-twitter"></i> {data.twitter}
            </div>
            <div className="social-item">
              <i className="icon-google"></i> {data.google}
            </div>
          </div>

          <button
            type="submit"
            className="action positive"
            onClick={() => onPublish(data)}
          >
            <i className="icon-forward"></i> Publish to App
          </button>
          <div className="action negative" onClick={onClose.bind(this)}>
            <i className="icon-times"></i> Cancel
          </div>
        </div>
      </form>
    </div>
  );
};
