import { FC, useEffect, useMemo, useState } from "react";
import "../assets/scss/booths.scss";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import classy from "classnames";
import { useAuth } from "../utility/authProvider";
import { Modal } from "../components/Modal";
import ConfirmBox from "../components/Confirm";
import { Link } from "react-router-dom";
import { Mapview } from "../components/Mapview";
import { AddBooth } from "../components/Modals/AddBooth";
import { AddBooths } from "../components/Modals/AddBoots";

export const BoothContainer: FC = () => {
  const { primaryOpen, onActionPrimary, secondaryOpen, onActionSecondary } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [filter_text, setFilter_text] = useState<string>("");
  const [menuopen, setMenuopen] = useState<number>(-1);
  const [confirmDelete, setConfirmDelete] = useState<number>(0);
  const [editBooth, setEditBooth] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await API.get(APIS.BOOTH.DATA);
    setLoading(false);
    setData(res.data);
  };

  const boothClick = async (id: any) => {
    setSelected(id);
  };

  const searchAction = (search_val: string) => {
    setFilter_text(search_val);
  };

  const deleteBooth = async ()=>{
  	setConfirmDelete(0);
    await API.delete(APIS.BOOTH.DELETE_BOOTH+confirmDelete);
  	fetchData();
  }

  return (
    <div className="dashboard">
      {loading || !data ? (
        <div className="page-loader">
          <img src="/img/loading.gif" />
        </div>
      ) : (
        <div className="booths">
          <div className="left-panel">
            <div className="left-panel-inner">
              {data.map((a: any, i: number) => {
                if (
                  a.boothname
                    .toLowerCase()
                    .lastIndexOf(filter_text.toLowerCase()) === -1
                ) {
                  return;
                }
                return (
                  <div className="block">
                    <div>
                      <div
                        className="number"
                        onClick={boothClick.bind(this, a.id)}
                      >
                        <div className="circle">{a.id}</div>
                      </div>
                      <div className="info">
                        <div
                          className="boothname"
                          onClick={boothClick.bind(this, a.id)}
                        >
                          {a.boothname}
                        </div>
                        <div
                          className="boothaddress"
                          onClick={boothClick.bind(this, a.id)}
                        >
                          {a.ac_name}
                        </div>
                        <div className="boothmeta">
                          <a
                            className="purpal"
                            href={"/booth-voters/" + (a.id ? a.id : "0")}
                          >
                            {a.voters} Voters
                          </a>
                          <a
                            className="black"
                            href={"/booth-volunteer/" + (a.id ? a.id : "0")}
                          >
                            {a.karyakarta} Karyakarta
                          </a>
                          <div className="green">{a.target} Visited</div>
                        </div>
                      </div>
                    </div>

                    <div className="btn-options">
                      <div
                        className={classy({
                          "drop-down": true,
                          open: menuopen == i,
                        })}
                      >
                        <div
                          className="backdrop"
                          onClick={() => setMenuopen(-1)}
                        ></div>
                        <a
                          href="javascript:void(0);"
                          className="btn-option"
                          onClick={() => setMenuopen(i)}
                        >
                          <i className="icon-menu"></i>
                        </a>
                        <ul className="drop-down-list filter-options">
                          <li>
                            <Link to={"/booth/" + a.id}>
                              <i className="icon-eye"></i> View
                            </Link>
                          </li>
                          <li>
                            <a onClick={() => {setEditBooth(a); setMenuopen(-1)}}>
                              <i className="icon-edit"></i> Edit
                            </a>
                          </li>
                          <li>
                            <a onClick={() => {setConfirmDelete(a.id); setMenuopen(-1)}}>
                              <i className="icon-trash"></i> Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="booth-search">
            <div className="booth-search-inner">
              <i
                className="icon-search"
                onClick={() => onActionPrimary(false)}
              ></i>
              <div className="left">
                <input
                  type="text"
                  id="txtBoothSearch"
                  placeholder="Search"
                  onChange={(e) => searchAction(e.target.value)}
                  value={filter_text}
                />
              </div>
            </div>
          </div>
          <div className="right-panel">
            <Mapview coordinates={data} zoomlevel={14} selected={selected} />
          </div>
        </div>
      )}

      {primaryOpen ? (
        <Modal onClose={() => onActionPrimary(false)}>
          <AddBooth
            data={null}
            onClose={() => onActionPrimary(false)}
            onSave={()=>{fetchData(); onActionPrimary(false);}}
          />
        </Modal>
      ) : (
        ""
      )}
      {secondaryOpen ? (
        <Modal onClose={() => onActionSecondary(false)}>
          <AddBooths
            data={null}
            onClose={() => onActionSecondary(false)}
            onSave={()=>{fetchData(); onActionSecondary(false);}}
          />
        </Modal>
      ) : (
        ""
      )}

      {(editBooth) ?
					<Modal onClose={()=>setEditBooth(null)}>
						<AddBooths
            record={editBooth}
            onClose={() => setEditBooth(null)}
            onSave={()=>{fetchData(); setEditBooth(null);}}
          />
					</Modal> : ''
				}

      {confirmDelete>0&&<ConfirmBox onConfirm={deleteBooth} onCancel={()=>setConfirmDelete(0)} />}
    </div>
  );
};
