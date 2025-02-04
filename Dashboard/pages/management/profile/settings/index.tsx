import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import ArtactividadContainer from '../../../containers/ArtactividadContainer';

function ManagementUserSettings() {
  return (
    <>
      <div style={{padding:"3em"}} className='conatainer-art'>
        <ArtactividadContainer />
      </div>
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
