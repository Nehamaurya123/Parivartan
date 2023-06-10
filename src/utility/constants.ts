
import { Config } from '../Config';
export const ROUTES = {
  LOGIN: '/auth/login',
  DASHBOARD: '/',
  BOOTH: '/booths',
  BOOTH_VIEW: '/booth/:id',
  MPASSISTANT: '/mp-assistant',
  SOCIAL: '/social-media',
  VOTERS: '/voters',
  VOTERS_BOOTH: '/booth-voters/:id',
  VOTER_VIEW: '/voter/:id',
  SOCIALMEDIAREPORT: '/social-media-report',
  ELECTION: '/election',
  KARYAKARTALIST: '/volunteer',
  KARYAKARTA_VIEW:'/volunteer/:id',
  NEWS:'/news',
  REPORTS: '/reports',
  ELECTION_REPORT: '/election-report',
  DEMOGRAPHIC_REPORT: '/demographic-report',
  SETTINGS: '/settings'
};
export const APIS = {
  AUTH: {
    LOGIN: `${Config.API_BASE}/auth/login`,
    SETTING: `${Config.API_BASE}/auth/getsetting`,
    SAVE_SETTING: `${Config.API_BASE}/auth/savesetting`,
    DELETE_ALL: `${Config.API_BASE}/auth/deleteall`,
  },
  PASSWORD: {
    RESET: `${Config.API_BASE}/password/reset`,
  },
  UPLOAD: {
    FILE: `${Config.API_BASE}/upload/file`,
    IMAGE: `${Config.API_BASE}/upload/image/post/700`,
  },
  USER: {
    LIST: `${Config.API_BASE}/user`,
  },

  KARYAKARTA: {
    LIST: `${Config.API_BASE}/karyakarta/getkaryakarta`,
    BOOTH_LIST: `${Config.API_BASE}/karyakarta/getboothlist`,
    SAVE_KARYAKARTA: `${Config.API_BASE}/karyakarta/savekaryakarta`,
    UPLOAD_KARYAKARTA: `${Config.API_BASE}/karyakarta/uploadkaryakarta`,
    DELETE_KARYAKARTA: `${Config.API_BASE}/karyakarta/deletekaryakarta/`,
    SWITCH_KARYAKARTA_STATUS: `${Config.API_BASE}/karyakarta/switchkaryakarta/`,
    GET_KARYAKARTA_VOTERS: `${Config.API_BASE}/karyakarta/getkaryakartavoters/`,
    GET_KARYAKARTA_VISITS: `${Config.API_BASE}/karyakarta/visits/`,
    GET_KARYAKARTA_TRAVEL: `${Config.API_BASE}/karyakarta/activity/`,
  },
  
  ASSISTANT: {
    LIST: `${Config.API_BASE}/karyakarta/getassistant`,
    SAVE_ASSISTANT: `${Config.API_BASE}/karyakarta/saveassistant`,
    DELETE_ASSISTANT: `${Config.API_BASE}/karyakarta/deleteassistant/`,
  },
  ELECTION: {
    SAVE_ELECTION: `${Config.API_BASE}/election/createelection`,
  },
  DASHBOARD: {
    DATA: `${Config.API_BASE}/dashboard/`,
  },
  REPORT: {
    DATA: `${Config.API_BASE}/report/getreport/`,
  },
  DEMOGRAPHICREPORT: {
    DATA: `${Config.API_BASE}/demographic/getdemographicreport/`,
    UPLOAD_DEMOGRAPHIC_DATA: `${Config.API_BASE}/demographic/upload/`,
  },
  ELECTIONCREPORT: {
    ELECTIONDATA: `${Config.API_BASE}/demographic/getlastyearsdata/`,
    ELECTIONDATAYEARS: `${Config.API_BASE}/demographic/getlastyearsdatayears/`,
    BOOTHDATA: `${Config.API_BASE}/demographic/getleadvotes/`,
    UPLOAD_PREVIOUS_YEARS_DATA: `${Config.API_BASE}/demographic/uploadlastyearsdata/`,
    UPLOAD_LEADING_BOOTHS_DATA: `${Config.API_BASE}/demographic/uploadleadvotes/`,
    BOOTHDATAYEARS: `${Config.API_BASE}/demographic/getleadvotesyears/`,
  },
  SOCIALMEDIAREPORT: {
    SOCIAMEDIADATA: `${Config.API_BASE}/socialmedia/getsocialmediadata/`,
    UPLOAD_SOCIAL_MEDIA_DATA: `${Config.API_BASE}/socialmedia/uploadsocialmediadata/`,
  },

  SOCIALMEDIANEWS: {
    SOCIAL_MEDIA_NEWS: `${Config.API_BASE}/socialmedianews/getsocialmedianews/`,
    UPLOAD_SOCIAL_MEDIA_NEWS: `${Config.API_BASE}/socialmedianews/uploadsocialmedianews/`,
  },
  BOOTH: {
    DATA: `${Config.API_BASE}/booth/getbooths/`,
    GET: `${Config.API_BASE}/booth/getbooth/`,
    COMMENT: `${Config.API_BASE}/booth/getboothcomments/`,
    SAVE_BOOTHS: `${Config.API_BASE}/booth/uploadboothlist`,
    SAVE_NEW_BOOTH: `${Config.API_BASE}/booth/addbooth`,
    DELETE_BOOTH: `${Config.API_BASE}/booth/deletebooth/`,
  },
  VOTER: {
    LIST: `${Config.API_BASE}/voter/getvoterlist`,
    GET: `${Config.API_BASE}/voter/getvoter/`,
    BOOTH_LIST: `${Config.API_BASE}/karyakarta/getboothlist`,
    SAVE_VOTER: `${Config.API_BASE}/voter/uploadvoterlist`,
    SAVE_VOTER_FORM: `${Config.API_BASE}/voter/savevoter`,
    ASSIGN_VOTER: `${Config.API_BASE}/voter/assignvoterlist`,
    DELETE_VOTER: `${Config.API_BASE}/voter/deletevoter/`,
  },
  NEWS: {
    LIST: `${Config.API_BASE}/news/getappnewslist`,
    MASTER: `${Config.API_BASE}/news/getmasternewslist`,
    BOOTH_LIST: `${Config.API_BASE}/karyakarta/getboothlist`,
    SAVE_NEWS: `${Config.API_BASE}/news/savenewsalert`,
    UPLOAD_NEWS: `${Config.API_BASE}/news/uploadnewslist`,
    PUBLISH_NEWS: `${Config.API_BASE}/news/publishnews`,

    DELETE_NEWS: `${Config.API_BASE}/news/deletenews/`
  }
}
export const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
export const COLOURS = ['#FF4500','#2E8B57','#7FFF00','#FF8C00','#800080','#FF00FF','#006400','#FF0000',
                        '#7FFFD4','#4682B4','#B0C4DE','#FFFF00','#B22222','#87CEFA','#32CD32','#00008B',
                        '#5F9EA0','#F4A460','#2E8B57','#008B8B','#A0522D','#708090','#2E8B57','#90EE90',
                        '#66CDAA','#2F4F4F','#FF6347','#DA70D6','#FFD700','#556B2F','#FF0000','#4169E1',];


