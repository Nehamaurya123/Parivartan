import React, { useState, useEffect } from 'react';
import API from '../../utility/api';
import { APIS } from '../../utility/constants';
import Validator from '../../utility/validator';

interface AddElectionProp {
  onSave?: any;
  onClose?: () => void;
  dataList?: any;
  record?: {};
}

const AddElection = ({
  onSave,
  onClose,
  dataList,
  record,
}: AddElectionProp) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [data, setData] = useState<any>(record ? record : {});

  const addElection = async (e: any) => {
    e.preventDefault();
    const form = new Validator('addElection');
    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      let data = form.data();
      let res: any = await API.post(APIS.ELECTION.SAVE_ELECTION, data);
      if (res.type === 'success') {
        console.log(res.data);

        onSave();
        setSuccess('Success');
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div>
      <div className='modal-news'>
        <form
          className='form'
          method='POST'
          name='addElection'
          onSubmit={addElection}
        >
          <input
            type='hidden'
            name='id'
            value={data ? data.id : ''}
            data-validate=''
          />
          <div className='modal-header'>
            <div className='title'>{record ? 'Edit' : 'Add'} Election</div>
          </div>
          <div className='modal-content'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-row'>
                  <label>Choose Election Date</label>
                  <input
                    onChange={(e: any) => {}}
                    // value={data}
                    type='date'
                    className='input-control'
                    name='on'
                    data-validate='required'
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-row'>
                  <label>From</label>
                  <select
                    className='input-control'
                    name='from'
                    data-validate='required'
                  >
                    <option value=''>Select Time</option>
                    {fromData.map((data: any, id: number) => (
                      <option
                        onChange={(e: any) => {}}
                        key={data.key}
                        value={data.key}
                      >
                        {data.value}
                      </option>
                    ))}
                    ;
                  </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-row'>
                  <label>To</label>
                  <select
                    className='input-control'
                    name='to'
                    data-validate='required'
                  >
                    <option value=''>Select Time</option>
                    {toData.map((data: any, id: number) => (
                      <option
                        onChange={(e: any) => {}}
                        key={data.key}
                        value={data.key}
                      >
                        {data.value}
                      </option>
                    ))}
                    ;
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer modal-news-footer'>
            <div className='errorMessage'>{error}</div>
            <div className='successMessage'>{success}</div>
            <button className='action positive' type='submit'>
              <i className='icon-check'></i> {record ? 'Update' : 'Create'}
            </button>
            <div className='action negative' onClick={onClose}>
              <i className='icon-times'></i> Close
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddElection;

let fromData = [
  { key: '10', value: '10:00 AM' },
  { key: '11', value: '11:00 AM' },
  { key: '12', value: '12:00 PM' },
  { key: '13', value: '01:00 PM' },
  { key: '14', value: '02:00 PM' },
  { key: '15', value: '03:00 PM' },
  { key: '16', value: '04:00 PM' },
  { key: '17', value: '05:00 PM' },
  { key: '18', value: '06:00 PM' },
  { key: '19', value: '07:00 PM' },
  { key: '20', value: '08:00 PM' },
  { key: '21', value: '09:00 PM' },
];

let toData = [
  { key: '10', value: '10:00 AM' },
  { key: '11', value: '11:00 AM' },
  { key: '12', value: '12:00 PM' },
  { key: '13', value: '01:00 PM' },
  { key: '14', value: '02:00 PM' },
  { key: '15', value: '03:00 PM' },
  { key: '16', value: '04:00 PM' },
  { key: '17', value: '05:00 PM' },
  { key: '18', value: '06:00 PM' },
  { key: '19', value: '07:00 PM' },
  { key: '20', value: '08:00 PM' },
  { key: '21', value: '09:00 PM' },
];
