import  MoreVertTwoTone  from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState, useEffect  } from "react";
import axios from "axios";

import './featured.scss'

const WCSFeatured = () => {
    // wpnts_site_helgth

    const [site_helgth, setSite_helgth] = useState({});
    
    const total_plugin_updates = `${appLocalizer.wpntsUrl}/wpnts/v1/dashboard_calculations`;
    useEffect(() => {
        const check_plugin_updates = async () => {
        try {
                const response = await axios.get(total_plugin_updates, {
                headers: {
                    'content-type': 'application/json',
                    'X-WP-NONCE': appLocalizer.nonce
                }
                });
        
                const helgth_status = response.data;
                // console.log(helgth_status);
                
                setSite_helgth(helgth_status);

            
        } catch (error) {
            console.log(error);
        }
        };

        check_plugin_updates();

        const intervalId = setInterval(check_plugin_updates, 10000);
        return () => clearInterval(intervalId);
        }, []);

  return (
    <div className='wcs_featured'>
        {/* <h4 className='pro_badge'>UPCOMMING</h4> */}
        <div className="wcs_featured">
            <div className="wcs_top">
                <h1 className="wcs_title">Site Health Status</h1>
                <MoreVertTwoTone fontSize='small'/>
            </div>
            <div className="wcs_bottom">
                <div className="wcs_featuredChart">
                {/* <CircularProgressbar value={0} text={`${0}%`} strokeWidth={5} /> */}
                <CircularProgressbar value={site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.good :<CircularProgress />} text={`${site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.good : 0}%`} strokeWidth={5} />
                
                </div>
                {/* <p className="wcs_title">Error</p> */}
                <p className="wcs_title">Recommended</p>
                <p className="wcs_amount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.recommended : 0}</p>
                <div className="wcs_summary">
                    
                    <div className="wcs_item">
                        <div className="itemTitle">Good</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small'/>
                       
                            <div className="resultAmount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.good :<CircularProgress />}</div>
                        </div>
                    </div>
                    <div className="wcs_item">
                        <div className="itemTitle">Recommended</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small'/>
                         
                            <div className="resultAmount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.recommended :<CircularProgress />}</div>
                        </div>
                    </div>
                    <div className="wcs_item">
                        <div className="itemTitle">Critical</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize='small'/>
            
                            <div className="resultAmount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.critical :<CircularProgress />}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WCSFeatured