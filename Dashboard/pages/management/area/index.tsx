import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import AreaContainer from 'pages/containers/AreaContainer';

function ManagementUserSettings() {
    return (
        <>
            <div style={{ padding: "3em" }}>
                <AreaContainer/>
            </div>
        </>
    );
}

ManagementUserSettings.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
