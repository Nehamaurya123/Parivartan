import { FC, useEffect, useState } from "react";
import "../assets/scss/booths.scss";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import { useParams } from "react-router-dom";
import { _404 } from "../components/error/_404";
import { formatDateMysql } from "../utility/helper";
import { useAuth } from "../utility/authProvider";

export const VoterViewContainer: FC = () => {
  const [loading, setLoading] = useState(false);
  const [voter, setVoter] = useState<any>(null);
  const { id } = useParams();
  const { setTitle } = useAuth();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res: any = await API.get(APIS.VOTER.GET+ id);
    setTitle(res.data.name);
   console.log(res.data.name)
    setLoading(false);
    setVoter(res.data);
  };

  return (
    <div className="dashboard">
      {loading ? (
        <div className="page-loader">
          <img src="/img/loading.gif" />
        </div>
      ) : (
        <div className="height-100">
          {!voter ? (
            <_404 />
          ) : (
            <div className="vv-outer">
              <div className="vl-item-right">
                <div className="vl-right-header">
                  <div className="vl-title">Voter Comments</div>
                </div>
                <div className="vl-right-content">
                  {voter.comments && voter.comments.length > 0 ? (
                    voter.comments.map((data: any, i: number) => {
                      return (
                        <div className="vl-voter" key={i}>
                          <div className="name-outer">
                            <div className="voter-name">
                              {data.user ? (
                                <a href={"/volunteer/" + data.user.id}>
                                  {data.user.first_name +
                                    " " +
                                    data.user.last_name}
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="voter-visit">
                              {data.created_at != ""
                                ? "Visited at: " +
                                  formatDateMysql(data.created_at)
                                : ""}
                            </div>
                          </div>
                          <div className="voter-id">{data.info}</div>
                          {data.remark ? (
                            <div className="voter-comment">{data.remark}</div>
                          ) : (
                            <div className="voter-comment-blank">
                              No Remark Added
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-voter">No Comment Available</div>
                  )}
                </div>
              </div>

              <div className="vl-item-left">
                {voter ? (
                  <div className="clear-table">
                    <div className="tablecontainer">
                      <table className="table">
                        <tr>
                          <th>Name</th>
                          <th>Name in Hindi</th>
                          <th>Voter ID</th>
                        </tr>
                        <tr>
                          <td>{voter.name}</td>
                          <td>{voter.name_hindi}</td>
                          <td>{voter.voter_id}</td>
                        </tr>
                        <tr>
                          <th>{voter.relation}</th>
                          <th>Name in Hindi</th>
                          <th>Family Size</th>
                        </tr>
                        <tr>
                          <td>{voter.r_name}</td>
                          <td>{voter.r_name_hindi}</td>
                          <td>{voter.family_size}</td>
                        </tr>
                        <tr>
                          <th>Gender</th>
                          <th>Religion</th>
                          <th>Caste</th>
                        </tr>
                        <tr>
                          <td>{voter.gender}</td>
                          <td>{voter.religion}</td>
                          <td>{voter.caste}</td>
                        </tr>
                        <tr>
                          <th>Age</th>
                          <th>Voter Type</th>
                          <th>Remark</th>
                        </tr>
                        <tr>
                          <td>{voter.age}</td>
                          <td>{voter.voter_type ? voter.voter_type : "NA"}</td>
                          <td>{voter.remark ? voter.remark : "NA"}</td>
                        </tr>
                        <tr>
                          <th>Important</th>
                          <th colSpan={2}>Address</th>
                        </tr>
                        <tr>
                          <td>{voter.important == 1 ? "Yes" : "No"}</td>
                          <td colSpan={2}>
                            {voter.address ? voter.address : ""}
                          </td>
                        </tr>
                        <tr>
                          <th colSpan={1}>Booth Id</th>
                          <th colSpan={2}>Booth Name</th>
                        </tr>
                        <tr>
                          <td colSpan={1}>
                            {voter.booth ? voter.booth.id : "NA"}
                          </td>
                          <td colSpan={2}>
                            {voter.booth ? (
                              <a href={"/booth/" + voter.booth.id}>
                                {voter.booth.boothname}
                              </a>
                            ) : (
                              "NA"
                            )}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="footer-outer"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
