import MoreVertTwoTone from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState, useEffect } from "react";
import { getNonce, getDashboardData } from '../../Helpers';
import './featured.scss'

const WCSFeatured = () => {
    const currentURL = window.location.href;
    const wpAdminIndex = currentURL.indexOf('/wp-admin/');
    const adminURL = currentURL.substring(0, wpAdminIndex);
    const [dashboard, setDashboard] = useState(getDashboardData());
    const [site_helgth, setSite_helgth] = useState({});

    const fetchData = () => {
        wp.ajax.send('wpnts_dashboard_data', {
            data: {
                nonce: getNonce(),
            },
            success(response) {
                // console.log(response)
                setDashboard(response.tables);
                setSite_helgth(response.tables);
            },
            error(error) {
                console.error(error);
            },
        });

    };
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // console.log(dashboard.wpnts_activated_plugins)
    // console.log(dashboard)

    return (
        <div className='wcs_featured'>
            <div className="wcs_featured">
                <div className="wcs_top">
                    <h1 className="wcs_title">Site Health Status</h1>
                    <MoreVertTwoTone fontSize='small' />
                </div>
                <div className="wcs_bottom">
                    <div className="wcs_featuredChart">
                        <CircularProgressbar value={site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.good : <CircularProgress />} text={`${site_helgth.wpnts_site_health?.good ?? 0}%`} strokeWidth={5} />
                    </div>

                    <p className="wcs_title">Recommended</p>
                    <p className="wcs_amount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.recommended : 0}</p>
                    <div className="wcs_summary">

                        <div className="wcs_item">
                            <div className="itemTitle">Good</div>
                            <div className="itemResult positive">
                                <KeyboardArrowUpIcon fontSize='small' />

                                <div className="resultAmount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.good : <CircularProgress />}</div>
                            </div>
                        </div>
                        <div className="wcs_item">
                            <div className="itemTitle">Recommended</div>
                            <div className="itemResult positive">
                                <KeyboardArrowUpIcon fontSize='small' />

                                <div className="resultAmount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.recommended : ''}</div>
                            </div>
                        </div>
                        <div className="wcs_item">
                            <div className="itemTitle">Critical</div>
                            <div className="itemResult negative">
                                <KeyboardArrowDownIcon fontSize='small' />

                                <div className="resultAmount">{site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.critical : ''}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {site_helgth.wpnts_site_health ? <h5>Your site has {site_helgth.wpnts_site_health ? site_helgth.wpnts_site_health.critical : ''} Critical issue. Please check quickly <a href={`${adminURL}/wp-admin/site-health.php`} target="_blank" rel="noopener noreferrer">view</a> </h5> : ''}
        </div>
    )
}

export default WCSFeatured