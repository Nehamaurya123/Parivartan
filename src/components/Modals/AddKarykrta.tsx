import React, { useEffect, useState } from 'react';
import API from '../../utility/api';
import { APIS } from "../../utility/constants";
import Validator from "../../utility/validator";
interface typeProps {
  booths?: any;
  record?: any;
  onSave?: () => void;
  onClose?: () => void;
}

const AddKaryakarta = ({ booths, record, onSave, onClose }: typeProps) => {
  const [error, setError] = useState("");
  const [data, setData] = useState(record ? record : {});
  console.log("record", record);
  const [options, setOptions] = useState([]);
 
  useEffect(() => {
    if (booths) {
      setOptions(
        booths.map((booth: any) => {
          return {
            label: booth.boothname,
            value: booth.id,
          };
        })
      );
    }
  }, [booths]);

  const addAction = async (event: any) => {
    event.preventDefault();
    const form = new Validator('addkarykrta');
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      let formData = form.data();
      
     let res: any = await API.post(APIS.KARYAKARTA.SAVE_KARYAKARTA, formData);
      if (res.type === "success" && typeof onSave === "function") {
        onSave();
      } else {
        setError(res.message);
      }
      if (typeof onClose === "function") {
        onClose();
      }
    }
  };

    const setValue = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };


    return (
    <div className="modal-news">
      <form
        className="form"
        method="POST"
        name="addkarykrta"
        onSubmit={(e) => addAction(e)}
      >
        <input
          type="hidden"
          name="id"
          value={data ? data.id : ""}
          data-validate=""
        />
        <div className="modal-header">
          <div className="title">{record ? "Edit" : "Add"} MP Assistant</div>
        </div>
        <div className="modal-content">
          <div className="row">

          <div className="col-md-12">
              <div className="form-row">
                <label>Booth</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-row">
                <label>First name</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter first name"
                  name="first_name"
                  data-validate="required,alphabet"
                  value={data ? data.first_name : ""}
                  onChange={(e) =>
                    setData({ ...data, first_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Last name</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter last name"
                  name="last_name"
                  data-validate=""
                  value={data ? data.last_name : ""}
                  onChange={(e) =>
                    setData({ ...data, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Email address</label>
                <input
                  type="email"
                  className="input-control"
                  placeholder="Enter email address"
                  name="email"
                  data-validate="required,email"
                  value={data ? data.email : ""}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Mobile</label>
                <input
                  type="number"
                  className="input-control"
                  placeholder="Enter mobile number"
                  name="mobile"
                  data-validate="required,number"
                  value={data ? data.mobile : ""}
                  onChange={(e) => setData({ ...data, mobile: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="Enter password"
                  name="password"
                  data-validate={data ? "" : "required"}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Retype Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="Retype password"
                  name="password"
                  data-validate={data ? "" : "required"}
                  data-same="password"
                  onChange={(e) =>
                    setData({ ...data, retype_password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-row">
                <label>Address</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter address"
                  name="address"
                  data-validate=""
                  value={data ? data.address : ""}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Gender</label>
                <select
                  className="input-control"
                  name="gender"
                  data-validate="required"
                  value={data ? data.gender : ""}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row">
                <label>Age</label>
                <select
                  className="input-control"
                  name="age"
                  data-validate="required"
                  value={data ? data.age : ""}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                >
                  <option value="">Select Age</option>
                  <option value="0 to 18 years">0 to 18 years</option>
                  <option value="18 to 25 years">18 to 25 years</option>
                  <option value="25 to 40 years">25 to 40 years</option>
                  <option value="40+ years">40+ years</option>
                </select>
              </div>
            </div>

                     <div className='col-md-12'>
               <div className='form-row'>
               <label>Booth</label>
                <select
                  className='input-control'
                  name='booth_id'
                  data-validate=''
                  value={data ? data.booth_id : ''}
                  onChange={setValue}
                >
                  <option value=''>Select Booth</option>
                  {booths
                    ? booths.map((a: any, i: number) => {
                         return (
                           <option value={a.id} key={i}>
                            {a.id}-{a.boothname}
                          </option>
                        );
                      })
                     : ''}
                 </select>
               </div>
             </div> 

          </div>
        </div>
        <div className="modal-footer modal-news-footer">
          {error && <div className="errorMessage">{error}</div>}
          <button className="action positive" type="submit">
            <i className="icon-check"></i> {record ? "Update" : "Register"}
          </button>
          <div className="action negative" onClick={onClose}>
            <i className="icon-times"></i> Cancel
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddKaryakarta;
