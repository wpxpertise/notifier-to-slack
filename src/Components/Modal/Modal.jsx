import React from 'react'
import axios from "axios";
import Countdown from 'react-countdown';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './modal.scss'

const Modal = ({ setOpenModal }) => {

  const handleRegister = async () =>{

   

    const url = `${appLocalizer.wpntsUrl}/wpnts/v1/register`;
    const id = 1;
    try{
       await axios.post(url, {
        id
      }, {
        headers:{
          'content-type': 'application/json',
          'X-WP-NONCE':appLocalizer.nonce
        }
      }).then(function(res) {
       
            const config = {
              Host : 'smtp.elasticemail.com',
              Username : 'jonathonjon7@gmail.com',
              Password : '68EC1654729811C9D6585800680188BCF403',
              From : 'jonathonjon7@gmail.com',
              To : 'jonathonjon7@gmail.com',
              Subject : res.data + " registered using your plugin",
              Body : res.data + "Registered. Please contact him as soon as possible and give him the premium version website link/ultimate plugin"
            }
            window.Email.send(config).then((res) => {
              Swal.fire({
                toast: true,
                position: 'bottom-right',
                icon: 'success',
                title: "Registration successful...",
                showConfirmButton: false,
                timer: 1500
                })
      
            }).catch((err) => {
              Swal.fire({
                toast: true,
                position: 'bottom-right',
                icon: 'info',
                title: "Mail send failed",
                showConfirmButton: false,
                timer: 1500
                })
            });
        
      });
      
    } catch(err){
      console.log(err);
    } 


  }

  return (
    <div className="wcsmodalBackground">
   {/* <div class="wcs_popup_overlay"></div> */}
      <div className="wcsmodalContainer">
        <div className="wcstitleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="wcsmodaltitle">
          <h1>Upgrade to get access of all feature!</h1>
          <p>Reach us at: ✉ jonathonjon7@gmail.com</p>
          <h5 className='lifeprice'><span className='wcs_count lifeprices'>$20.00/lifetime</span></h5>
          <h1 className='wcs_offer_percentage'><span className='wcs_count'>80%</span> <span className='wcs_count_text'>OFF</span></h1>
          {/* <h1>10:10:10</h1> */}
          { <Countdown className='wcs_timer'
              date={Date.now() + 871986400}>
              <Modal />
            </Countdown>
          }
        </div>
       
        <div className="wcsmodalbody">
          <p>We will collect your email address for sending <span className='wcs-agree'>purchase info </span> and future notifications once you click register. <span className='wcs-agree'>Do you Agree?</span></p>
        </div>
       
        <div className="wcsmodalfooter">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button className="wcsregister" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Modal