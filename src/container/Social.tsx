
import React, { useEffect, useState } from 'react';
import API from "../utility/api";
import { APIS } from "../utility/constants";
import "../assets/scss/social.scss";
import { useAuth } from '../utility/authProvider';
import { Modal } from '../components/Modal';
import AddSocialNews from '../components/Modals/AddSocialNews';

const SocialContainer: React.FC = () => {
  const { primaryOpen, onActionPrimary } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getSocialMediaNewsData();
  }, []);

  const getSocialMediaNewsData = async () => {
    try {
      setLoading(true);
      const response = await API.get(APIS.SOCIALMEDIANEWS.SOCIAL_MEDIA_NEWS);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = () => {
    getSocialMediaNewsData();
  };

  return (
    <div className="dashboard">
      {(loading || (!data) || !Array.isArray(data)) ? (
        <div className="page-loader">
          <img src="/img/loading.gif" alt="Loading" />
        </div>
      ) : (
        <div className="social-media-page">
          <div className="page-container">
            <div className="head">
              <div className="heading">TRENDING ON SOCIAL MEDIA</div>
            </div>
            <div className="scroller">
              <div className="social-inner">
                { data.map((news: any, i: any) => {
                  return (
                    <div className="block" key={i}>
                      <div className="block-head">
                        {news.title_avatar && <img src={news.title_avatar} alt="" onError={(e: any) =>{e.target.style.display='none'}} />}
                        <div className="right">
                          <div className="name">{news.title_name}</div>
                          <div className="date">{news.title_date}</div>
                        </div>

                        {news.source === 'facebook' ? (
                          <div className="icon">
                            <i className="icon-facebook"></i>
                          </div>
                        ) : null}

                        {news.source === 'twitter' ? (
                          <div className="icon">
                            <i className="icon-twitter"></i>
                          </div>
                        ) : null}

                        {news.source === '' ? (
                          <div className="icon">
                            <i className="icon-football"></i>
                          </div>
                        ) : null}
                      </div>
                      <div className="content">
                        <div className="text">{news.content}</div>
                        {news.attachment && <div className="image">
                          <img src={news.attachment} alt="Attachment" onError={(e: any) =>{e.target.style.display='none'}} />
                        </div>}
                      </div>
                      <div className="link-info">
                        <div className="website">{news.source}</div>
                      </div>
                      <div className="block-foot">
                        {news.comments ? (
                          <div className="foot-option">
                            <i className="icon-chat"></i> {news.comments}
                          </div>
                        ) : null}
                        {news.shares ? (
                          <div className="foot-option">
                            <i className="icon-retweet"></i> {news.shares}
                          </div>
                        ) : null}
                        {news.shares ? (
                          <div className="foot-option">
                            <i className="icon-heart"></i> {news.likes}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {primaryOpen ? (
        <Modal onClose={() => onActionPrimary(false)}>
          <AddSocialNews
            data={null}
            onClose={() => onActionPrimary(false)}
            onSave={()=>{getSocialMediaNewsData(); onActionPrimary(false);}}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
export default SocialContainer;

