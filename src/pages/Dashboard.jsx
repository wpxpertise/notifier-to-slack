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
                            <WCSWidgets type="total_staffs" /> 
                            <WCSWidgets type="total_users" />
                            <WCSWidgets type="total_ticket_close" />
                            <WCSWidgets type="todays_new_ticket" />
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
