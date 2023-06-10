
import { FC, useEffect, useMemo, useState } from "react";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import { useAuth } from "../utility/authProvider";
import { Modal } from "../components/Modal";
import { formatDateMysql } from "../utility/helper";
import { ViewNews } from "../components/Modals/viewNews";
import { AddAlert } from "../components/Modals/AddAlert";
import ConfirmBox from "../components/Confirm";
import { AddNewsMaster } from "../components/Modals/AddNewsMaster";

export const NewsContainer: FC = () => {
  const { primaryOpen, onActionPrimary, secondaryOpen, onActionSecondary } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [news, setNews] = useState<any>([]);
  const [selectedBooth, setSelectedBooth] = useState<any>(0);
  const [selectedOrder, setSelectedOrder] = useState<any>("DESC");
  const [booths, setBooths] = useState<any>([]);
  const [newsMaster, setNewsMaster] = useState<any>([]);
  const [newsMasterMeta, setNewsMasterMeta] = useState<any>(null);
  const [viewNews, setViewNews] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number>(0);

  useEffect(() => {
    fetchData(selectedBooth, selectedOrder);
    fetchBooths();
    fetchMewsMaster("DESC");
  }, []);

  const fetchData = async (booth_id: any, order: any, loader=true) => {
    setLoading(loader);
    const res: any = await API.get(
      APIS.NEWS.LIST + "?order=" + order + "&booth_id=" + booth_id
    );
    setLoading(false);
    setNews(res.data);
    setMeta(res.meta);
  };

  const fetchBooths = async () => {
    setLoading(true);
    const res: any = await API.get(APIS.KARYAKARTA.BOOTH_LIST);
    setLoading(false);
    setBooths(res.data);
  };

  const fetchMewsMaster = async (order: any) => {
    setLoading(true);
    const res: any = await API.get(APIS.NEWS.MASTER + "?order=" + order);
    setLoading(false);
    setNewsMaster(res.data);
    setNewsMasterMeta(res.meta);
  };  

  const showNews = (data: any) => {
    setViewNews(data);
  };
  const deleteNews = async () => {
    await API.delete(APIS.NEWS.DELETE_NEWS+confirmDelete);
    setConfirmDelete(0);
  	fetchData(selectedBooth, selectedOrder, false);
  };

  const publishNews = async (data: any) => {
    setViewNews(null);
    const res: any = await API.post(APIS.NEWS.PUBLISH_NEWS, data);
    if (res.type === "success") {
      fetchData(0, "DESC");
    }
  };

  return (
    <div className="dashboard">
      {loading ? (
        <div className="page-loader">
          <img src="/img/loading.gif" />
        </div>
      ) : (
        <div className="news">
          <div className="left-panel">
            <div>
              <div className="left-panel-inner">
                <div className="section-header">
                  <div className="heading">FOR YOU</div>
                  {/* <a href="#" className="heading">VIEW ALL</a> */}
                </div>
                <div className="news-inner">
                  <div className="row">
                    {newsMaster && newsMaster.length > 0
                      ? newsMaster.map((data: any, index: number) => {
                          return (
                            <div className="col-md-6" key={index}>
                              <div
                                className="db-news"
                                onClick={showNews.bind(this, data)}
                              >
                                <div className="news-block">
                                  <div className="block-head">
                                    <div className="date">
                                      {formatDateMysql(data.newsdate)}
                                    </div>
                                    {data.publisher == "ndtv" ? (
                                      <img
                                        className="logo"
                                        src="/img/ndtv-logo_70.jpg"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="heading">{data.title}</div>
                                  <div className="content">{data.content}</div>
                                  <div className="social">
                                    <div className="social-item">
                                      <i className="icon-facebook"></i>{" "}
                                      {data.facebook}
                                    </div>
                                    <div className="social-item">
                                      <i className="icon-twitter"></i>{" "}
                                      {data.twitter}
                                    </div>
                                    <div className="social-item">
                                      <i className="icon-google"></i>{" "}
                                      {data.google}
                                    </div>
                                  </div>
                                  <div className="action">
                                    <i className="icon-forward"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
                {false ? (
                  <div>
                    <div className="section-header">
                      <div className="heading">TRENDING ON MEDIA</div>
                    </div>
                    <div className="news-inner">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="db-news">
                            <div className="news-block">
                              <div className="block-head">
                                <div className="date">
                                  AUGUST 08, 2018 23:57
                                </div>
                                <img
                                  className="logo"
                                  src="/img/ndtv-logo_70.jpg"
                                />
                              </div>
                              <div className="heading">
                                Rahul Gandhi Cancels Delhi Meeting to Attend
                                Karunanidhi's Funeral
                              </div>
                              <div className="content">
                                Senior congress leader from maharastra including
                                state unit precident Ashok Chawan, Leader of
                                congress has been reachead there.
                              </div>
                              <div className="social">
                                <div className="social-item">
                                  <i className="icon-facebook"></i> 150K
                                </div>
                                <div className="social-item">
                                  <i className="icon-twitter"></i> 150K
                                </div>
                                <div className="social-item">
                                  <i className="icon-google"></i> 150K
                                </div>
                              </div>
                              <div className="action">
                                <i className="icon-forward"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="right-panel">
            <div className="section-header">
              <div className="heading">
                PUBLISHED TO APP({meta?.total || 0})
              </div>
              {/* <a href="#" className="heading">VIEW ALL</a> */}
            </div>
            <div className="news-inner">
              <div className="row">
                {news && news.length > 0
                  ? news.map((data: any, index: number) => {
                      return (
                        <div className="col-md-12" key={index}>
                          <div className="db-news">
                            <div className="news-block">
                              <div>
                                {data.post_type == "alert" ? (
                                  <div className="alert">
                                    <div className="alert-box">ALRERT</div>{" "}
                                    {data.title}
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="block-head">
                                  <div>
                                    <div className="date">
                                      {formatDateMysql(data.created_at)}
                                    </div>
                                    {data.publisher == "ndtv" ? (
                                      <img
                                        className="logo"
                                        src="/img/ndtv-logo_70.jpg"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="booth-name">
                                    Booth:{" "}
                                    {data.booth ? data.booth.boothname : "All"}
                                  </div>
                                </div>
                                <div
                                  className="button-delete"
                                  onClick={()=>setConfirmDelete(data.id)}
                                >
                                  <i className="icon-trash"></i>
                                </div>
                              </div>

                              {data.post_type == "news" ? (
                                <div className="heading">{data.title}</div>
                              ) : (
                                ""
                              )}
                              {data.files && data.files.length > 0
                                ? data.files.map((file: any, index: number) => {
                                    var filepath = file.imagepath.path;
                                    var extension = filepath.split(".").pop();
                                    return (
                                      <div className="news-image" key={index}>
                                        {extension == "jpeg" ||
                                        extension == "jpg" ||
                                        extension == "png" ||
                                        extension == "gif" ? (
                                          <img src={filepath} />
                                        ) : (
                                          <div>
                                            <a href={filepath}>
                                              {file.real_name}
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })
                                : ""}

                              <div className="content">{data.text}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewNews && (
        <Modal onCancel={() => setViewNews(null)}>
          <ViewNews
            data={viewNews}
            booths={booths}
            onClose={() => setViewNews(null)}
            onPublish={publishNews}
          />
        </Modal>
      )}

      {primaryOpen && (
        <Modal onCancel={() => onActionPrimary(false)}>
          <AddAlert
            record={null}
            booths={booths}
            onSave={() => {
              onActionPrimary(false);
              fetchData(0, "DESC");
            }}
            onClose={() => onActionPrimary(false)}
          />
        </Modal>
      )}

      {secondaryOpen && (
        <Modal onCancel={() => onActionSecondary(false)}>
          <AddNewsMaster
            onSave={() => {
              onActionSecondary(false);
              fetchMewsMaster("DESC");
            }}
            onClose={() => onActionSecondary(false)}
          ></AddNewsMaster>
        </Modal>
      )}
      {confirmDelete>0&&<ConfirmBox onConfirm={deleteNews} onCancel={()=>setConfirmDelete(0)} />}
    </div>
  );
};