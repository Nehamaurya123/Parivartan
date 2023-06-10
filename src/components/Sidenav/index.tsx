import { FC } from "react";
import classy from 'classnames';

export const Sidenav: FC<any> = ({ page}) => {

  return (
    <div className="side-nav">
        <div className="inner">
          <div className="brand"></div>
          <ul className="nav">
            <li className={classy({active: page === '',tooltip:true})} data-tooltip="Dashboard">
              <a href="/"><i className="icon-spedometer"></i></a>
              <span className="line"></span>
            </li>
            <li className={classy({active: page === 'Reports',tooltip:true})}  data-tooltip="Reports">
              <a href="/reports"><i className="icon-chart-bar"></i></a>
              <span className="line"></span>
            </li>

            {/* <li className={classy({active: page === 'Tokens' ,tooltip:true})}>
              <a href=""><i className="icon-todo"></i></a>
              <span className="line"></span>
            </li> */}
            <li className={classy({active: page === 'News' ,tooltip:true})} data-tooltip="News">
              <span className="count"></span>
              <a href="/news"><i className="icon-news"></i></a>
              <span className="line"></span>
            </li>
            <li className={classy({active: page === 'Social-Media' ,tooltip:true})} data-tooltip="Social Media">
              <a href="/social-media"><i className="icon-social"></i></a>
              <span className="line"></span>
            </li>
            <li className={classy({active: page === 'Booths' ,tooltip:true})} data-tooltip="Booths">
              <a href="/booths"><i className="icon-box"></i></a>
              <span className="line"></span>
            </li>
            <li className={classy({active: page === 'Voters' ,tooltip:true})} data-tooltip="Voters">
              <a href="/voters"><i className="icon-blocks"></i></a>
              <span className="line"></span>
            </li>
            <li className={classy({active: page === 'MP-Assistant' ,tooltip:true})} data-tooltip="MP Assistant">
              <a href="/mp-assistant"><i className="icon-user"></i></a>
              <span className="line"></span>
            </li>
            <li className={classy({active: page === 'Volunteer',tooltip:true})} data-tooltip="Volunteer">
              <a href="/volunteer"><i className="icon-user-both"></i></a>
              <span className="line"></span>
            </li>

            <li className={classy({active: page === 'Demograpic-Report',tooltip:true})} data-tooltip="Demograpic Report">
              <a href="/demographic-report"><i className="icon-globe"></i></a>
              <span className="line"></span>
            </li>

            <li className={classy({active: page === 'Election-Report',tooltip:true})} data-tooltip="Election Report">
              <a href="/election-report"><i className="icon-chart-pie"></i></a>
              <span className="line"></span>
            </li>

            <li className={classy({active: page === 'Social-Media-Report',tooltip:true})} data-tooltip="Social Media Report">
              <a href="/social-media-report"><i className="icon-user-both"></i></a>
              <span className="line"></span>
            </li>
            

            <li className={classy({active: page === 'Election',tooltip:true})} data-tooltip="Election">
              <a href="/election"><i className="icon-user-both"></i></a>
              <span className="line"></span>
            </li>
            
          </ul>
        </div>
      </div>
  );
};
