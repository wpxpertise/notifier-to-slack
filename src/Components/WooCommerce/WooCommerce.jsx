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
import "./woocommerce.scss";

const WooCommerce = () => {
  const [passview, setPassview] = useState(false);
  const [iswooactive, setIswooactive] = useState(false);
  const [credentials, setCredentials] = useState([]);

  const handleViewpass = () => {
    passview === true ? setPassview(false) : setPassview(true)
  }

  useEffect(() => {
    getWebhook();
  }, []);

  function getWebhook() {
    const wpnts_woocommerce_settings = {
      webhook: "",
      stockorout_interval_notification: "",
      intervalDays: -1,
    };
    const formData = JSON.parse(localStorage.getItem("wpnts_woocommerce_settings") || JSON.stringify(wpnts_woocommerce_settings));
    setCredentials(formData);
  }

  const [salesnotifications, setSalesnotifications] = useState(credentials.salesnotifications);
  const [stockoutofstocknotifications, setStockoutofstocknotifications] = useState(credentials.stockoutofstocknotifications);
  const [commentmoderationnotifications, setCommentmoderationnotifications] = useState(credentials.commentmoderationnotifications);

  const [wpntswebhook_woocommerce_settings, setWebhook] = useState({
    webhook: credentials.webhook,
    stockorout_interval_notification: credentials.stockorout_interval_notification,
    intervalDays: credentials.intervalDays,
    salesnotifications: credentials.salesnotifications,
    stockoutofstocknotifications: credentials.stockoutofstocknotifications,
    commentmoderationnotifications: credentials.commentmoderationnotifications,

  });

  const handleChange = e => {
    setWebhook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSalesnotifications = e => {
    setSalesnotifications(e);
    setWebhook(prev => ({ ...prev, salesnotifications: e }));
  }
  const handleStockoutofstocknotifications = e => {
    setStockoutofstocknotifications(e);
    setWebhook(prev => ({ ...prev, stockoutofstocknotifications: e }));
  }
  const handleCommentmoderationnotifications = e => {
    setCommentmoderationnotifications(e);
    setWebhook(prev => ({ ...prev, commentmoderationnotifications: e }));
  }


  useEffect(() => {
    setWebhook({
      webhook: credentials.webhook,
      stockorout_interval_notification: credentials.stockorout_interval_notification,
      intervalDays: credentials.intervalDays,
      salesnotifications: credentials.salesnotifications,
      stockoutofstocknotifications: credentials.stockoutofstocknotifications,
      commentmoderationnotifications: credentials.commentmoderationnotifications,
    });
  }, [credentials]);


  const handleIntervalDays = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      intervalDays: selectedInterval,
    }));
  }
  const handleStockUpdateinterval = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      stockorout_interval_notification: selectedInterval,
    }));
  }


  /**
   * Add new plugin list name.
   * 
   */
  const isWooActive = `${appLocalizer.wpntsUrl}/wpnts/v1/woocommerce_status`;
  useEffect(() => {
    const checkWooStatus = async () => {
      try {
        const response = await axios.get(isWooActive, {
          headers: {
            'content-type': 'application/json',
            'X-WP-NONCE': appLocalizer.nonce
          }
        });

        const woocommerceStatus = response.data;
        setIswooactive(woocommerceStatus);
      } catch (error) {
        console.log(error);
      }
    };

    // Initial check
    checkWooStatus();

    // Check at an interval (e.g., every 10 seconds)
    const intervalId = setInterval(checkWooStatus, 10000); // Adjust the interval as needed (in milliseconds)

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  /**
   * SAVE
   * 
   */
  const handleSave = async e => {
    e.preventDefault()
    localStorage.setItem("wpnts_woocommerce_settings", JSON.stringify(wpntswebhook_woocommerce_settings));

    /**
     * Add new plugin list name.
     * 
     */
    const url = `${appLocalizer.wpntsUrl}/wpnts/v1/slack_webhook_interval_woocommerce_settings`;
    try {
      const res = await axios.post(url, {
        wpntswebhook_woocommerce_settings
      }, {
        headers: {
          'content-type': 'application/json',
          'X-WP-NONCE': appLocalizer.nonce
        }
      }).then(function (res) {
        console.log(wpntswebhook_woocommerce_settings)
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
    <div className={`acb_bottom ${iswooactive ? '' : 'inactive'}`} id='acb_bottom'>
      <div className="acb_left">
        <h3>WooCommerce settings panel</h3>
        <br />

        <div className="wpnts-switch-salesnotifications">
          <label htmlFor="salesnotifications">Sales Notifications to Slack:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="woo-supportSwitch-2" name="wpnts-switch-p-activation" id="salesnotifications" onChange={handleSalesnotifications} checked={wpntswebhook_woocommerce_settings.salesnotifications} />
        </div>

        <div className="wpnts-switch-stockoutofstocknotifications">
          <label htmlFor="stockoutofstocknotifications">Product stock, out of stock Notifications:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="woo-supportSwitch-3" name="wpnts-switch-p-deactivation" id="stockoutofstocknotifications" onChange={handleStockoutofstocknotifications} checked={wpntswebhook_woocommerce_settings.stockoutofstocknotifications} />
        </div>
        <div className="wpnts-switch-commentmoderationnotifications">
          <label htmlFor="commentmoderationnotifications">Comment Moderation notifications:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="woo-supportSwitch-5" name="wpnts-switch-commentmoderationnotifications" id="commentmoderationnotifications" onChange={handleCommentmoderationnotifications} checked={wpntswebhook_woocommerce_settings.commentmoderationnotifications} />
        </div>


      </div>
      <div className="acb_right">

        {/* <form action="" id="wpntswebhook_woocommerce_settings"> */}
        <form action="" id="wpnts_woocommerce_settings">
          <div className="formInput">
            <label htmlFor="webhook">Webhook URL</label>
            <div className="wpnts-setting">
              <div className="passimg" onClick={handleViewpass}>
                {passview === false ? <VisibilityOffIcon className='passVisibility' /> : <VisibilityIcon className='passVisibility' />}
              </div>
              <input type={passview === true ? "text" : "password"} placeholder="add webhook " name="webhook" required onChange={handleChange} value={wpntswebhook_woocommerce_settings.webhook} />
            </div>
          </div>

          {wpntswebhook_woocommerce_settings.stockoutofstocknotifications ?
            <div className="formInput">
              <label htmlFor="intervalDays">Add any days to send update notification [ optionals ] </label>
              <div className="wpnts-setting">
                <select
                  name="intervalDays"
                  required
                  onChange={handleIntervalDays}
                  value={wpntswebhook_woocommerce_settings.intervalDays}
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

          {wpntswebhook_woocommerce_settings.stockoutofstocknotifications ?
            <div className="formInput">
              <label htmlFor="stockorout_interval_notification">Time Interval for notification [ optionals ]</label>
              <div className="wpnts-setting">
                <select
                  name="stockorout_interval_notification"
                  required
                  onChange={handleStockUpdateinterval}
                  value={wpntswebhook_woocommerce_settings.stockorout_interval_notification}
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
            url='https://youtu.be/Ki40d-PDooo'
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


      {!iswooactive && (
        <div className="inactive-overlay">
          <h3 className="inactive-text">Please install WooCommerce first</h3>
        </div>
      )}

    </div>

  )
}

export default WooCommerce
