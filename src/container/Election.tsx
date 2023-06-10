import React, { FC, useState, useEffect } from 'react';
import '../assets/scss/mpassistant.scss';
import loading_gif from '../assets/img/loading.gif';

import API from '../utility/api';
import { APIS } from '../utility/constants';
import { Modal } from '../components/Modal';
import { useAuth } from '../utility/authProvider';
import AddElection from '../components/Modals/AddElection';

export const ElectionContainer: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  // const [editElection, setEditElection] = useState<any>(null);

  const { primaryOpen, onActionPrimary } = useAuth();

  useEffect(() => {
    fetchData(0, 'desc');
  }, []);

  const fetchData = async (order: any, booth_id: any) => {
    setLoading(true);
    const res = await API.get(
      APIS.ASSISTANT.LIST + '?order=' + order + '&booth_id=' + booth_id
    );
    setLoading(false);
    setData(res.data);
  };

  return (
    <>
      <div className='dashboard'>
        <div className='container-fluid nopadding'>
          <div className='row'>
            <div className='col-md-12'>
              <div>
                <div className='page-header'>
                  <div className='filter-container'>
                    <div className={'filter-item'}>Date: 24/06/2014</div>
                    <div className={'filter-item'}>Date: 14/06/2015</div>
                    <div className={'filter-item'}>Date: 15/06/2018</div>
                  </div>
                </div>
              </div>

              {loading || !data ? (
                <div className='page-loader'>
                  <img src={loading_gif} alt='loading-gif' />
                </div>
              ) : (
                <div className='no-data text-center'>
                  <div className='ico'>
                    <i className='icon-info'></i>
                  </div>
                  <p className='px18 weight700'>Sorry :(</p>
                  <p>There is nothing to show here.</p>
                </div>
              )}
              {primaryOpen ? (
                <Modal onClose={() => onActionPrimary(false)}>
                  <AddElection
                    dataList={null}
                    onClose={() => onActionPrimary(false)}
                    onSave={() => {
                      fetchData(0, 'desc');
                      onActionPrimary(false);
                    }}
                  />
                </Modal>
              ) : (
                ''
              )}
              {/* {editElection ? (
                <Modal onClose={() => setEditElection(null)}>
                  <AddElection
                    record={editElection}
                    onClose={() => setEditElection(null)}
                    onSave={() => {
                      fetchData();
                      setEditElection(null);
                    }}
                  />
                </Modal>
              ) : (
                ''
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionContainer;
