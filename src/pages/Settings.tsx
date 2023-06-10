import React from 'react'
import { Layout } from '../components/Layout';
import SettingsConntainer from '../container/Settings';

const Settings = () => {
  return (
    <Layout page={'Settings'} icon={'icon-gear'}>
      <SettingsConntainer />
    </Layout>
  );
}

export default Settings