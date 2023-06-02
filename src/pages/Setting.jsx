import React, { useState, useEffect  } from "react";
import Author from "../Components/Author/Author"
import Sitesecurity from "../Components/Security/Security";
import Site from "../Components/Site/Site";
import WooCommerce from "../Components/WooCommerce/WooCommerce";

const Setting = () => {


  return (

    <div className="acb_add_mail" id="acb_add_mail">
     
      <div className="acb_mails_container">
        {/* Start  */}
          <div className="acb_top">
              <h1 className="setting_panel">Slack -<a target="_blank" href="#">Add Slack Webhook</a></h1>
             
              <h1 className="tesing_panel">Live view</h1>
          
          </div>
 
            <Author/>
            <Site/>
            <WooCommerce/>
            <Sitesecurity/>
       
      </div>
  
  </div>

  )
}

export default Setting
