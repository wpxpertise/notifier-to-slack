import React from 'react'
import WCSWidgets from '../Components/Widgets/WCSWidgets';
import WCSFeatured from '../Components/Feature/WCSFeatured';
import WCSChart from '../Components/Charts/WCSChart';
import "./dashboard.scss";
const Dashboard = () => {
  return (
    <div className="wcs_home">
    <div className="wcs_homeContainer">
            <div className="dashboard_active" id='wcs_dashboard'>
                <div className="wcs_dashboard_cls">
                    <div className="wcs_widgets wcs_free" >
                            <WCSWidgets type="total_plugin_update" /> 
                            <WCSWidgets type="lat_active_plugin_name" />
                            <WCSWidgets type="total_deactivaed_plugin" />
                            <WCSWidgets type="todays_who_logged" />
                            <WCSWidgets type="todays_who_out" />
                    </div>
                    <div className="wcs_charts wcs_free">
                            <WCSFeatured />
                            <WCSChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
