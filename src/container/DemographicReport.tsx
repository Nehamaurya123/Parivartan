// DemographicReportContainer

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';
import '../assets/scss/demographicreports.scss';
// import Modal from '../common/modal';
import CustomPieChart from '../components/ElectionChart';
import { Modal } from '../components/Modal';
import UploadDemographicData from '../components/Modals/UploadDemographicData';
import API from '../utility/api';
import { useAuth } from '../utility/authProvider';
import { APIS } from '../utility/constants';
import { composeChart } from '../utility/helper';
// import Dropdown from '../common/dropdown';
// import CustomPieChart from '../common/piechart';
// import UploadDemographicData from './uploaddemographicdata';

const DemographicReportContainer = () =>{
  const [selectedBooth, setSelectedBooth] = useState<any>({
    id: 0,
    label: 'Select Booth',
    booth: false
  });
  const [demographicreports, setDemographicreports] = useState<any>(null)
  const [loading, setLoading] = useState<any>(true);
  const [data, setData] = useState<any>([]);
  const [booths, setBooths] = useState<any>([]);
  const [boothID, setBoothID] = useState<any>();
  const [showPointers, setShowPointers] = useState(false);
   const { primaryOpen, onActionPrimary } = useAuth();


  useEffect(() => {
    fetchBooths();
    getDemographicData(0)
  }, []);

  const fetchBooths =async () => {
    setLoading(true)
    const response = await API.get(APIS.KARYAKARTA.BOOTH_LIST);
    setData(response.data)
    setBooths(response.data);
    // console.log(response.data);
    
    setLoading(false)
  };

      const setValue = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setBoothID(e.target.value !== '' ? parseInt(e.target.value) : null);
      };

  const hideUploadDemographicData = () => {
    // Hide the upload modal
  };

const getDemographicData = async (booth_id:number) => {
  try {
    const response = await API.get(APIS.DEMOGRAPHICREPORT.DATA + booth_id);
    console.log(response.data, 'sdss');
    setDemographicreports(response.data)

    if (response.status === 200) {
      const data = response.data;
      if (data.type === 'success') {
        return data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  

  const changeBooth = (id:number, label:any, booth:any) => {
    setSelectedBooth({ id, label, booth: booth });
    // Get report data based on booth id
  };

  const round = (value:any) => {
    value = parseFloat(value);
    return Math.round(value * 1000000) / 1000000;
  };

  const round2 = (value:any) => {
    value = parseFloat(value + '');
    return Math.round(value * 100) / 100;
  };

  // let boothoptions = [];
  let menu_booth = { icon: 'icon-angle-down', label: selectedBooth.label };
  // if (/* boothlist exists */) {
  //   for (let i = 0; i < /* boothlist length */; i++) {
  //     let booth = /* boothlist[i] */;
  //     boothoptions.push({
  //       id: booth.id,
  //       callback: () => changeBooth(booth.id, booth.boothname, booth),
  //       icon: '',
  //       label: booth.boothname
  //     });
  //   }
  //   if (boothoptions.length > 0)
  //     menu_booth = { icon: 'icon-angle-down', label: boothoptions[0].label };
  // }

  // 

  // let data = /* reports.data */;
    let chartDataGender = null;
    let chartDataAge = null;
    let chartDataReligion = null;
    let chartDataCaste = null;
    
  
  if (demographicreports) {

    var data01: any = [];
    if (demographicreports.voter_gender) {
      demographicreports.voter_gender.map((a: any) => {
        if (a) {
          data01.push({ name: a.name, value: a.count });
        }
      });
    }

    chartDataGender = {
      type: 'single',
      chart: {
        type: 'bar',
        key: 'value',
        color: '#ccc',
        dot: false,
      },
      data: data01,
      tooltip: true,
      axis: {
        x: {
          key: 'name',
        },
        y: {
          tickSize: 2,
        },
      },
    };


     var data02: any = [];
     if (demographicreports.voter_age_band) {
       demographicreports.voter_age_band.map((a: any) => {
         if (a) {
           data02.push({ name: a.bandName, value: a.bandValue });
         }
       });
     }

     chartDataAge = {
       type: 'single',
       chart: {
         type: 'bar',
         key: 'value',
         color: '#sss',
         dot: false,
       },
       data: data02,
       tooltip: true,
       axis: {
         x: {
           key: 'name',
         },
         y: {
           tickSize: 2,
         },
       },
     };

     var data03: any = [];
     if (demographicreports.voter_religion) {
       demographicreports.voter_religion.map((a: any) => {    
        // console.log('dsds', a);
         
         if (a) {
           data03.push({ name: a.name, value: a.count });
         }
       });
     }

     chartDataReligion = {
       type: 'single',
       chart: {
         type: 'bar',
         key: 'value',
         color: 'green',
         dot: false,
       },
       data: data03,
       tooltip: true,
       axis: {
         x: {
           key: 'name',
         },
         y: {
           tickSize: 2,
         },
       },
     };

      var data04: any = [];
      if (demographicreports.voter_caste) {
        demographicreports.voter_caste.map((a:any) => {
          if (a) {
            data04.push({ name: a.caste, value: a.count });
            
          }
        });
      }
  
      chartDataCaste = {
        type: 'single',
        chart: {
          type: 'bar',
          key: 'value',
          color: '#ab0303',
          dot: false,
        },
        data: data04,
        tooltip: true,
        axis: {
          x: {
            key: 'name',
          },
          y: {
            tickSize: 2,
          },
        },
      };

  }
  return (
    <div className='dashboard'>
      {loading && !demographicreports ? (
        <div className='page-loader'>
          <img src='/img/loading.gif' alt='loading' />
        </div>
      ) : (
        <div className='report-demographic'>
          <div className='left-panel'>
            <div className='left-panel-inner'>
              <div className='booth-selection'>
                <div className='heading'>SELECT BOOTH</div>
                <div className='select-title'>
                  {/* <Dropdown id="2" options={boothoptions} menu={menu_booth} /> */}
                  <select
                    className='input-control'
                    name='booth_id'
                    data-validate=''
                    value={boothID !== null ? boothID : ''}
                    onChange={setValue}
                  >
                    <option value=''>Select Booth</option>
                    {booths
                      ? booths.map((a: any, i: number) => {
                          return (
                            <option value={a.id} key={i}>
                              {a.id}-{a.boothname}
                            </option>
                          );
                        })
                      : ''}
                  </select>
                </div>

                <div className='booth-info'>
                  {booths && boothID !== null && boothID >= 0
                    ? 'Name - ' +
                      booths.find((booth: any) => booth.id === boothID)?.ac_name
                    : ''}
                </div>
                <div className='booth-info'>
                  <span>
                    {booths && boothID !== null && boothID >= 0
                      ? 'LONG - ' +
                        round(
                          booths.find((booth: any) => booth.id === boothID)
                            ?.longitude
                        )
                      : ''}
                  </span>
                  <span>
                    {booths && boothID !== null && boothID >= 0
                      ? 'LAT ' +
                        round(
                          booths.find((booth: any) => booth.id === boothID)
                            ?.latitude
                        )
                      : ''}
                  </span>
                </div>
              </div>
              <div className='data-block'>
                <div className='block-1'>
                  <div className='value'>
                    {demographicreports.voter_religion[0].count}
                  </div>
                  <div className='label'>Hindu</div>
                </div>
                <div className='block-2'>
                  <div className='value'>
                    {demographicreports.voter_religion[1].count}
                  </div>
                  <div className='label'>Muslim</div>
                </div>
                <div className='block-3'>
                  <div className='value'>
                    {demographicreports.voter_religion[2].count}
                  </div>
                  <div className='label'>Others</div>
                </div>
              </div>
              <div className='data-block'>
                <div className='block-1'>
                  <div className='value'>
                    {demographicreports.voter_gender[0].count}
                  </div>
                  <div className='label'>Male</div>
                </div>
                <div className='block-2'>
                  <div className='value'>
                    {demographicreports.voter_gender[1].count}
                  </div>
                  <div className='label'>Female</div>
                </div>
                <div className='block-3'>
                  <div className='value'>
                    {demographicreports.voter_gender[2].count}
                  </div>
                  <div className='label'>Others</div>
                </div>
              </div>
            </div>
          </div>
          <div className='right-panel'>
            <div className='heading'>VOTERS</div>
            <div className='voter-graph'>
              <div className='voter-data'>
                <div className='graph-box-content'>
                  <div className='label'>Gender</div>
                  {demographicreports && (
                    <ResponsiveContainer height={250}>
                      {composeChart(chartDataGender)}
                    </ResponsiveContainer>
                  )}
                </div>
                <div className='graph-box-content'>
                  <div className='label'>Age Band</div>
                  {demographicreports.voter_age_band && (
                    <ResponsiveContainer height={250}>
                      {composeChart(chartDataAge)}
                    </ResponsiveContainer>
                  )}
                </div>
                <div className='graph-box-content'>
                  <div className='label'>Religion</div>
                  {demographicreports.voter_religion && (
                    <ResponsiveContainer height={250}>
                      {composeChart(chartDataReligion)}
                    </ResponsiveContainer>
                  )}
                </div>
                <div className='graph-box-content'>
                  <div className='label'>Caste</div>
                  {demographicreports ? (
                    <ResponsiveContainer height={250}>
                      {composeChart(chartDataCaste)}
                    </ResponsiveContainer>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {primaryOpen && (
        <Modal onClose={() => onActionPrimary(false)}>
          <UploadDemographicData
            data={null}
            onClose={() => onActionPrimary(false)}
            onSave={() => {
              fetchBooths();
              onActionPrimary(false);
            }}
          />
        </Modal>
      )}

      {/* <Modal onCloseRequest={hideUploadDemographicData}>
        <UploadDemographicData error={demographicreports.errorMessage} success={demographicreports.successMessage} callback={uploadDemographicData} onClose={hideUploadDemographicData} />
      </Modal> */}
    </div>
  );
}

export default DemographicReportContainer