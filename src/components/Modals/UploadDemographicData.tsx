import React, { useEffect, useRef, useState } from 'react';
import API from '../../utility/api';
import { APIS } from '../../utility/constants';
import Validator from '../../utility/validator';

type props = {
  data?: any;
  onSave?: () => void;
  onClose?: () => void;
  success?: any;
  error?: any;
};

const UploadDemographicData = ({
  data,
  onSave,
  onClose,
}: props) => {
  const [uploading, setUploading] = useState(false);
   const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  
  const formRef: any = useRef(null);

  useEffect(() => {
    formRef.current = new Validator('addReports');
  }, []);

  const addAction = async (event: any) => {
    event.preventDefault();
    const form = new Validator('addReports');

    if (!form.checkDirty()) form.validate();
    if (form.valid()) {
      var data = new FormData();
      data.append('file', file);
      let res: any = await API.post(APIS.KARYAKARTA.UPLOAD_KARYAKARTA,data, {
        headers: { 'Content-Type': 'application/json' },
      });
       if (res.type === 'success') {
        //  onSave();
         setSuccess('success')
       } else {
         setError(res.message);
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


  const onCloseHandler = () => {
    if (typeof onClose === 'function') {
      onClose();
   }
  };

  return (
    <div className='modal-news'>
      <form className='form' method='POST' name='addReports' onSubmit={addAction}>
        <input
          type='hidden'
          name='id'
          value={data ? data.id : ''}
          data-validate=''
        />
        <div className='modal-header'>
          <div className='title'>Upload Demographic Data</div>
        </div>
        <div className='modal-content'>
          <a href='./assets/other/VolunteerSample.xlsx'>Download Sample</a>
          <div className='row margin-top-15'>
            <div className='col-md-6'>
              <div className='form-row'>
                <label>Select Excel File:</label>
                <input
                  type='file'
                  className='input-control'
                  placeholder='Select File'
                  name='file'
                  id='fileinput'
                  data-validate='required'
                  onChange={selectFile}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer modal-news-footer'>
          <div className='errorMessage'>{error}</div>
          {success && <div className='successMessage'>{success}</div>}
          <button className='action positive' type='submit' hidden={uploading}>
            <i className='icon-check'></i> {data ? 'Upload' : 'Upload'}
          </button>
          <div className='action negative' onClick={onCloseHandler}>
            <i className='icon-times'></i> Close
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadDemographicData;
