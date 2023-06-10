import { FC, useEffect, useMemo, useState } from "react";
import "../assets/scss/mpassistant.scss";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import classy from "classnames";
import { useAuth } from "../utility/authProvider";
import { Modal } from "../components/Modal";
import { Avatar } from "../components/Avatar";
import ConfirmBox from "../components/Confirm";
import AddMpAssistant from "../components/Modals/AddMpAssistant";

const MPAssistantContainer: FC = () => {
  const { primaryOpen, onActionPrimary } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number>(0);
  const [booths, setBooths] = useState([]);
  const [list, setList] = useState<any>(null);
  const [filter_text, setFilter_text] = useState<string>("");
  const [search_open, setSearch_open] = useState<boolean>(false);
  const [filter_status, setFilter_status] = useState<string>("");
  const [editData, setEditData] = useState(null)
  const [menuopen, setMenuopen] = useState<number>(-1);

  useEffect(() => {
    fetchData(0, 'DESC');
    fetchBooths();
  }, [ filter_status]);

  const fetchData = async (booth_id: any, order: any) => {
    setLoading(true);
    const res = await API.get(
      APIS.ASSISTANT.LIST +
        '?order=' +
        order +
        '&booth_id=' +
        booth_id +
        '&status=' +
        filter_status
    );

    setLoading(false);
    setList(res.data);
  };

  const fetchBooths = async () => {
    const res: any = await API.get(APIS.KARYAKARTA.BOOTH_LIST);
    setBooths(res.data);
  };
  const searchAction = (search_val: string) => {
    setFilter_text(search_val);
  };

  const editAssistant = async (data:any) => {
    setEditData(data)
  };

  const switchMPA = async (data: any, status: boolean) => {
    let res: any = await API.post(APIS.KARYAKARTA.SWITCH_KARYAKARTA_STATUS, {
      status: status,
      id: data.id,
    });
    if (res.type === "success") {
      fetchData(0, 'DESC');
    }
  };

    const deleteVoter = async () => {
      setConfirmDelete(0);
      await API.delete(APIS.ASSISTANT.DELETE_ASSISTANT+ confirmDelete);
      fetchData(0, 'DESC');
    };


  return (
    <div className='dashboard'>
      <div className='container-fluid nopadding'>
        <div className='row'>
          <div className='col-md-12'>
            <div>
              <div className='page-header'>
                {filter_text != '' || search_open ? (
                  <div className='search-open'>
                    <input
                      type='text'
                      placeholder='Search'
                      id='txtAssistantSearch'
                      onChange={(e) => setFilter_text(e.target.value)}
                      value={filter_text}
                    />
                    <i className='icon-search'></i>
                  </div>
                ) : (
                  <div className='search' onClick={() => setSearch_open(true)}>
                    <i className='icon-search'></i>
                  </div>
                )}

                <div className='filter-container'>
                  <div
                    className={classy({
                      'filter-item': true,
                      selected: filter_status === 'All',
                    })}
                    onClick={() => setFilter_status('All')}
                  >
                    All
                  </div>
                  <div
                    className={classy({
                      'filter-item': true,
                      selected: filter_status === 'Active',
                    })}
                    onClick={() => setFilter_status('Active')}
                  >
                    Active
                  </div>
                  <div
                    className={classy({
                      'filter-item': true,
                      selected: filter_status === 'Inactive',
                    })}
                    onClick={() => setFilter_status('Inactive')}
                  >
                    Inactive
                  </div>
                </div>

                {/* <div className="dd-container">
                  <div className="dd-box">
                    <Dropdown id="1" options={sortoptions} menu={menu} />
                  </div>
                  <div className="dd-box dd-box-300">
                    <Dropdown id="2" options={boothoptions} menu={menu_booth} />
                  </div>
                </div> */}
              </div>
            </div>

            {loading || !list ? (
              <div className='page-loader'>
                <img src='/img/loading.gif' />
              </div>
            ) : (
              <div>
                {list && list.length > 0 ? (
                  list.map((data: any, index: number) => {
                    return (
                      <div>
                        <div className='mpa-list'>
                          <ul className='kr-item'>
                            <li>
                              <div className='kr-container'>
                                <div className='kr-left'>
                                  <Avatar
                                    first_name={data.first_name}
                                    last_name={data.last_name}
                                    image={data.imagepath.thumb}
                                  />
                                </div>
                                <div className='kr-right'>
                                  <div className='kr-head'>
                                    {data.first_name} {data.last_name}
                                  </div>
                                  <div className='kr-content'>
                                    {data.address}
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='kr-container'>
                                <div className='kr-head'>Hindu</div>
                                <div className='kr-content'>
                                  {data.gender}, {data.age}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='kr-container'>
                                <div className='kr-head'>{data.mobile}</div>
                                <div className='kr-content'>{data.email}</div>
                              </div>
                            </li>

                            <li className='grey'>
                              <div
                                className='kr-container tooltip'
                                data-tooltip={data.boothnames.join(', ')}
                              >
                                <div className='kr-head'>{data.booths}</div>
                                <div className='kr-content'>Booths</div>
                              </div>
                            </li>
                            <li className='grey'>
                              <div className='kr-container'>
                                <div className='kr-head'>{data.karyakarta}</div>
                                <div className='kr-content'>Karyakarta</div>
                              </div>
                            </li>

                            <li className='grey'>
                              <div className='kr-container'>
                                <div className='actions-list'>
                                  {/* <div
                                    className='action action-view tooltip'
                                    data-tooltip='View'
                                  >
                                    <Link
                                      style={{ color: 'grey' }}
                                      to={`/booth/${data.id}`}
                                    >
                                      <i className='icon-circle'></i>
                                    </Link> 
                                  </div> */}
                                  <div
                                    className='action action-edit tooltip'
                                    data-tooltip='Edit'
                                    onClick={() => {
                                      editAssistant(data);
                                    }}
                                  >
                                    <i className='icon-edit'></i>
                                  </div>
                                  {(data.status == true)?<div className="action action-switch tooltip" data-tooltip="Deactivate" onClick={switchMPA.bind(this,data,false)}><i className="icon-ban"></i></div>:<div className="action action-switch  tooltip" data-tooltip="Activate" onClick={()=>switchMPA(data,true)}><i className="icon-check"></i></div>}
                                  <div
                                    className='action action-delete'
                                    data-tooltip='Delete'
                                    onClick={() => {
                                      setConfirmDelete(data.id);
                                    }}
                                  >
                                    <i className='icon-trash'></i>
                                  </div>
                                 
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='no-data text-center'>
                    <div className='ico'>
                      <i className='icon-info'></i>
                    </div>
                    <p className='px18 weight700'>Sorry :(</p>
                    <p>There is nothing to show here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {primaryOpen && (
        <Modal onClose={() => onActionPrimary(false)}>
          <AddMpAssistant
            record={null}
            booths={booths}
            onClose={() => onActionPrimary(false)}
            onSave={() => {
              fetchData(0, 'DESC');
              onActionPrimary(false);
            }}
          />
        </Modal>
      )}
      {editData ? (
        <Modal onClose={() => setEditData(null)}>
          <AddMpAssistant
            record={editData}
            booths={booths}
            onClose={() => setEditData(null)}
            onSave={() => {
              fetchData(0, 'DESC');
              setEditData(null);
            }}
          />
        </Modal>
      ) : (
        ''
      )}

      {confirmDelete > 0 && (
        <ConfirmBox
          onConfirm={deleteVoter}
          onCancel={() => setConfirmDelete(0)}
        />
      )}
    </div>
  );
};

export default MPAssistantContainer;
