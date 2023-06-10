import { FC, useState } from "react";
import Validator from "../../utility/validator";
import API from "../../utility/api";
import { APIS } from "../../utility/constants";

export const AddBooth: FC<any> = ({ onSave, record, onClose }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState(record ? record : {});

  const addAction = async (event: any) => {
    event.preventDefault();
    const form = new Validator("addnewbooth");
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      let data = form.data();
      let res: any = await API.post(APIS.BOOTH.SAVE_NEW_BOOTH, {
        booth: data,
        edit: !!(data && data.id),
      });
      if (res.type === "success") {
        onSave();
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="modal-news">
      <form
        className="form"
        method="POST"
        name="addnewbooth"
        onSubmit={(e) => addAction(e)}
      >
        <input
          type="hidden"
          name="id"
          value={data ? data.id : ""}
          data-validate=""
        />

        <div className="modal-header">
          <div className="title">{data ? "Edit" : "Add New"} Booth</div>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-row">
                <label>Booth Id</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter Booth Id"
                  name="booth_id"
                  onChange={(e) =>
                    setData({ ...data, booth_id: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.id : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>PC No</label>
                <input
                  type="number"
                  className="input-control"
                  placeholder="Enter PC No"
                  name="pc_no"
                  onChange={(e) => setData({ ...data, pc_no: e.target.value })}
                  data-validate="required"
                  value={data ? data.pc_no : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>PC Name</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter PC name"
                  name="pc_name"
                  onChange={(e) =>
                    setData({ ...data, pc_name: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.pc_name : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>AC No</label>
                <input
                  type="number"
                  className="input-control"
                  placeholder="Enter AC No"
                  name="ac_no"
                  onChange={(e) => setData({ ...data, ac_no: e.target.value })}
                  data-validate="required"
                  value={data ? data.ac_no : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>AC Name</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter AC name"
                  name="ac_name"
                  onChange={(e) =>
                    setData({ ...data, ac_name: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.ac_name : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>District</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter district"
                  name="dist_name"
                  onChange={(e) =>
                    setData({ ...data, dist_name: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.dist_name : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Ward</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter ward"
                  name="ward"
                  onChange={(e) => setData({ ...data, ward: e.target.value })}
                  data-validate="required"
                  value={data ? data.ward : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>P.S. No</label>
                <input
                  type="number"
                  className="input-control"
                  placeholder="Enter P.S. No"
                  name="ps_no"
                  onChange={(e) => setData({ ...data, ps_no: e.target.value })}
                  data-validate="required"
                  value={data ? data.ps_no : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Part No</label>
                <input
                  type="number"
                  className="input-control"
                  placeholder="Enter Part No"
                  name="part_no"
                  onChange={(e) =>
                    setData({ ...data, part_no: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.part_no : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Booth Building</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter Booth Building"
                  name="building_name"
                  onChange={(e) =>
                    setData({ ...data, building_name: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.building_name : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Locality of Polling Station</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter Locality of Polling Station"
                  name="locality"
                  onChange={(e) =>
                    setData({ ...data, locality: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.locality : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Area of Polling Station</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter Area of Polling Station"
                  name="area"
                  onChange={(e) => setData({ ...data, area: e.target.value })}
                  data-validate="required"
                  value={data ? data.area : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Latitude</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter Latitude"
                  name="latitude"
                  onChange={(e) =>
                    setData({ ...data, latitude: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.latitude : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Longitude</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter Longitude"
                  name="longitude"
                  onChange={(e) =>
                    setData({ ...data, longitude: e.target.value })
                  }
                  data-validate="required"
                  value={data ? data.longitude : ""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          {error && <div className="errorMessage">{error}</div>}
          <button className="action positive" type="submit">
            <i className="icon-check"></i> {record ? "Update" : "Add"}
          </button>
          <div className="action negative" onClick={onClose.bind(this)}>
            <i className="icon-times"></i> Close
          </div>
        </div>
      </form>
    </div>
  );
};
