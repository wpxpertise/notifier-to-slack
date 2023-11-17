import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactSwitchreview from 'react-switch'
import ReactSwitchsupport from 'react-switch'
import Modal from '../Modal/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./author.scss";

const Author = () => {
  const [passview, setPassview] = useState(false);
  const [credentials, setCredentials] = useState([]);

  const handleViewpass = () => {
    passview === true ? setPassview(false) : setPassview(true)
  }

  useEffect(() => {
    getWebhook();
  }, []);

  function getWebhook() {
    const wpnts_authors_settings = {
      webhook: "",
      interval: "",
      interval_review: "",
      reviewDays: -7,
    };
    const formData = JSON.parse(localStorage.getItem("wpnts_authors_settings") || JSON.stringify(wpnts_authors_settings));
    setCredentials(formData);
  }


  const [activereview, setActiveReview] = useState(credentials.activereview);
  const [activesupport, setActiveSupport] = useState(credentials.activesupport);

  const [wpntswebhook, setWebhook] = useState({
    webhook: credentials.webhook,
    interval: credentials.interval,
    interval_review: credentials.interval_review,
    reviewDays: credentials.reviewDays,
    activereview: credentials.activereview,
    activesupport: credentials.activesupport,
  });

  // console.log(wpntswebhook)
  // console.log(wpntswebhook.activereview);

  const handleChange = e => {
    setWebhook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleActivatereview = e => {
    setActiveReview(e);
    setWebhook(prev => ({ ...prev, activereview: e }));

  }
  const handleActivatesupport = e => {
    setActiveSupport(e);
    setWebhook(prev => ({ ...prev, activesupport: e }));
  }

  const handleIntervalReview = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      interval_review: selectedInterval
    }));
  }

  const handleInterval = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      interval: selectedInterval,
    }));
  }
  const handleIntervalDays = (e) => {
    const selectedInterval = parseInt(e.target.value, 10);
    setWebhook((prev) => ({
      ...prev,
      reviewDays: selectedInterval,
    }));
  }


  useEffect(() => {
    setWebhook({
      webhook: credentials.webhook, //webhook
      interval: credentials.interval, //support interval
      interval_review: credentials.interval_review, //review interval
      reviewDays: credentials.reviewDays, //days
      activereview: credentials.activereview, //Enable setting
      activesupport: credentials.activesupport, //Disable setting

    });
  }, [credentials]);
  // }, [credentials, activereview, activesupport]);




  const handleSave = async e => {
    e.preventDefault()
    localStorage.setItem("wpnts_authors_settings", JSON.stringify(wpntswebhook));

    //
    /**
     * Add new plugin list name 
     * 
     */
    const url = `${appLocalizer.wpntsUrl}/wpnts/v1/slack_webhook_interval`;
    try {
      const res = await axios.post(url, {
        wpntswebhook

      }, {
        headers: {
          'content-type': 'application/json',
          'X-WP-NONCE': appLocalizer.nonce
        }
      }).then(function (res) {
        // console.log(wpntswebhook)
      });

    } catch (err) {
      console.log(err);
    }


    Swal.fire({
      toast: true,
      position: 'bottom-right',
      icon: 'success',
      title: "Author settings configure successfully",
      showConfirmButton: false,
      timer: 1500
    })

  }
  return (
    <div className="acb_bottom" id='acb_bottom'>
      <div className="acb_left">

        <h3 className="review-case-title">Plugin author settings panel
          <Tippy content="Active plugin realtime review and support case notification in you slack">
            <span className="wcs_title"><HelpOutlineIcon className='wcs_tooltip_icon' /></span>
          </Tippy>

        </h3>
        <br />
        <div className="wpnts-switch-review">
          <label htmlFor="reviewnoti">Enable Review notification: </label>
          <ReactSwitchreview uncheckedIcon checkedIcon className="reviewSwitch" name="wpnts-switch-review" id="reviewnoti" onChange={handleActivatereview} checked={wpntswebhook.activereview} />
        </div>
        <div className="wpnts-switch-support">
          <label htmlFor="supportnoti">Enable Support notification:</label>
          <ReactSwitchsupport uncheckedIcon checkedIcon className="supportSwitch-1" name="wpnts-switch-support" id="supportnoti" onChange={handleActivatesupport} checked={wpntswebhook.activesupport} />
        </div>

      </div>
      <div className="acb_right">

        <form action="" id="wpntswebhook">
          <div className="formInput">
            <label htmlFor="webhook">Webhook URL</label>
            <div className="wpnts-setting">
              <div className="passimg" onClick={handleViewpass}>
                {passview === false ? <VisibilityOffIcon className='passVisibility' /> : <VisibilityIcon className='passVisibility' />}
              </div>
              <input type={passview === true ? "text" : "password"} placeholder="add webhook " name="webhook" required onChange={handleChange} value={wpntswebhook.webhook} />
            </div>
          </div>
          {wpntswebhook.activereview ?
            <div className="formInput">
              <label htmlFor="interval_review">Time Interval for Review response</label>
              <div className="wpnts-setting">
                <select
                  name="interval_review"
                  required
                  onChange={handleIntervalReview}
                  value={wpntswebhook.interval_review}
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
            : ''
          }
          {wpntswebhook.activesupport ?
            <div className="formInput">
              <label htmlFor="interval">Time Interval for Support response</label>
              <div className="wpnts-setting">
                <select
                  name="interval"
                  required
                  onChange={handleInterval}
                  value={wpntswebhook.interval}
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

          <div className="formInput">
            <label htmlFor="reviewDays">How recent are the reviews you're looking for?</label>
            <div className="wpnts-setting">
              <select
                name="reviewDays"
                required
                onChange={handleIntervalDays}
                value={wpntswebhook.reviewDays}
              >
                <option value={-1}>From last 1 days</option>
                <option value={-2}>last 2 days</option>
                <option value={-3}>3 days</option>
                <option value={-4}>4 days</option>
                <option value={-5}>5 days</option>
                <option value={-7}>7 days</option>
                <option value={-10}>10 days</option>
                <option value={-15}>15 days</option>
                <option value={-20}>20 days</option>
                <option value={-30}>30 days</option>
                <option value={-60}>Last 2 month</option>
              </select>
            </div>
          </div>

          <button className="save-webhook" onClick={handleSave}>SAVE</button>
        </form>


      </div>

      <div className="acb_video">

        <div className='wcs-player-wrapper'>

          <ReactPlayer
            className='wcs-react-player'
            url='https://youtu.be/c-xsCV_2iBc'
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

export default Author
