import React, { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import Dropdown from "../components/Dropdown";
import { Modal } from "../components/Modal";
import AddKaryakarta from "../components/Modals/AddKarykrta";
import UploadKaryakarta from "../components/Modals/UploadKarykarta";
import { useAuth } from "../utility/authProvider";
import ConfirmBox from "../components/Confirm";
import { useParams } from "react-router-dom";

const KaryakartaList = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const { primaryOpen, onActionPrimary, setTitle } = useAuth();
  const { secondaryOpen, onActionSecondary } = useAuth();
  const [filterSearch, setFilterSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>();

  const [order, setOrder] = useState("ASC");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState<any>("");
  const [booth, setBooth] = useState({ id: 0, label: "All Booths" });
  const [booths, setBooths] = useState([]);
  const [editData, setEditData] = useState(null);
  const { id } = useParams();

  useEffect(()=>{
    fetchBooths();
  },[type])
  useEffect(() => {
    fetchData();
  }, [booth, order, type, search]);


  const fetchData = async () => {
    setLoading(true);
    const res: any = await API.get(
      APIS.KARYAKARTA.LIST +
        "?order=" +
        order +
        "&booth_id=" +
        booth.id +
        "&search=" +
        search +
        "&type=" +
        type
    );
    setLoading(false);
    setList(res.data);
  };
const fetchBooths = async () => {
    const res: any = await API.get(APIS.KARYAKARTA.BOOTH_LIST);
    setBooths(res.data);
    if (id) {
      const i = res.data.findIndex((b: any) => b.id == id);
      if (i > -1) {
        setTitle(res.data[i].boothname);
        setBooth({ id: parseInt(id), label: res.data[i].boothname });
      }
    }
  };
  
  const searchAction = () => {
    // Handle search action
    if (!searchOpen) {
      setSearchOpen(true);
      return;
    }
    setFilterSearch("");
    setSearchOpen(false);
  };

  const updateFilter = (filter: {
    filter_status?: string;
    filter_sort?: string;
  }) => {
    setFilterStatus(filter?.filter_status ?? "");
  };

  const editKaryakarta =async (data: any) => {
   setEditData(data);
  };

  const switchKaryakarta = async (data: any, status: boolean) => {
    let res: any = await API.post(APIS.KARYAKARTA.SWITCH_KARYAKARTA_STATUS, {
      status: status,
      id: data.id,
    });
    if (res.type === "success") {
      data.status = status;
      fetchData();
    }
  };

  
  const deleteKaryakarta = async () => {
    setConfirmDelete(0);
    await API.delete(APIS.KARYAKARTA.DELETE_KARYAKARTA + confirmDelete);
    fetchData();
  };

  const changeBooth = (id: any, label: string) => {
    // fetchData();
    setBooth({ id, label });
    setTitle(label);
   // setPage(1);
  };

  let sortoptions = [
    {
      callback: () => setOrder("Recent"),
      icon: "",
      label: "Recent",
    },
    {
      callback: () => setOrder("Name"),
      icon: "",
      label: "Name",
    },
  ];
  let boothoptions = [
    {
      id: 0,
      callback: () => changeBooth(0, "All Booths"),
      icon: "",
      label: "All Booths",
    },
  ];
if (booths) {
    for (let i = 0; i < booths.length; i++) {
      let booth: any = booths[i];
      boothoptions.push({
        id: booth.id,
        callback: () => changeBooth(booth.id, booth.boothname),
        icon: "",
        label: booth.boothname,
      });
    }
  }
  let menu = {
    icon: "icon-angle-down",
    label: "Sort"
    
  };
  let menu_booth = { 
    icon: "icon-angle-down",
     label: booth.label 
    };


  return (
    <div className="dashboard">
      <div className="container-fluid nopadding">
        {loading ? (
          <div className="page-loader">
            <img src="/img/loading.gif" alt="Loading" />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className="page-header" style={{ position: "relative" }}>
                  {filterSearch !== "" || searchOpen ? (
                    <div className="search-open">
                      <input
                        type="text"
                        placeholder="Search"
                        id="txtVoluneerSearch"
                        onChange={(e) => setFilterSearch(e.target.value)}
                        value={filterSearch}
                      />
                      <i className="icon-search" onClick={searchAction}></i>
                    </div>
                  ) : (
                    <div className="search" onClick={searchAction}>
                      <i className="icon-search"></i>
                    </div>
                  )}
                  
                  <div className="filter-container">
                    <div
                      className={`filter-item ${
                        type === "All" ? "selected" : ""
                      }`}
                      onClick={() => setType("All")}
                    >
                      All
                    </div>
                    <div
                      className={`filter-item ${
                        type === "Active" ? "selected" : ""
                        
                      }`}
                      onClick={() => setType("Active")}
                    >
                      Active
                    </div>
                    <div
                      className={`filter-item ${
                      type === "Inactive" ? "selected" : ""
                      }`}
                      onClick={() =>
                        setType("Inactive")
                      }
                    >
                      Inactive
                    </div>
                  </div>

                  <div className="dd-container">
                    <div className="dd-box">
                      <Dropdown id="1" options={sortoptions} menu={menu} />
                    </div>
                    <div className="dd-box dd-box-300">
                      <Dropdown id="2" options={boothoptions} menu={menu_booth} />
                      
                    </div>
                  </div>
                </div>
              </div>
              {/* {test perspective} */}
              {}

              {loading ? (
                <div className="page-loader">
                  <img src="/assets/img/loading.gif" />
                </div>
              ) : (
                <div>
                  {list && list?.length > 0 ? (
                    list?.map((data: any) => (
                      <div key={data.id}>
                        <div className="kr-list">
                          <ul className="kr-item">
                            <li>
                              <div className="kr-container">
                                <div className="kr-left">
                                  <Avatar
                                    first_name={data.first_name}
                                    last_name={data.last_name}
                                    image={data.imagepath.thumb}
                                  />
                                </div>
                                <div className="kr-right">
                                  <div className="kr-head">
                                    {data.first_name} {data.last_name}
                                  </div>
                                  <div className="kr-content">
                                    {data.boothname}
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">Hindu</div>
                                <div className="kr-content">
                                  {data.gender}, {data.age}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">{data.mobile}</div>
                                <div className="kr-content">{data.email}</div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">{data.bootharea}</div>
                                <div className="kr-content">
                                  {data.boothlocality}
                                </div>
                              </div>
                            </li>
                            <li className="grey">
                              <div className="kr-container">
                                <div className="kr-head">{data.issues}</div>
                                <div className="kr-content">Issues</div>
                              </div>
                            </li>
                            <li className="grey">
                              <div className="kr-container">
                                <div className="kr-head">{data.feedback}</div>
                                <div className="kr-content">Feedback</div>
                              </div>
                            </li>
                            <li className="grey">
                              <div className="kr-container">
                                <div className="kr-head">{data.visited}</div>
                                <div className="kr-content">Visits</div>
                              </div>
                            </li>
                            <li className="grey">
                              <div className="kr-container">
                                <div className="kr-head">{data.voters}</div>
                                <div className="kr-content">Voters</div>
                              </div>
                            </li>
                            <li className="grey">
                              <div className="kr-container">
                                <div className="actions-list">
                                  <a
                                    className="action action-view tooltip"
                                    data-tooltip="View"
                                    href={"/volunteer/" + data.id}
                                  >
                                    <i className="icon-circle"></i>
                                  </a>
                                  <div
                                    className="action action-edit tooltip"
                                    data-tooltip="Edit"
                                    onClick={() => {
                                      editKaryakarta(data);
                                    }}
                                  >
                                    <i className="icon-edit"></i>
                                  </div>
                                  {data.status ? (
                                    <div
                                      className="action action-switch tooltip"
                                      data-tooltip="Deactivate"
                                      onClick={() =>
                                        switchKaryakarta(data, false)
                                      }
                                    >
                                      <i className="icon-ban"></i>
                                    </div>
                                  ) : (
                                    <div
                                      className="action action-switch tooltip"
                                      data-tooltip="Activate"
                                      onClick={() =>
                                        switchKaryakarta(data, true)
                                      }
                                    >
                                      <i className="icon-check"></i>
                                    </div>
                                  )}
                                  <div
                                    className="action action-delete tooltip"
                                    data-tooltip="Delete"
                                    onClick={() => {
                                      setConfirmDelete(data.id);
                                    }}
                                  >
                                    <i className="icon-trash"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-data text-center">
                      <div className="ico">
                        <i className="icon-info"></i>
                      </div>
                      <p className="px18 weight700">Sorry :</p>
                      <p>There is nothing to show here.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {primaryOpen && (
        <Modal onClose={() => onActionPrimary(false)}>
          <AddKaryakarta
            record={list}
            booths={booths}
            onClose={() => onActionPrimary(false)}
            onSave={() => {
              fetchData();
              onActionPrimary(false);
            }}
          />
        </Modal>
      )}
      {secondaryOpen && (
        <Modal onClose={() => onActionSecondary(null)}>
          <UploadKaryakarta
            record={null}
            booths={booths}
            onClose={() => onActionSecondary(null)}
            onSave={() => {
              fetchData();
              onActionSecondary(null);
            }}
          />
        </Modal>
      )}
      {editData && (
        <Modal onClose={() => setEditData(null)}>
          <AddKaryakarta
            record={editData}
            booths={booths}
            onClose={() => setEditData(null)}
            onSave={() => {
              fetchData();
              setEditData(null);
            }}
          />
        </Modal>
      )}
      {confirmDelete > 0 && (
        <ConfirmBox
          onConfirm={deleteKaryakarta}
          onCancel={() => setConfirmDelete(0)}
        />
      )}
    </div>
  );
};

export default KaryakartaList;
