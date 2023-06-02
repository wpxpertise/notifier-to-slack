import React, { useState, useEffect  } from "react";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactSwitchreview from 'react-switch'
import ReactSwitchsupport from 'react-switch'
import Modal from '../Modal/Modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./security.scss";

const Security = () => {
    const [passview, setPassview] = useState(false);
    const [credentials, setCredentials] = useState([]);

    const handleViewpass = () =>{
        passview === true ? setPassview(false): setPassview(true)
      }

      useEffect(() => {
        getWebhook();
      }, []);

      function getWebhook() {
        const wpnts_site_security_settings = {
          webhook: "",
          intervalDays: -1,
          sitessecurityissuesInterval: -1,
        };
        const formData = JSON.parse(localStorage.getItem("wpnts_site_security_settings") || JSON.stringify(wpnts_site_security_settings));
        setCredentials(formData);
    }

    const [wpconfigmodification, setWpconfigmodification] = useState(credentials.wpconfigmodification);
    const [htaccessmodification, setHtaccessmodification] = useState(credentials.htaccessmodification);


  
      const [wpntswebhook_site_settings, setWebhook] = useState({
        webhook : credentials.webhook,
        intervalDays: credentials.intervalDays,
        sitessecurityissuesInterval: credentials.sitessecurityissuesInterval,
        wpconfigmodification: credentials.wpconfigmodification,
        htaccessmodification: credentials.htaccessmodification,
        
        }); 

      const handleChange = e =>{
        setWebhook(prev=>({...prev, [e.target.name] : e.target.value})) 
      }
      const handleWpconfigmodification = e =>{
        setWpconfigmodification(e);
        setWebhook(prev => ({...prev, wpconfigmodification: e}));
      }
      const handleHtaccessmodification = e =>{
        setHtaccessmodification(e);
        setWebhook(prev => ({...prev, htaccessmodification: e}));
      }
      
      
      useEffect(() => {
        setWebhook({ 
          webhook : credentials.webhook,
          intervalDays: credentials.intervalDays,
          sitessecurityissuesInterval: credentials.sitessecurityissuesInterval,
          wpconfigmodification: credentials.wpconfigmodification,
          htaccessmodification: credentials.htaccessmodification,
         });
      }, [credentials]);


      const handleSave = async e => {
        e.preventDefault()
        localStorage.setItem("wpnts_site_security_settings", JSON.stringify(wpntswebhook_site_settings)); 
        
        //
        /**
         * Add new plugin list name 
         * 
         */
        const url = `${appLocalizer.wpntsUrl}/wpnts/v1/slack_webhook_site_security_settings`;
        try{
          const res = await axios.post(url, { wpntswebhook_site_settings
      
          }, {
            headers:{
              'content-type': 'application/json',
              'X-WP-NONCE':appLocalizer.nonce
            }
          }).then(function(res) {
            console.log(wpntswebhook_site_settings)
          });
          
        } catch(err){
          console.log(err);
        }


        Swal.fire({
          toast: true,
          position: 'bottom-right',
          icon: 'success',
          title: "Webhook configure successfully",
          showConfirmButton: false,
          timer: 1500
        })
  
    }
  return (
    <div className="acb_bottom" id='acb_bottom'>
        <div className="acb_left">
            <h3>Advance Security settings panel</h3>
                <br />
                                                        
                <div className="wpnts-switch-sitescriptmodification">                                                             
                    <label htmlFor="sitescriptmodification">Core wp-config modification alert:</label>
                    <ReactSwitchsupport uncheckedIcon checkedIcon className="sitessecurity-supportSwitch-2"  name="wpnts-switch-p-activation" id="wpconfigmodification" onChange={handleWpconfigmodification} checked={wpntswebhook_site_settings.wpconfigmodification}/>
                </div>
                
                <div className="wpnts-switch-sitessecurityissues">
                    <label htmlFor="sitessecurityissues">htaccess modification alert:</label> 
                                                         
                    <ReactSwitchsupport uncheckedIcon checkedIcon className="sitessecurity-supportSwitch-3"  name="wpnts-switch-p-deactivation" id="htaccessmodification" onChange={handleHtaccessmodification} checked={wpntswebhook_site_settings.htaccessmodification}/>
                </div>
               
        </div>
        <div className="acb_right">

            {/* <form action="" id="wpntswebhook_site_settings"> */}
            <form action="" id="wpnts_site_security_settings">
                <div className="formInput">
                    <label htmlFor="webhook">Webhook URL</label>
                    <div className="wpnts-setting">
                        <div className="passimg" onClick={handleViewpass}>
                        {passview === false ? <VisibilityOffIcon className='passVisibility'/> : <VisibilityIcon className='passVisibility'/>}
                        </div> 
                        <input type={passview === true ? "text" : "password"} placeholder="add webhook " name="webhook" required onChange={handleChange} value={wpntswebhook_site_settings.webhook}/>
                    </div>
                </div>
          
                {/* <div className="formInput"> 
                    <label htmlFor="intervalDays">How many days you want-add last days</label>
                    <div className="wpnts-setting">
                        <input type="text" placeholder="-1" name="intervalDays" required onChange={handleChange} value={wpntswebhook_site_settings.intervalDays}/>
                    </div>
                </div>

                
                <div className="formInput">
                    <label htmlFor="sitessecurityissuesInterval">Time Interval/Second</label>
                    <div className="wpnts-setting">
                        <input type="text" placeholder="add interval" name="sitessecurityissuesInterval" required onChange={handleChange} value={wpntswebhook_site_settings.sitessecurityissuesInterval}/>
                    </div>
                </div> */}

                <button className="save-webhook" onClick={handleSave}>SAVE</button>
            </form>

        </div>
    </div>
        
  )
}

export default Security
