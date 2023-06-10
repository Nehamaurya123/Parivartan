//  SettingsConntainer 
import React, { useState } from 'react';
import ConfirmBox from '../components/Confirm';
import '../assets/scss/settings.scss';
import loading_gif from '../assets/img/loading.gif';
import API from '../utility/api';
import { APIS } from '../utility/constants';
import Validator from '../utility/validator';


const SettingsConntainer = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState(false);
  const [confirmView, setConfirmView] = useState(false);


    React.useEffect(() => {
      fetchSetting();
    }, []);

  const fetchSetting = async () => {
      setLoading(true)
      let data: any = await API.get(APIS.AUTH.SETTING, {
        method: 'GET',
      });
      setLoading(false)

      if (data.type === 'success') {
        // setSuccessMessage('Success');
      }
  };
  
   const deleteData = async () => {
     let data: any = await API.delete(APIS.AUTH.DELETE_ALL, {
       method: 'DELETE',
       data: '',
     });
     setConfirmDelete(true)
     console.log(data);
   };

  const saveAction = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = new Validator('updatesetting');
    if (!form?.checkDirty()) form?.validate();
    if (form?.valid()) {
      const data = form.data();
      let res: any = await API.post(APIS.AUTH.SAVE_SETTING, data);
      if (res.type === 'success') {
        setSuccessMessage('success')
      }
    }
  };

  const deleteAllData = () => {
    setConfirmData(true);
    setConfirmView(true);
  };

  return (
    <div className='settings'>
      <div className='container-fluid nopadding'>
        <div className='row'>
          <div className='col-md-12'>
            {loading ? (
              <div className='page-loader'>
                <img src={loading_gif} alt='loading' />
              </div>
            ) : (
              <div>
                <div className='row'>
                  <div className='col-md-4'>
                    <form
                      className='form'
                      method='POST'
                      name='updatesetting'
                      id='updatesetting'
                      onSubmit={saveAction}
                    >
                      {successMessage !== '' ? (
                        <div className='success-message'>{successMessage}</div>
                      ) : (
                        ''
                      )}
                      <div className='form-row'>
                        <label>First name</label>
                        <input
                          type='text'
                          className='input-control'
                          placeholder='Enter first name'
                          name='first_name'
                          data-validate='required,alphabet'
                        />
                      </div>
                      <div className='form-row'>
                        <label>Last name</label>
                        <input
                          type='text'
                          className='input-control'
                          placeholder='Enter last name'
                          name='last_name'
                          data-validate=''
                        />
                      </div>
                      <div className='form-row'>
                        <label>Email address</label>
                        <input
                          type='email'
                          className='input-control'
                          placeholder='Enter email address'
                          name='email'
                          data-validate='required,email'
                        />
                      </div>
                      <div className='form-row'>
                        <label>Mobile</label>
                        <input
                          type='number'
                          className='input-control'
                          placeholder='Enter mobile number'
                          name='mobile'
                          data-validate='required,number'
                        />
                      </div>
                      <div className='form-row'>
                        <label>Password (Keep blank for no change)</label>
                        <input
                          type='password'
                          className='input-control'
                          placeholder='Enter password'
                          name='password'
                          autoComplete='off'
                          data-validate=''
                        />
                      </div>
                      <button className='action positive' type='submit'>
                        <i className='icon-check'></i> Update
                      </button>
                    </form>
                  </div>
                  <div className='col-md-8'>
                    <div className='delete-all' onClick={deleteData}>
                      Delete All Data
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {confirmDelete && (
        <ConfirmBox
          onConfirm={deleteData}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default SettingsConntainer;
