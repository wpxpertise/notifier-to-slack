import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import Countdown from 'react-countdown';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import facebook from '../../../assets/icons/support/facebook.svg';
import twitter from '../../../assets/icons/support/twitter-x-fill.svg';
import gmailicon from '../../../assets/icons/support/gmail.svg';
import defaultEmail from '../../../assets/icons/support/default-email.svg';
import iconmark from '../../../assets/icons/support/iconmark.svg';
import supportmail from '../../../assets/icons/support/supportmail.svg';
import 'sweetalert2/src/sweetalert2.scss'
import './modal.scss'

const Modal = ({ setOpenModal }) => {

  const [copySuccess, setCopySuccess] = useState(false);

  const openGmailCompose = () => {
    const email = 'wpxpertise@gmail.com';
    const subject = 'Add your mail';
    const body = 'I am interested to buy your product please let me know the details';
    const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailComposeUrl, '_blank');
  };

  const openFacebookInBrowser = () => {
    window.open('https://www.facebook.com/profile.php?id=100092565099553', '_blank');
  };
  const openTwiterInBrowser = () => {
    window.open('https://twitter.com/wp_xpertise', '_blank');
  };

  const handleDefaultmailClick = (email, subject = '', body = '') => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyMail = async (mail) => {
    const copied = mail;
    try {
      await navigator.clipboard.writeText(copied);
      setCopySuccess(true);
      Swal.fire({
        toast: true,
        position: 'bottom-right',
        icon: 'success',
        title: "Mail copied successfully.",
        showConfirmButton: false,
        timer: 1500
      })

    } catch (err) {
      setCopySuccess(false);
      Swal.fire({
        toast: true,
        position: 'bottom-right',
        icon: 'success',
        title: "Mail copy failed.",
        showConfirmButton: false,
        timer: 1500
      })
    }
  };


  return (
    <div className="wcsmodalBackground">
      <div className='support-body'>
        <div className="spt-header">
          <div className="brandlogo">
            {/* <img src={logo} alt="logo" /> */}
            {/* WPXPERTISE */}
            <div className='close'>
              <button
                onClick={() => { setOpenModal(false); }}>X</button>
            </div>
          </div>
          <h3>Contact us for Premium version and support</h3>
        </div>
        <div className="spt-content">
          <div className="template">
            <div className="logo">
              <img src={gmailicon} alt="gmailicon" />
            </div>
            <div className="content" onClick={openGmailCompose}>
              <div className="spt-title">Gmail</div>
              <div className="spt-details">Open Gmail in browser</div>
            </div>
            <div className='iconmark'>
              <img src={iconmark} alt="iconmark" />
            </div>
          </div>

          <div className="template">
            <div className="logo facebook">
              <img src={facebook} alt="yahoo" />
            </div>
            <div className="content" onClick={openFacebookInBrowser}>
              <div className="spt-title">Facebook</div>
              <div className="spt-details">Reach us at Facebook</div>
            </div>
            <div className='iconmark'>
              <img src={iconmark} alt="iconmark" />
            </div>
          </div>

          <div className="template">
            <div className="logo facebook">
              <img src={twitter} alt="yahoo" />
            </div>
            <div className="content" onClick={openTwiterInBrowser}>
              <div className="spt-title">Twitter</div>
              <div className="spt-details">Reach us at X</div>
            </div>
            <div className='iconmark'>
              <img src={iconmark} alt="iconmark" />
            </div>
          </div>


          <div className="template" onClick={() => handleDefaultmailClick('wpxpertise@gmail.com', 'WP Notifier to Slack', 'Facing problem in WP Notifier to Slack')}>
            <div className="logo">
              <img src={defaultEmail} alt="defaultEmail" />
            </div>
            <div className="content">
              <div className="spt-title">Default Email App</div>
              <div className="spt-details">Open your default email app</div>
            </div>
            <div className='iconmark'>
              <img src={iconmark} alt="iconmark" />
            </div>
          </div>

          <div className="template" onClick={() => handleCopyMail('wpxpertise@gmail.com')}>
            <div className="logo">
              <img src={supportmail} alt="supportmail" />
            </div>
            <div className="content">
              <div className="spt-title">wpxpertise@gmail.com</div>
              <div className="spt-details">Copy email address to your clipboard</div>
            </div>
            <div className='iconmark'>
              <img src={iconmark} alt="iconmark" />
            </div>
          </div>

        </div>
        <div className="spt-footer">
          <h4 className="spt-footer-content">powered by <a href='https://www.facebook.com/profile.php?id=100092565099553' target="_blank">WPXPERTISE</a></h4>
        </div>
      </div>
    </div>
  )
}

export default Modal