import { FC, useEffect, useMemo, useState } from "react";
import "../assets/scss/booths.scss";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import classy from "classnames";
import { useAuth } from "../utility/authProvider";
import { Modal } from "../components/Modal";
// import { AddBooth } from "../components/Modals/AddBooth";
import { useParams } from "react-router-dom";
import { _404 } from "../components/error/_404";
import { formatDateMysql } from "../utility/helper";
import Paginate from "../components/Paginate";

export const BoothViewContainer: FC = () => {
  const { primaryOpen, onActionPrimary } = useAuth();
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [booth, setBooth] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [meta, setMeta] = useState<any>({});

  const [page, setPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchComments();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res: any = await API.get(APIS.BOOTH.GET+id);
    setLoading(false);
    if(res.type === "failed"){
      setInvalid(true);
    } else {
      
        setBooth(res.data);
        var name = res.data.boothname;
        // document.getElementById("title-content").innerText = name;
      
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    const res: any = await API.get(APIS.BOOTH.COMMENT+id+"/"+page);
    setLoading(false);
    setComments(res.data);
    setMeta(res.meta);
  }

  const boothClick = async (id: any) => {};

  const paginate = (page: number) => {
    setPage(page);
  };

  // const deleteBooth=(data)=>{
  // 	this.toggleMenu(-1);
  // 	this.setState({confirmData: data,confirmview:true});
  // }

  


  return (
    <div className="dashboard">
				{(loading) ? <div className="page-loader">
					<img src="/img/loading.gif" />
				</div> : <div className="height-100">
						{(invalid) ?<_404 /> :
							<div className="bv-outer">
								<div className="vl-item-right">
									<div className="vl-right-header">
										<div className="vl-title">Voter Comments</div>
									</div>
									<div className="vl-right-content">
										{(comments && comments.length > 0) ? comments.map((data: any) => {
											return (<div className="vl-voter">
												<div className="name-outer">
													<div className="voter-name">{(data.user)?<a href={"/volunteer/"+data.user.id}>{data.user.first_name+" "+data.user.last_name}</a>:""}</div>
													<div className="voter-visit">{(data.created_at != "") ? 'Visited at: ' + formatDateMysql(data.created_at) : ""}</div>
												</div>
												<div className="voter-id">{data.info}</div>
												{(data.remark)?<div className="voter-comment">{data.remark}</div> : <div className="voter-comment-blank">No Remark Added</div>}
											</div>)
										}) : <div className="no-voter">No Comment Available</div>}
										{(meta && meta.total>0)?<Paginate current={meta.page} onClick={paginate} perpage={meta.perpage} count={meta.total} />:''}

									</div>
								</div>

								<div className="vl-item-left">
										{(booth)?<div className="clear-table">
										<div className="tablecontainer">
										<table className="table">
											<tr>
												<th>Booth ID</th>
												<th colSpan={2}>Booth Name</th>
											</tr>
											<tr>
												<td>{booth.id}</td>
												<td colSpan={2}>{booth.boothname}</td>
											</tr>
											<tr>
												<th>Part No.</th>
												<th>Booth Building</th>
												<th>Locality of Polling Station</th>
											</tr>
											<tr>
												<td>{booth.part_no}</td>
												<td>{booth.building_name}</td>
												<td>{booth.locality}</td>
											</tr>
											<tr>
												<th>Area of Polling Station</th>
												<th>PC No.</th>
												<th>PC Name</th>
											</tr>
											<tr>
												<td>{booth.area}</td>
												<td>{booth.pc_no}</td>
												<td>{booth.pc_name}</td>
											</tr>
											<tr>
												<th>AC No.</th>
												<th>AC Name</th>
												<th>District</th>
											</tr>
											<tr>
												<td>{booth.ac_no}</td>
												<td>{booth.ac_name}</td>
												<td>{booth.district}</td>
											</tr>
											<tr>
												<th>Ward</th>
												<th>Latitude</th>
												<th>Longitude</th>
											</tr>
											<tr>
												<td>{booth.ward}</td>
												<td>{booth.latitude}</td>
												<td>{booth.longitude}</td>
											</tr>
											<tr>
												<th>Voters</th>
												<th>Male</th>
												<th>Female</th>
											</tr>
											<tr>
												<td>{booth.voters}</td>
												<td>{booth.voters_male}</td>
												<td>{booth.voters_female}</td>
											</tr>
											<tr>
												<th>Important Voters</th>
												<th>Voter Comments</th>
												<th>Volunteers</th>
											</tr>
											<tr>
												<td>{booth.important}</td>
												<td>{booth.comments}</td>
												<td>{booth.karyakarta.length}</td>
											</tr>

										</table>
										</div>
									</div>
									:''}
									<div className="footer-outer">
										{booth && <a className="view-all" href={"/booth-voters/"+booth.id}>View All Voters</a>}
									</div>
								</div>

							</div>}
					</div>


				}
			</div>
  );
};
