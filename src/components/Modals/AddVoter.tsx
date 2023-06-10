import { FC, useState } from "react";
import Validator from "../../utility/validator";
import API from "../../utility/api";
import { APIS } from "../../utility/constants";

export const AddVoter: FC<any> = ({ onSave, booths, record, onClose }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState(record ? record : {});

  const addAction = async (event: any) => {
    event.preventDefault();
    const form = new Validator("addvoterform");
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      let data = form.data();
      let res: any = await API.post(APIS.VOTER.SAVE_VOTER_FORM, data);
      if (res.type === "success") {
        onSave();
      } else {
        setError(res.message);
      }
    }
  };

  const setValue = (event: any) => {
    setData({...data, [event.target.name]: event.target.value});
  }

  console.log("Data", data);

  return (
    <div className="modal-news">
        <form className="form" method="POST" name="addvoterform" onSubmit={addAction.bind(this)}>
          <input type="hidden" name="id" value={data ? data.id : ''} data-validate="" />
          
          
          
          <div className="modal-header">
            <div className="title">{data ? "Edit" : 'Add'} Voter</div>

          </div>
          <div className="modal-content">

            <div className="row">

              <div className="col-md-6">
                <div className="form-row">
                  <label>Booth</label>
                  <select className="input-control" name="booth_id" data-validate="" value={data ? data.booth_id : ''} onChange={setValue}>
                    <option value="">Select Booth</option>
                    {(booths) ? booths.map((a: any, i: number) => {
                      return <option value={a.id} key={i}>{a.id}-{a.boothname}</option>
                    }) : ''}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-row">
                  <label>Voter ID</label>
                  <input type="text" className="input-control" placeholder="Enter Voter ID" name="voter_id" onChange={setValue}
                    data-validate="required" value={data ? data.voter_id : ''} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-row">
                  <label>Name (English)</label>
                  <input type="text" className="input-control" placeholder="Enter name in English" name="name" onChange={setValue}
                    data-validate="required" value={data ? data.name : ''} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-row">
                  <label>Name (Hindi)</label>
                  <input type="text" className="input-control" placeholder="Enter name in Hindi" name="name_hindi" onChange={setValue}
                    data-validate="required" value={data ? data.name_hindi : ''} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-row">
                  <label>Gender</label>
                  <select className="input-control" name="gender" data-validate="required" value={data ? data.gender : ''} onChange={setValue}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>


              <div className="col-md-6">
                <div className="form-row">
                  <label>Relation</label>
                  <input type="text" className="input-control" placeholder="Enter relation" name="relation" data-validate="" value={data ? data.relation : ''} onChange={setValue} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-row">
                  <label>Relation Name (English)</label>
                  <input type="text" className="input-control" placeholder="Relation Name in English" name="r_name" data-validate="" value={data ? data.r_name : ''} onChange={setValue} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-row">
                  <label>Relation Name (Hindi)</label>
                  <input type="text" className="input-control" placeholder="Relation Name in Hindi" name="r_name_hindi" data-validate="" value={data ? data.r_name_hindi : ''} onChange={setValue} />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-row">
                  <label>Address</label>
                  <input type="text" className="input-control" placeholder="Enter address" name="address" data-validate="" 
                   value={data ? data.address : ''} onChange={setValue} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-row">
                  <label>Age</label>
                  <input type="number" className="input-control" placeholder="Age" name="age" data-validate="required" value={data ? data.age : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>Family Size</label>
                  <input type="number" className="input-control" placeholder="Family Size" name="family_size" data-validate="required" value={data ? data.family_size : ''} onChange={setValue} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-row">
                  <label>Religion</label>
                  <input type="text" className="input-control" placeholder="Religion" name="religion" data-validate="" value={data ? data.religion : ''} onChange={setValue} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-row">
                  <label>Caste</label>
                  <input type="text" className="input-control" placeholder="Caste" name="caste" data-validate="" value={data ? data.caste : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>Voter Type</label>
                  <select className="input-control" name="voter_type" data-validate="required" value={data ? data.voter_type : ''} onChange={setValue}>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-row">
                  <label>PC No.</label>
                  <input type="number" className="input-control" placeholder="PC No." name="pc_no" data-validate="required" value={data ? data.pc_no : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>AC No.</label>
                  <input type="number" className="input-control" placeholder="AC No." name="ac_no" data-validate="required" value={data ? data.ac_no : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>Part No.</label>
                  <input type="number" className="input-control" placeholder="Part No." name="part_no" data-validate="required" value={data ? data.part_no : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>Section No.</label>
                  <input type="number" className="input-control" placeholder="Section No." name="section_no" data-validate="required" value={data ? data.section_no : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>Sequence</label>
                  <input type="number" className="input-control" placeholder="Sequence" name="sequence" data-validate="" value={data ? data.sequence : ''} onChange={setValue} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-row">
                  <label>Is Important</label>
                  <select className="input-control" name="important" data-validate="required" value={data ? data.important : ''} onChange={setValue}>
  
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
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
