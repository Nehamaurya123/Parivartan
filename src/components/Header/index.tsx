import { FC, useState } from "react";
import classy from "classnames";
import { useAuth } from "../../utility/authProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar";

export const Header: FC<any> = ({ icon, page }) => {
  const [panel, setPanel] = useState(false);
  const {
    logout,
    user,
    onActionPrimary,
    onActionSecondary,
    onActionTertiary,
    title,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const action = "";

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="inner relative">
              <div className="title">
                <span className="ico">
                  <i className={icon}></i>
                </span>
                <span>{title || page}</span>
                {url == "/booths" && action == "" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i> <span>Add Booth</span>
                  </div>
                ) : (
                  ""
                )}
                {url == "/booths" ? (
                  <div
                    className="action"
                    onClick={() => onActionSecondary(true)}
                  >
                    <i className="icon-plus"></i> <span>Upload Booths</span>
                  </div>
                ) : (
                  ""
                )}
                {url === "/mp-assistant" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i> <span>Add New</span>
                  </div>
                ) : (
                  ""
                )}
                

                {url == "/voters" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i> <span>Upload Voters</span>
                  </div>
                ) : (
                  ""
                )}
                {url == "/voters" ? (
                  <div
                    className="action"
                    onClick={() => onActionSecondary(true)}
                  >
                    <i className="icon-plus"></i> <span>Assign Voters</span>
                  </div>
                ) : (
                  ""
                )}
                {url == "/voters" ? (
                  <div
                    className="action"
                    onClick={() => onActionTertiary(true)}
                  >
                    <i className="icon-plus"></i> <span>Add Voter</span>
                  </div>
                ) : (
                  ""
                )}

                {url == "/social-media" && action == "" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i>{" "}
                    <span>Upload Social Media News</span>
                  </div>
                ) : (
                  ""
                )}
                {url == "/social-media-report" && action == "" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i>{" "}
                    <span>Upload Social Media Data</span>
                  </div>
                ) : (
                  ""
                )}

                {url == "/news" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i> <span>Add News/Alert</span>
                  </div>
                ) : (
                  ""
                )}
                {url == "/news" ? (
                  <div
                    className="action"
                    onClick={() => onActionSecondary(true)}
                  >
                    <i className="icon-plus"></i> <span>Add News Master</span>
                  </div>
                ) : (
                  ""
                )}

                {url == "/volunteer" && action == "" ? (
                  <div className="action" onClick={() => onActionPrimary(true)}>
                    <i className="icon-plus"></i> <span>Add New</span>
                  </div>
                ) : (
                  ""
                )}
                {url == "/volunteer" && action == "" ? (
                  <div
                    className="action"
                    onClick={() => onActionSecondary(true)}
                  >
                    <i className="icon-plus"></i> <span>Upload Volunteer</span>
                  </div>
                ) : (
                  ""
                )}
                 {url == '/demographic-report' && action == '' ? (
                  <div className='action' onClick={() => onActionPrimary(true)}>
                    <i className='icon-plus'></i>{' '}
                    <span>Add Demographic Data</span>
                  </div>
                ) : (
                  ''
                )}
        

                

									{((url=="/volunteer" || url=="/voter" || url=="/booth") && action!="")?<div className="title-header" >
										<div className="title-content" id="title-content"></div>
									</div>:""}


									{(url=="/mp-assistant")?<div className="action" onClick={()=>onActionPrimary(true)}>
										<i className="icon-plus"></i> <span>Add New</span>
									</div>:""}
									
								
									
									{(url=="/election-report" && action=="")?<div className="action" onClick={()=>onActionPrimary(true)}>
									<i className="icon-plus"></i> <span>Upload Previous Years Data</span>
									</div>:""}
									{(url=="/election-report" && action=="")?<div className="action" onClick={()=>onActionSecondary(true)}>
									<i className="icon-plus"></i> <span>Upload Leadings Booths Data</span>
									</div>:""}
									
									
									{(url=="/election" && action=="")?<div className="action" onClick={()=>onActionPrimary(this)}>
									<i className="icon-plus"></i> <span>Create Election</span>
									</div>:""}
              </div>

              <ul className="nav">
                <li className="setting">
                  {/* <Link href="javascript:void(0);" onClick={this.goto.bind(this, '/settings')}><i className="icon-gear"></i></Link> */}
                </li>
                {/* <li className="notification">
										<span className="count">99</span>
										<Link href="javascript:void(0);" onClick={this.goto.bind(this, '/notifications')}><i className="icon-bell"></i></Link>
									</li> */}

                <li className="user">
                  <div className={classy({ panel: true, open: panel })}>
                    <a
                      href="javascript:void(0);"
                      className="trigger"
                      onClick={() => setPanel(!panel)}
                    >
                      <div className="user-menu">
                        <Avatar
                          first_name={user.first_name}
                          last_name={user.last_name}
                          image={user.image}
                        />
                        <div className="user-name">
                          {user
                            ? `${user.first_name} ${user.last_name}`
                            : "John Doe"}
                          <i className="icon-angle-down"></i>
                        </div>
                      </div>
                    </a>
                    <div
                      className="overlay"
                      onClick={() => setPanel(!panel)}
                    ></div>
                    <ul className="panel-content">
                      <li className="uinfo">
                        <div className="avatar">
                          <Avatar
                            first_name={user.first_name}
                            last_name={user.last_name}
                            image={user.image}
                          />
                        </div>
                        <p className="px16 weight700 black-color">
                          {user
                            ? `${user.first_name} ${user.last_name}`
                            : "John Doe"}
                        </p>
                        <p className="weight400 grey-color headline">
                          {user ? user.role : "User"}
                        </p>
                      </li>
                      <li className="link weight400">
                        <a
                          href="javascript:void(0);"
                          onClick={() => navigate("/settings")}
                        >
                          <i className="icon-gear"></i> Settings
                        </a>
                      </li>
                      <li className="link weight400">
                        <a
                          href="javascript:void(0);"
                          onClick={() => logout()}
                          className="black-color"
                        >
                          <i className="icon-exit"></i> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
