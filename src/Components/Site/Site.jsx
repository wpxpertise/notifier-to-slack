import React, { useState, useEffect } from "react";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactSwitchreview from 'react-switch'
import ReactSwitchsupport from 'react-switch'
import ReactPlayer from 'react-player'
import Modal from '../Modal/Modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./site.scss";

const Site = () => {
  const [passview, setPassview] = useState(false);
  const [credentials, setCredentials] = useState([]);

  const handleViewpass = () => {
    passview === true ? setPassview(false) : setPassview(true)
  }

  useEffect(() => {
    getWebhook();
  }, []);

  function getWebhook() {
    const wpnts_site_settings = {
      webhook: "",
      interval_plugin_update: "",
      interval_sitehelgth_update: "",
      intervalDays: -1,
    };
    const formData = JSON.parse(localStorage.getItem("wpnts_site_settings") || JSON.stringify(wpnts_site_settings));
    setCredentials(formData);
  }

  const [pluginactivation, setPluginactivation] = useState(credentials.pluginactivation);
  const [plugindeactivation, setPlugindeactivation] = useState(credentials.plugindeactivation);
  const [updatenotification, setUpdatenotification] = useState(credentials.updatenotification);
  const [wpnotification, setWpnotification] = useState(credentials.wpnotification);

  const [loginandout, setLoginandout] = useState(credentials.loginandout);
  const [sitehelgth, setSitehelgth] = useState(credentials.sitehelgth);
  const [registration, setRegistration] = useState(credentials.registration);


  const [wpntswebhook_site_settings, setWebhook] = useState({
    webhook: credentials.webhook,
    interval_plugin_update: credentials.interval_plugin_update,
    interval_sitehelgth_update: credentials.interval_sitehelgth_update,
    intervalDays: credentials.intervalDays,
    pluginactivation: credentials.pluginactivation,
    plugindeactivation: credentials.plugindeactivation,
    updatenotification: credentials.updatenotification,
    wpnotification: credentials.wpnotification,

    loginandout: credentials.loginandout,
    sitehelgth: credentials.sitehelgth,
    registration: credentials.registration,
  });

  // console.log(wpntswebhook_site_settings)
  // console.log(wpntswebhook_site_settings.activereview);

  const handleChange = e => {
    setWebhook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handlePluginactivation = e => {
    setPluginactivation(e);
    setWebhook(prev => ({ ...prev, pluginactivation: e }));
  }
  const handlePlugindeactivation = e => {
    setPlugindeactivation(e);
    setWebhook(prev => ({ ...prev, plugindeactivation: e }));
  }
  const handleUpdatenotification = e => {
    setUpdatenotification(e);
    setWebhook(prev => ({ ...prev, updatenotification: e }));
  }
  const handleWpnotification = e => {
    setWpnotification(e);
    setWebhook(prev => ({ ...prev, wpnotification: e }));
  }
  const handleLoginandout = e => {
    setLoginandout(e);
    setWebhook(prev => ({ ...prev, loginandout: e }));
  }
  const handleRegistration = e => {
    setRegistration(e);
    setWebhook(prev => ({ ...prev, registration: e }));
  }
  const handleSitehelgth = e => {
    setSitehelgth(e);
    setWebhook(prev => ({ ...prev, sitehelgth: e }));

  }

  useEffect(() => {
    setWebhook({
      webhook: credentials.webhook,
      interval_plugin_update: credentials.interval_plugin_update,
      interval_sitehelgth_update: credentials.interval_sitehelgth_update,
      intervalDays: credentials.intervalDays,
      pluginactivation: credentials.pluginactivation,
      plugindeactivation: credentials.plugindeactivation,
      updatenotification: credentials.updatenotification,
      wpnotification: credentials.wpnotification,

      loginandout: credentials.loginandout,
      sitehelgth: credentials.sitehelgth,
      registration: credentials.registration,
    });
  }, [credentials]);
  // }, [credentials, activereview, activesupport]);


  const handleIntervalDays = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      intervalDays: selectedInterval,
    }));
  }

  const handleintervalPluginUpdate = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      interval_plugin_update: selectedInterval,
    }));
  }

  const handleSiteHelgthinterval = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      interval_sitehelgth_update: selectedInterval,
    }));
  }

  const handleSave = async e => {
    e.preventDefault()
    localStorage.setItem("wpnts_site_settings", JSON.stringify(wpntswebhook_site_settings));

    //
    /**
     * Add new plugin list name 
     * 
     */
    const url = `${appLocalizer.wpntsUrl}/wpnts/v1/slack_webhook_interval_site_settings`;
    try {
      const res = await axios.post(url, {
        wpntswebhook_site_settings

      }, {
        headers: {
          'content-type': 'application/json',
          'X-WP-NONCE': appLocalizer.nonce
        }
      }).then(function (res) {
        // console.log(wpntswebhook_site_settings)
      });

    } catch (err) {
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
        {/* <h3>Choose your preferable setting</h3> */}
        <h3>Site settings panel</h3>
        <br />

        <div className="wpnts-switch-pluginactivation">
          <label htmlFor="pluginactivation">Plugin Activation notice:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-2" name="wpnts-switch-p-activation" id="pluginactivation" onChange={handlePluginactivation} checked={wpntswebhook_site_settings.pluginactivation} />
        </div>

        <div className="wpnts-switch-plugindeactivation">
          <label htmlFor="plugindeactivation">Plugin Deactivation notice:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-3" name="wpnts-switch-p-deactivation" id="plugindeactivation" onChange={handlePlugindeactivation} checked={wpntswebhook_site_settings.plugindeactivation} />
        </div>
        <div className="wpnts-switch-wpnotification">
          <label htmlFor="wpnotification">WordPress Update notification:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-5" name="wpnts-switch-wpnotification" id="wpnotification" onChange={handleWpnotification} checked={wpntswebhook_site_settings.wpnotification} />
        </div>
        <div className="wpnts-switch-updatenotification">
          <label htmlFor="updatenotification">Plugin Update notification:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-4" name="wpnts-switch-u-notification" id="updatenotification" onChange={handleUpdatenotification} checked={wpntswebhook_site_settings.updatenotification} />
        </div>
        <div className="wpnts-switch-loginandout">
          <label htmlFor="loginandout">Login/Logout alert:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-6" name="wpnts-switch-loginandout-notification" id="loginandout" onChange={handleLoginandout} checked={wpntswebhook_site_settings.loginandout} />
        </div>
        <div className="wpnts-switch-registration">
          <label htmlFor="registration">New User Registration alert:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-8" name="wpnts-switch-registration-notification" id="registration" onChange={handleRegistration} checked={wpntswebhook_site_settings.registration} />
        </div>
        <div className="wpnts-switch-sitehelgth">
          <label htmlFor="sitehelgth">Site health notification:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-7" name="wpnts-switch-sitehelgth-notification" id="sitehelgth" onChange={handleSitehelgth} checked={wpntswebhook_site_settings.sitehelgth} />
        </div>


      </div>
      <div className="acb_right">

        <form action="" id="wpntswebhook_site_settings">
          <div className="formInput">
            <label htmlFor="webhook">Webhook URL</label>
            <div className="wpnts-setting">
              <div className="passimg" onClick={handleViewpass}>
                {passview === false ? <VisibilityOffIcon className='passVisibility' /> : <VisibilityIcon className='passVisibility' />}
              </div>
              <input type={passview === true ? "text" : "password"} placeholder="add webhook " name="webhook" required onChange={handleChange} value={wpntswebhook_site_settings.webhook} />
            </div>
          </div>

          {wpntswebhook_site_settings.updatenotification || wpntswebhook_site_settings.sitehelgth ?
            <div className="formInput">
              <label htmlFor="intervalDays">Add any days to send update notification [ optionals ] </label>
              <div className="wpnts-setting">
                <select
                  name="intervalDays"
                  required
                  onChange={handleIntervalDays}
                  value={wpntswebhook_site_settings.intervalDays}
                >
                  <option value={-1}>From last 1 days</option>
                  <option value={-5}>5 days</option>
                  <option value={-7}>7 days</option>
                  <option value={-10}>10 days</option>
                  <option value={-15}>15 days</option>
                  <option value={-20}>20 days</option>
                  <option value={-30}>30 days</option>
                </select>
              </div>
            </div>
            : ''}

          {wpntswebhook_site_settings.updatenotification ?
            <div className="formInput">
              <label htmlFor="interval_plugin_update">Time Interval for WP Core & plugin update</label>
              <div className="wpnts-setting">
                <select
                  name="interval_plugin_update"
                  required
                  onChange={handleintervalPluginUpdate}
                  value={wpntswebhook_site_settings.interval_plugin_update}
                >
                  <option value={60}>1 min interval</option>
                  <option value={180}>3 min</option>
                  <option value={300}>5 min</option>
                  <option value={1800}>30 min</option>
                  <option value={3600}>1 hour</option>
                  <option value={18000}>5 hours</option>
                  <option value={36000}>10 hours</option>
                  <option value={54000}>15 hours</option>
                  <option value={64800}>18 hours</option>
                  <option value={86400}>24 hours</option>
                  <option value={172800}>2 days</option>
                  <option value={259200}>3 days</option>
                  <option value={604800}>7 days</option>
                </select>
              </div>
            </div>
            : ''}

          {wpntswebhook_site_settings.sitehelgth ?
            <div className="formInput">
              <label htmlFor="interval_sitehelgth_update">Time Interval/Second for Site Helght</label>
              <div className="wpnts-setting">
                <select
                  name="interval_sitehelgth_update"
                  required
                  onChange={handleSiteHelgthinterval}
                  value={wpntswebhook_site_settings.interval_sitehelgth_update}
                >
                  <option value={60}>1 min interval</option>
                  <option value={180}>3 min</option>
                  <option value={300}>5 min</option>
                  <option value={1800}>30 min</option>
                  <option value={3600}>1 hour</option>
                  <option value={18000}>5 hours</option>
                  <option value={36000}>10 hours</option>
                  <option value={54000}>15 hours</option>
                  <option value={64800}>18 hours</option>
                  <option value={86400}>24 hours</option>
                  <option value={172800}>2 days</option>
                  <option value={259200}>3 days</option>
                  <option value={604800}>7 days</option>
                </select>

              </div>
            </div>
            : ''}



          <button className="save-webhook" onClick={handleSave}>SAVE</button>
        </form>

      </div>

      <div className="acb_video">

        <div className='wcs-player-wrapper'>
          <ReactPlayer
            className='wcs-react-player'
            url='https://youtu.be/pE_h3oMBf4I'
            width='100%'
            height='100%'
            controls={true}
            light={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  showinfo: 0,
                },
              },
            }}
            iframe
          />
        </div>

      </div>

    </div>

  )
}

export default Site
