import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect  } from "react";
import axios from "axios";

const WCSChart = () => {
  const [chartdata, setChartData] = useState({});
  
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
    
            const total_updates = response.data;

            // To add all user who failed to login, two different array merge together to add failed  
            const combinedData = total_updates.wpnts_user_daily_login_info.map(dailyLogin => {
              const matchingFailedLogins = total_updates.wpnts_user_track_failed_login;

              const failed = matchingFailedLogins.length;
   
              return {
                ...dailyLogin,
                failed
              };
            });

            // Total login count 
            const loginCounts = combinedData.reduce((acc, entry) => {

              const { last_reset_day, action, daily_login_count, failed } = entry;
              if (!acc[last_reset_day]) {

                acc[last_reset_day] = { day: last_reset_day, Total: 0, Success: 0, Failed: 0, Attempt: 0 };
              }
              if (action === 'login') {

                acc[last_reset_day].Total += daily_login_count;
   
                acc[last_reset_day].Failed = failed;

                acc[last_reset_day].Attempt = acc[last_reset_day].Total  + acc[last_reset_day].Failed +  acc[last_reset_day].Success || 0;
                
                if (daily_login_count > 0) {
                  acc[last_reset_day].Success++;
                }

              }
              return acc;
            }, {});
    
            // Convert the loginCounts object into an array of data
            const chartDataReceived = Object.values(loginCounts);
            setChartData(chartDataReceived);

      } catch (error) {
        console.log(error);
      }
    };

    // Initial check
    check_plugin_updates();

    // Check at an interval (e.g., every 10 seconds)
    const intervalId = setInterval(check_plugin_updates, 10000);
     // Clear interval on component unmount
     return () => clearInterval(intervalId);
    }, []);


    // console.log(user_daily_login_info);  
    // console.log(chartdata);  


  return (
    <div className='wcs_chart'>
      <div className="wcs_left">
      <div className="wcs_title">Login attempt:</div>
      <ResponsiveContainer width="100%" aspect={2/0.8}>
        <AreaChart width={730} height={250} data={chartdata}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
             
            </defs>

            <XAxis dataKey="day" stroke='gray' />
            <YAxis />

            <CartesianGrid strokeDasharray="3 3" className='wcs_chartGrid'/>
            <Tooltip />
            <Area type="monotone" dataKey="Failed" stroke="red" fillOpacity={1} fill="url(#colorFailed)" />
            <Area type="monotone" dataKey="Success" stroke="#ff7300" fillOpacity={1} fill="url(#colorSuccess)" />
            <Area type="monotone" dataKey="Total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNew)" />
            <Area type="monotone" dataKey="Attempt" stroke="#8884d8" fillOpacity={1} fill="url(#colorFailed)" />
        </AreaChart>
      </ResponsiveContainer>
     </div>
    </div>
  )
}

export default WCSChart