// import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person3Icon from '@mui/icons-material/Person3';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import React, { useState, useEffect  } from "react";
import axios from "axios";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css'
import './widgets.scss'


const WCSWidgets = ( {type} ) => {
    const [plugin_updates, setTotal_plugin_updates] = useState({});
    const [active_plugin_list, setActivePlugin_list] = useState({});
    const [deactive_plugin_list, setDeactivePlugin_list] = useState({});
    const [loggedinuser_list, setLoggedInuser_list] = useState({});
    const [loggedoutuser_list, setLoggedoutuser_list] = useState({});

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

                // console.log(total_updates.wpnts_user_daily_login_info);

                    

                // Adding plugin list and activation all to show total plugin update
                setTotal_plugin_updates(total_updates);

                // Seperaterly addin plugin list of active to show the activated plugin name
                total_updates.wpnts_activated_plugins.forEach((plugin, index) => {
                    const firstPart = plugin.split('/')[0]; // Get the first part of the plugin name
                    const byIndex = plugin.indexOf(" by ");
                    const secondPart = byIndex !== -1 ? plugin.slice(byIndex + 4) : "";
                    setActivePlugin_list(prevList => ({ ...prevList, [index]: `${firstPart} : ${secondPart}` }));

                });


                // Seperaterly addin plugin list of deactive to show the deactivated plugin name
                total_updates.wpnts_deactivated_plugins.forEach((plugin, index) => {
                    const firstPart = plugin.split('/')[0]; // Get the first part of the plugin name
                    const byIndex = plugin.indexOf(" by ");
                    const secondPart = byIndex !== -1 ? plugin.slice(byIndex + 4) : "";
                    setDeactivePlugin_list(prevList => ({ ...prevList, [index]: `${firstPart} : ${secondPart}` }));

                });


                // Parse the wpnts_user_login_info data and populate the loggedinuser_list state
                /* total_updates.wpnts_user_login_info.forEach((user, index) => {
                    const loginTimestamp = new Date(user.timestamp * 1000); // Convert Unix timestamp to JS Date object
                    const formattedLoginTime = loginTimestamp.toLocaleString(); // Format the login time

                    // Set the user data in the loggedinuser_list state
                    setLoggedInuser_list(prevList => ({
                        ...prevList,
                        [index]: `${user.user} - Logged in at ${formattedLoginTime}`
                    }));
                }); */

                // Login info 
                total_updates.wpnts_user_login_info.forEach((user, index) => {
                    // console.log(user.action)
                    if (user.action === 'login') { // Check if the action is 'login'
                        const loginTimestamp = new Date(user.timestamp * 1000); // Convert Unix timestamp to JS Date object
                        const formattedLoginTime = loginTimestamp.toLocaleString(); // Format the login time

                        // Set the user data in the loggedinuser_list state
                        setLoggedInuser_list(prevList => ({
                            ...prevList,
                            [index]: `${user.user} - Logged in at ${formattedLoginTime}`
                        }));
                    }
                    if(user.action === 'logout'){
                        const loginTimestamp = new Date(user.timestamp * 1000); // Convert Unix timestamp to JS Date object
                        const formattedLoginTime = loginTimestamp.toLocaleString(); // Format the login time

                        // Set the user data in the loggedinuser_list state
                        setLoggedoutuser_list(prevList => ({
                            ...prevList,
                            [index]: `${user.user} - Logged out at ${formattedLoginTime}`
                        }));
                    }
                });

                

          } catch (error) {
            console.log(error);
          }
        };
    
        // Initial check
        check_plugin_updates();
    
        // Check at an interval (e.g., every 10 seconds)
        const intervalId = setInterval(check_plugin_updates, 10000); // Adjust the interval as needed (in milliseconds)
         // Clear interval on component unmount
         return () => clearInterval(intervalId);
        }, []);

        // console.log(plugin_updates.total_plugin_updates)
        // console.log(plugin_updates.wpnts_activated_plugins)
        // console.log(plugin_list);
        // console.log(loggedinuser_list);
        
        
        
    /**
     * Switch 
     */
    let data;
    const percentage = 0;
    switch(type){
        case "total_plugin_update":
            data ={
                title: "Plugin Update",
                class: 'total_plugin_update',
                total: plugin_updates.total_plugin_updates ??  <CircularProgress />,
                isPercantage:false,
                activeContent:true,
                content:"Shows remaning plugin which need to update.",
                link: "See all listed pending plugin",
                icon:(
                    <ConfirmationNumberIcon className='wcs_icon' style={{color:"#464587"}}/>
                )
            };
            break;
        case "lat_active_plugin_name":
            data ={
                title: "Last activaited pluigin",
                // total: active_plugin_list ??  <CircularProgress />,
                class: 'lat_active_plugin_name',
                total: active_plugin_list ? (
                    <ol className='lat_active_plugin_name'>
                        {Object.values(active_plugin_list).map((plugin, index) => (
                            <li className='lat_of_active_plug' key={index}>{plugin}</li>
                        ))}
                    </ol>
                ) : (
                    <CircularProgress />
                ),
                isPercantage:false,
                activeContent:true,
                content:"Last activated plugin between 24 hours with who active the plugin (User name). Data will automatically reset after 24 hours",
                link: "See who activated",
                icon:(
                    <Person3Icon className='wcs_users_icon' style={{color:"black"}}/>
                )
            };
            break;
        case "total_deactivaed_plugin":
            data ={
                title: "Last deactivated pluigin",
                class: 'total_deactivaed_plugin',
                // total: "0",
                total: deactive_plugin_list ? (
                    <ol className='lat_active_plugin_name'>
                        {Object.values(deactive_plugin_list).map((plugin, index) => (
                            <li className='lat_of_active_plug' key={index}>{plugin}</li>
                        ))}
                    </ol>
                ) :<CircularProgress /> ,

                isPercantage:false,
                activeContent:true,
                content:"Last deactivated plugin between 24 hours with who deactivated the plugin (User name). Data will automatically reset after 24 hours",
                link: "See who deactivated",
                icon:(
                    <BookmarkAddedIcon className='wcs_resolve_icon' style={{color:"#31522a"}}/>
                )
            };
            break;
        case "todays_who_logged":
            const loggedUsers = Object.values(loggedinuser_list); 
            data ={
                title: "Today logged users",
                class: 'todays_who_logged',
                total: loggedUsers.map((user, index) => (
                    <div key={index}>{user}</div>
                )),
                isPercantage: false,
                count: loggedUsers.length.toString(),
                link: "Check who logged in today",
                activeContent: true,
                content: "Last logged in user name with time between 24 hours. Data will automatically reset after 24 hours",
                icon: (
                    <SupportAgentIcon className='wcs_staff_icon' style={{ color: "black" }} />
                ),
            };
            break;

        case "todays_who_out":
            const loggedOutUsers = Object.values(loggedoutuser_list); 
            data ={
                title: "Today logged out users",
                class: 'todays_who_out',
                total: loggedOutUsers.map((user, index) => (
                    <div key={index}>{user}</div>
                )),
                isPercantage:false,
                count: loggedOutUsers.length.toString(),
                link: "Check who logged out today",
                activeContent:true,
                content:"Last logged out user name with time between 24 hours. Data will automatically reset after 24 hours",
                icon:(
                    
                    <SupportAgentIcon className='wcs_staff_icon' style={{color:"black"}}/>
                )
            };
            break;

                 
        default:
            break;
    }
  return (
    <div className='wcs_widget wcs_widgets_free'>

            {/* <h4 className='pro_badge'>UPCOMMING</h4> */}
            {/* <div className="wcs_left wec_left_free"> */}
            <div className="wcs_left">
                {data.activeContent ===true && 
                <Tippy content={data.content}>
                    <span className="wcs_title">{data.title}<HelpOutlineIcon className='wcs_tooltip_icon'/></span>
                </Tippy>}
                {data.activeContent ===false && 
                    <span className="wcs_title">{data.title}</span>
                }
                    <span className={`wcs_counter list_of_plug ${data.class}`}>{data.total}</span>
                    <span className="wcs_link">{data.link}</span>
                </div>
            <div className="wcs_right wec_right_free">

            {data.isPercantage &&
            <div className="wcs_percentage wcs_positive">
                <KeyboardArrowUpIcon/>
              {percentage}{data.isPercantage && "%"}
            </div>
            }

            {data.count &&
            <div className="wcs_percentage wcs_positive">
                <KeyboardArrowUpIcon/>
              {data.count}{data.count && "%"}
            </div>
            }
            <div className="wcs_percentage wcs_positive"></div> 

           {data.icon}
        </div>
    </div>
  )
}

export default WCSWidgets