import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from "react";
import { getNonce, getDashboardData } from '../../Helpers';
import axios from "axios";

const WCSChart = () => {
  const [chartdata, setChartData] = useState({});
  const [dashboard, setDashboard] = useState(getDashboardData());


  const fetchData = () => {
    wp.ajax.send('wpnts_dashboard_data', {
      data: {
        nonce: getNonce(),
      },
      success(response) {
        // console.log(response)
        setDashboard(response.tables);

        const total_updates = response.tables
        const combinedData = total_updates.wpnts_user_daily_login_info.map((dailyLogin) => {
          const matchingFailedLogins = total_updates.wpnts_user_track_failed_login.filter(
            (failedLogin) => failedLogin.last_reset_day === dailyLogin.last_reset_day
          );

          const failed = matchingFailedLogins.reduce((sum, failedLogin) => sum + failedLogin.daily_failed_count, 0);

          return {
            ...dailyLogin,
            failed,
          };
        });

        // Calculate login statistics for each day.
        const loginCounts = combinedData.reduce((acc, entry) => {
          const { last_reset_day, daily_login_count, failed } = entry;

          if (!acc[last_reset_day]) {
            acc[last_reset_day] = { day: last_reset_day, TotalLogin: 0, Person: 0, Failed: 0, Attempt: 0 };
          }

          acc[last_reset_day].TotalLogin += daily_login_count;
          acc[last_reset_day].Failed += failed;
          acc[last_reset_day].Attempt = acc[last_reset_day].TotalLogin + acc[last_reset_day].Failed;

          if (daily_login_count > 0) {
            acc[last_reset_day].Person++;
          }

          return acc;
        }, {});

        // Convert the loginCounts object into an array of data
        const chartDataReceived = Object.values(loginCounts);
        setChartData(chartDataReceived);

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



  return (
    <div className='wcs_chart'>
      <div className="wcs_left">
        <div className="wcs_title">Login attempt:</div>
        <ResponsiveContainer width="100%" aspect={2 / 0.8}>
          <AreaChart width={730} height={250} data={chartdata}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>

            </defs>

            <XAxis dataKey="day" stroke='gray' />
            <YAxis />

            <CartesianGrid strokeDasharray="3 3" className='wcs_chartGrid' />
            <Tooltip />
            <Area type="monotone" dataKey="Failed" stroke="red" fillOpacity={1} fill="url(#colorFailed)" />
            <Area type="monotone" dataKey="Person" stroke="#ff7300" fillOpacity={1} fill="url(#colorSuccess)" />
            <Area type="monotone" dataKey="TotalLogin" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNew)" />
            <Area type="monotone" dataKey="Attempt" stroke="#8884d8" fillOpacity={1} fill="url(#colorFailed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WCSChart