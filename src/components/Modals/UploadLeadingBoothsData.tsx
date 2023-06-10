import { useState } from 'react';
import API from '../../utility/api';
import { APIS } from '../../utility/constants';
import Validator from '../../utility/validator';

interface UploadLeadingBoothsDataProps {
  data?: {
    id: string;
  } | null;
  error?: string;
  success?: string;
  callback?: (data: FormData) => void;
  onClose?: () => void;
}

const UploadLeadingBoothsData: React.FC<UploadLeadingBoothsDataProps> = ({
  data,
  error,
  success,
  callback,
  onClose,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const addAction = async (event: any) => {
    event.preventDefault();
    const form = new Validator('addvoter');
    if (!form.checkDirty()) form.validate();
    if (form.valid() && selectedFiles) {
      const data = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        data.append('file', file, file.name);
      }

      try {
        const res = await API.post(
          APIS.ELECTIONCREPORT.UPLOAD_PREVIOUS_YEARS_DATA,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        console.log(res);

        if (typeof onClose === 'function') {
          onClose();
          // form.reset();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='modal-news'>
      <form className='form' method='POST' name='addvoter' onSubmit={addAction}>
        <input
          type='hidden'
          name='id'
          value={data ? data.id : ''}
          data-validate=''
        />
        <div className='modal-header'>
          <div className='title'>Upload Leading Booths Data</div>
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
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer modal-news-footer'>
          <div className='errorMessage'>{error}</div>
          {success !== '' && <div className='successMessage'>{success}</div>}
          <button className='action positive' type='submit'>
            <i className='icon-check'></i> {data ? 'Upload' : 'Upload'}
          </button>
          <div className='action negative' onClick={onClose}>
            <i className='icon-times'></i> Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadLeadingBoothsData;
