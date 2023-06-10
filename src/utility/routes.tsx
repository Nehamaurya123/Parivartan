
import React, { FC } from 'react';
import AuthProvider from './authProvider';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/auth/Login';
import { ROUTES } from './constants';
import '../assets/scss/main.scss';
import { DashboardPage } from "../pages/Dashboard";
import { BoothPage } from "../pages/Booth";
import { SocialPage } from "../pages/Social";
import { SocialmediareportPage } from "../pages/Socialmediareport";
import { KaryakartaListPage } from '../pages/KaryakartaList';
import { ElectionPage } from '../pages/Election';
import { MPAssistantPage } from '../pages/Mpassistant';
import { ReportsPage } from '../pages/Reports';
import { NewsPage } from '../pages/News';
import { VotersPage } from '../pages/Voters';
import { VoterViewPage } from '../pages/VoterView';
import { KaryaKartaViewPage } from '../pages/KaryKartaListView';
import { DemographicReport } from '../pages/DemographicReport';
import { ElectionReport } from '../pages/ElectionReport';
import Settings from '../pages/Settings';
import { BoothViewPage } from '../pages/BoothView';
export type RouterProps = {};

const Router: FC<RouterProps> = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.BOOTH} element={<BoothPage />} />
        <Route path={ROUTES.BOOTH_VIEW} element={<BoothViewPage />} />
        <Route path={ROUTES.SOCIAL} element={<SocialPage />} />
        <Route
          path={ROUTES.SOCIALMEDIAREPORT}
          element={<SocialmediareportPage />}
        />
        <Route path={ROUTES.KARYAKARTALIST} element={<KaryakartaListPage />} />
        <Route path={ROUTES.MPASSISTANT} element={<MPAssistantPage />} />
        <Route path={ROUTES.ELECTION} element={<ElectionPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.NEWS} element={<NewsPage />} />
        <Route path={ROUTES.VOTERS} element={<VotersPage/>}/>
        <Route path={ROUTES.VOTERS_BOOTH} element={<VotersPage/>}/>
        <Route path={ROUTES.VOTER_VIEW} element={<VoterViewPage/>}/>
        <Route path={ROUTES.KARYAKARTA_VIEW} element={<KaryaKartaViewPage/>}/>
        <Route path={ROUTES.ELECTION_REPORT} element={<ElectionReport />} />
        <Route
          path={ROUTES.DEMOGRAPHIC_REPORT}
          element={<DemographicReport />}
        />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
