import { FC, useEffect, useMemo, useState } from "react";
import "../assets/scss/booths.scss";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import { useAuth } from "../utility/authProvider";
import { Modal } from "../components/Modal";
import ConfirmBox from "../components/Confirm";
import Paginate from "../components/Paginate";
import Dropdown from "../components/Dropdown";
import { AddVoters } from "../components/Modals/AddVoters";
import { AddVoter } from "../components/Modals/AddVoter";
import { AssignVoters } from "../components/Modals/AssignVoters";
import { useParams } from "react-router-dom";

export const VotersContainer: FC = () => {
  const {
    primaryOpen,
    onActionPrimary,
    secondaryOpen,
    onActionSecondary,
    onActionTertiary,
    tertiaryOpen,
    setTitle
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number>(0);
  const [editBooth, setEditBooth] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [page, setPage] = useState(1);
  const [booth, setBooth] = useState({ id: 0, label: "All Booths" });
  const [booths, setBooths] = useState([]);
  const [is_imp, setIs_imp] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [type, setType] = useState("All");
  const { id } = useParams();
  console.log("id", id);

  useEffect(() => {
    fetchBooths();
  }, []);

  useEffect(() => {
    fetchData();
  }, [booth, page, order, type, is_imp]);

  const fetchData = async () => {
    setLoading(true);
    const res: any = await API.get(
      APIS.VOTER.LIST +
        "?order=" +
        order +
        "&booth_id=" +
        booth.id +
        "&search=" +
        search +
        "&type=" +
        type +
        "&is_imp=" +
        is_imp +
        "&perpage=10&page=" +
        page
    );
    setLoading(false);
    setList(res.data);
    setMeta(res.meta);
    console.log('vot-det', res.data);
    
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

  const paginate = (page: number) => {
    setPage(page);
  };

  const editVoterForm = (data: any) => {
    setEditBooth(data);
  };

  const changeBooth = (id: any, label: string) => {
    setBooth({ id, label });
    setTitle(label);
    setPage(1);
  };

  let sortoptions = [
    {
      callback: () => setOrder("ASC"),
      icon: "",
      label: "Ascending",
    },
    {
      callback: () => setOrder("DESC"),
      icon: "",
      label: "Descending",
    },
  ];
  let typeoptions = [
    {
      callback: () => setType("All"),
      icon: "",
      label: "All Types of Voters",
    },
    {
      callback: () => setType("Positive"),
      icon: "",
      label: "Positive",
    },
    {
      callback: () => setType("Negative"),
      icon: "",
      label: "Negative",
    },
    {
      callback: () => setType("Neutral"),
      icon: "",
      label: "Neutral",
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
    label: order.toLocaleLowerCase() == "desc" ? "Descending" : "Ascending",
  };
  let menu_booth = { 
    icon: "icon-angle-down",
     label: booth.label 
    };
  let menu_type = {
    icon: "icon-angle-down",
    label: type == "All" ? "All Types of Voters" : type,
  };

  const deleteVoter = async () => {
    setConfirmDelete(0);
    await API.delete(APIS.VOTER.DELETE_VOTER + confirmDelete);
    fetchData();
  };

  return (
    <div className="dashboard">
      <div className="container-fluid nopadding">
        <div className="row">
          <div className="col-md-12">
            <div>
              <div className="page-header">
                <div className="search-open">
                  <input
                    type="text"
                    placeholder="Search"
                    id="txtVoterSearch"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <i className="icon-search" onClick={() => fetchData()}></i>
                </div>

                <div className="dd-container">
                  <div className="dd-box dd-box-300 dd-check-con">
                    <input
                      type="checkbox"
                      name="important"
                      value="important"
                      onChange={(e) => setIs_imp(e.target.checked)}
                    />{" "}
                    <span>Important</span>
                  </div>
                  <div className="dd-box dd-box-300">
                    <Dropdown id="3" options={typeoptions} menu={menu_type} />
                  </div>
                  <div className="dd-box">
                    <Dropdown id="1" options={sortoptions} menu={menu} />
                  </div>
                  <div className="dd-box dd-box-300">
                    <Dropdown id="2" options={boothoptions} menu={menu_booth} />
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="page-loader">
                <img src="/img/loading.gif" />
              </div>
            ) : (
              <div>
                {list && list.length > 0 ? (
                  list.map((data: any, i: number) => {
                    return (
                      <div key={i}>
                        <div className="voter-list">
                          <ul className="kr-item">
                            <li>
                              <div className="sequence-outer">
                                <div className="sequence">
                                  {data.sequence ? data.sequence : 0}
                                </div>
                              </div>
                              <div
                                className="kr-container tooltip"
                                data-tooltip={
                                  "pc_no: " +
                                  data.pc_no +
                                  " ac_no: " +
                                  data.ac_no +
                                  " part_no: " +
                                  data.part_no +
                                  " section_no: " +
                                  data.section_no
                                }
                              >
                                <div className="kr-head">{data.name}</div>
                                <div className="kr-content">
                                  {data.name_hindi}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">{data.gender}</div>
                                <div className="kr-content">
                                  Age: {data.age}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">{data.relation}</div>
                                <div className="kr-content">{data.r_name}</div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">Voter ID</div>
                                <div className="kr-content">
                                  {data.voter_id}
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="kr-container">
                                <div className="kr-head">{data.caste}</div>
                                <div className="kr-content">
                                  {data.religion}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container">
                                <div className="kr-head">
                                  Family: {data.family_size}
                                </div>
                                <div className="kr-content">
                                  Address: {data.address}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="kr-container grey">
                                <div className="kr-head">
                                  Booth: {data.booth_id}
                                </div>
                                <div className="kr-content">
                                  Created: {data.created_at}
                                </div>
                              </div>
                            </li>
                            <li className="grey">
                              <div className="kr-container">
                                <div className="actions-list">
                                  <a
                                    className="action action-view"
                                    data-tooltip="View"
                                    href={"/voter/" + data.id}
                                  >
                                    <i className="icon-circle"></i>
                                  </a>
                                  <div
                                    className="action action-edit"
                                    data-tooltip="Edit"
                                    onClick={editVoterForm.bind(this, data)}
                                  >
                                    <i className="icon-edit"></i>
                                  </div>
                                  <div
                                    className="action action-delete"
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
                    );
                  })
                ) : (
                  <div className="no-data text-center">
                    <div className="ico">
                      <i className="icon-info"></i>
                    </div>
                    <p className="px18 weight700">Sorry :(</p>
                    <p>There is nothing to show here.</p>
                  </div>
                )}

                {primaryOpen && (
                  <Modal onClose={() => onActionPrimary(false)}>
                    <AddVoters
                      data={null}
                      onClose={() => onActionPrimary(false)}
                      onSave={() => {
                        fetchData();
                        onActionPrimary(false);
                      }}
                    />
                  </Modal>
                )}

                {tertiaryOpen && (
                  <Modal onClose={() => onActionTertiary(false)}>
                    <AddVoter
                      record={null}
                      booths={booths}
                      onClose={() => onActionTertiary(false)}
                      onSave={() => {
                        fetchData();
                        onActionTertiary(false);
                      }}
                    />
                  </Modal>
                )}
                {editBooth && (
                  <Modal onClose={() => setEditBooth(null)}>
                    <AddVoter
                      record={editBooth}
                      booths={booths}
                      onClose={() => setEditBooth(null)}
                      onSave={() => {
                        fetchData();
                        setEditBooth(null);
                      }}
                    />
                  </Modal>
                )}

                {secondaryOpen && (
                  <Modal onClose={() => onActionSecondary(false)}>
                    <AssignVoters
                      onClose={() => onActionSecondary(false)}
                      onSave={() => {
                        fetchData();
                        onActionSecondary(false);
                      }}
                    />
                  </Modal>
                )}
              </div>
            )}
            {meta && meta.total > 0 ? (
              <Paginate
                current={meta.page}
                onClick={paginate}
                perpage={meta.perpage}
                count={meta.total}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {confirmDelete > 0 && (
        <ConfirmBox
          onConfirm={deleteVoter}
          onCancel={() => setConfirmDelete(0)}
        />
      )}
    </div>
  );
};
