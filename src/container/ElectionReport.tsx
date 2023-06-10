import { useState, useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';
import loading_gif from '../assets/img/loading.gif';

import { Modal } from '../components/Modal';
import UploadLeadingBoothsData from '../components/Modals/UploadLeadingBoothsData';
import UploadPreviousYearData from '../components/Modals/UploadPreviousYearData';
import { useAuth } from '../utility/authProvider';
import '../assets/scss/electionreports.scss';
import API from '../utility/api';
import { APIS } from '../utility/constants';
import CustomPieChart from '../components/ElectionChart';
import Dropdown from '../components/Dropdown';
// import CustomPieChart from '../common/piechart';

const ElectionReportContainer = () => {
  const [electionReports, setElectionReports] = useState<any>([]);
  const [electionBooths, setElectionBooths] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [selectedYearElection, setSelectedYearElection] = useState({
    label: 'Select Year',
    year: null,
  });
  const [selectedYearBooth, setSelectedYearBooth] = useState({
    label: 'Select Year',
    year: null,
  });

  const [dataElection, setDataElection] = useState(null);
  const [dataBooth, setDataBooth] = useState(null);
  const [uploadModalOpenPY, setUploadModalOpenPY] = useState(false);
  const [uploadModalOpenLV, setUploadModalOpenLV] = useState(false);
  const [errorMessagePY, setErrorMessagePY] = useState('');
  const [successMessagePY, setSuccessMessagePY] = useState('');
  const [errorMessageLV, setErrorMessageLV] = useState('');
  const [successMessageLV, setSuccessMessageLV] = useState('');
  const { primaryOpen, onActionPrimary, secondaryOpen, onActionSecondary } =
    useAuth();

  useEffect(() => {
    fetchYearsElection();
    fetchYearsBooth();
    getElectionReportData('2013');
    getBoothReportData('2013');
  }, []);

  const fetchYearsElection = async () => {
    setLoading(true);
    const res = await API.get(APIS.ELECTIONCREPORT.ELECTIONDATAYEARS);
    setLoading(false);
    setElectionReports(res.data);
    console.log(res.data, 'GET Election-reports');
  };

  const fetchYearsBooth = async () => {
    setLoading(true);
    const res = await API.get(APIS.ELECTIONCREPORT.BOOTHDATAYEARS);
    setLoading(false);
    console.log(res.data, 'GET Elections-Booth');
  };

  const getElectionReportData = async (year: any) => {
    setLoading(true);
    const res = await API.get(APIS.ELECTIONCREPORT.ELECTIONDATA + year);
    setLoading(false);
    setElectionReports(res);
    console.log(res.data, 'GET election report data');
  };

  const getBoothReportData = async (year: any) => {
    setLoading(true);
    const res = await API.get(APIS.ELECTIONCREPORT.BOOTHDATA + year);
    setLoading(false);
    console.log(res.data, 'GET election booth data');
  };

  const hideUploadPreviousYearsData = () => {
    setUploadModalOpenPY(false);
  };

  const uploadPreviousYearsData = (data: any) => {};

  const hideUploadLeadingBoothsData = () => {
    setUploadModalOpenLV(false);
  };

  const uploadLeadingBoothsData = (data: any) => {};

  const changeYearElection = (label: any, year: any) => {
    setSelectedYearElection({ label, year });
    getElectionReportData(label);
  };

  const changeYearBooth = (label: any, year: any) => {
    setSelectedYearBooth({ label, year });
    getBoothReportData(label);
  };

  let yearOptionSelection: any = [];
  console.log(yearOptionSelection, 'yearOptionSelection');

  let menuElection = {
    icon: 'icon-angle-down',
    label: selectedYearElection.label,
  };

  if (electionReports.yearlistElection) {
    for (let i = 0; i < electionReports.yearlistElection.length; i++) {
      let yearData = electionReports.yearlistElection[i];
      yearOptionSelection.push({
        callback: () => changeYearElection(yearData.year, yearData),
        icon: '',
        label: yearData.year,
      });
    }
    if (yearOptionSelection.length > 0) {
      menuElection = {
        icon: 'icon-angle-down',
        label: yearOptionSelection[0].label,
      };
    }
  }

  let yearOptionsBooth = [];
  let menuBooth = { icon: 'icon-angle-down', label: selectedYearBooth.label };

  if (electionReports.yearlistBooth) {
    for (let i = 0; i < electionReports.yearlistBooth.length; i++) {
      let yearData = electionReports.yearlistBooth[i];
      yearOptionsBooth.push({
        callback: () => changeYearBooth(yearData.year, yearData),
        icon: '',
        label: yearData.year,
      });
    }
    if (yearOptionsBooth.length > 0) {
      menuBooth = { icon: 'icon-angle-down', label: yearOptionsBooth[0].label };
    }
  }

  return (
    <div className='dashboard'>
      <div className='report-election'>
        {loading ? (
          <div className='page-loader'>
            <img src={loading_gif} alt='img' />
          </div>
        ) : (
          <div className='graph-box-content'>
            <div className='left-panel-inner'>
              <div className='booth-selection'>
                <div className='heading-panel'>PREVIOUS YEARS DATA</div>
                <div className='heading'>SELECT YEAR</div>
                <div className='select-title'>
                  <Dropdown
                    id='1'
                    options={yearOptionSelection}
                    menu={menuElection}
                  />
                </div>
              </div>
              <div className='voter-graph'>
                <div className='voter-data'>
                  {dataElection &&
                    Object.keys(dataElection).map((year) => (
                      <div className='graph-box-content'>
                        <div className='label'>{year}</div>
                        <CustomPieChart
                          data={electionReports.dataElection[year]}
                          nameKey='candidate'
                          dataKey='votes'
                          top={150}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <div className='page-loader'>
            <img src={loading_gif} alt='img' />
          </div>
        ) : (
          <div className='graph-box-content'>
            <div className='left-panel-inner'>
              <div className='booth-selection'>
                <div className='heading-panel'>LEADING BOOTHS</div>
                <div className='heading'>SELECT YEAR</div>
                <div className='select-title'>
                  <Dropdown options={yearOptionsBooth} menu={menuBooth} />
                </div>
              </div>
              <div className='voter-graph'>
                <div className='voter-data'>
                  {dataBooth &&
                    Object.keys(dataBooth).map((year) => (
                      <div className='graph-box-content'>
                        <div className='label'>{year}</div>
                        <CustomPieChart
                          data={dataBooth[year]}
                          nameKey='candidate'
                          dataKey='lead_votes'
                          top={150}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {primaryOpen && (
        <Modal onClose={() => onActionPrimary(false)}>
          <UploadPreviousYearData
            error={errorMessagePY}
            success={successMessagePY}
            callback={uploadPreviousYearsData}
            onClose={() => onActionPrimary(false)}
          />
        </Modal>
      )}
      {secondaryOpen && (
        <Modal onClose={() => onActionSecondary(false)}>
          <UploadLeadingBoothsData
            error={errorMessageLV}
            success={successMessageLV}
            callback={uploadLeadingBoothsData}
            onClose={() => onActionSecondary(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ElectionReportContainer;
