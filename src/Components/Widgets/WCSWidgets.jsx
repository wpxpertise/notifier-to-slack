// import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person3Icon from '@mui/icons-material/Person3';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css'
import './widgets.scss'


const WCSWidgets = ( {type} ) => {
    
    /**
     * Switch 
     */
    let data;
    const percentage = 0;
    switch(type){
        case "total_staffs":
            data ={
                title: "Plugin Update",
                // total: '3',
                total: "10",
                isPercantage:false,
                activeContent:false,
                content:"Editor are act as staff. So to give staff access please set capability to editor",
                link: "See all listed pending plugin",
                icon:(
                    <ConfirmationNumberIcon className='wcs_icon' style={{color:"#464587"}}/>
                )
            };
            break;
        case "total_users":
            data ={
                title: "Last activaited pluigin",
                total: "0",
                isPercantage:false,
                activeContent:false,
                content:"Your users are your subscribers. Anyone who creates an account is initially considered as a subscriber.",
                link: "See who activated",
                icon:(
                    <Person3Icon className='wcs_users_icon' style={{color:"black"}}/>
                )
            };
            break;
        case "total_ticket_close":
            data ={
                title: "Last deactivated pluigin",
                total: "0",
                isPercantage:true,
                activeContent:false,
                content:"Total Ticket close",
                link: "See who deactivated",
                icon:(
                    <BookmarkAddedIcon className='wcs_resolve_icon' style={{color:"#31522a"}}/>
                )
            };
            break;
        case "todays_new_ticket":
            data ={
                title: "New Account created",
                total: "0",
                isPercantage:true,
                link: "Check who is your new user",
                activeContent:false,
                content:"Total Ticket resolved",
                icon:(
                 
                    <SupportAgentIcon className='wcs_staff_icon' style={{color:"black"}}/>
                )
            };
            break;
        case "ongoing":
            data ={
                title: "Ongoing Tickets",
                total: "0",
                isPercantage:true,
                link: "See all tickets",
                activeContent:false,
                content:"",
                icon:(
                    <StickyNote2Icon className='wcs_icon' />
                )
            };
            break;
        case "pending":
            data ={
                title: "Pending Tickets",
                total: "0",
                isPercantage:true,
                link: "See all message",
                activeContent:false,
                content:"",
                icon:(
                    <PendingActionsIcon className='wcs_pending_icon' style={{color:"crimson"}}/>
                )
            };
            break;
        case "chatting":
            data ={
                title: "Ticket Close",
                total: "0",
                isPercantage:true,
                link: "Check chat list",
                activeContent:false,
                content:"",
                icon:(
                    <FactCheckIcon className='wcs_resolve_icon' />
                )
            };
            break;                   
        default:
            break;
    }
  return (
    <div className='wcs_widget wcs_widgets_free'>
            <h4 className='pro_badge'>UPCOMMING</h4>
            <div className="wcs_left wec_left_free">
                {data.activeContent ===true && 
                <Tippy content={data.content}>
                    <span className="wcs_title">{data.title}<HelpOutlineIcon className='wcs_tooltip_icon'/></span>
                </Tippy>}
                {data.activeContent ===false && 
                    <span className="wcs_title">{data.title}</span>
                }
                    <span className="wcs_counter">{data.total}</span>
                    <span className="wcs_link">{data.link}</span>
                </div>
            <div className="wcs_right wec_right_free">

            {data.isPercantage &&
            <div className="wcs_percentage wcs_positive">
                <KeyboardArrowUpIcon/>
              {percentage}{data.isPercantage && "%"}
            </div>
            }
            <div className="wcs_percentage wcs_positive"></div> 

           {data.icon}
        </div>
    </div>
  )
}

export default WCSWidgets