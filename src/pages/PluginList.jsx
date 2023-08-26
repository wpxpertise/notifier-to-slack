import React, { useState, useEffect  } from "react";
import axios from "axios";
import ReactPlayer from 'react-player'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Form from "./Form"
import image from '../../assets/dashboard-logo.png'
import Modal from '../Components/Modal/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css'
import "./fromstyle.scss";
import 'sweetalert2/src/sweetalert2.scss' 

const PluginList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [pluginslist, setPluginslist] = useState([]);

    useEffect(() => {
        const saveForm = localStorage.getItem("pluginslist");
        try {
            const parsedForm = JSON.parse(saveForm);
            setPluginslist(parsedForm || []);
            // console.log(pluginslist);
          } catch (error) {
            // console.error(error);
            setPluginslist([]);
          }

      }, []);


    const addPlugin = async e => {

      if (pluginslist.length >= 4) {
        setModalOpen(true)
        Swal.fire({
          toast: true,
          position: 'bottom-right',
          icon: 'success',
          title: "Already 4 plugins added. Please remove one to add a new one.",
          showConfirmButton: false,
          timer: 1900
        })
        
        return;
      }

        const newPlugin = {
          id: Date.now(),
          title: `Plugin- ${pluginslist.length + 1}`,
          content: `plugin name- ${pluginslist.length + 1}`
        };

        const updatePluginslist= [...pluginslist, newPlugin];
        setPluginslist(updatePluginslist);
        localStorage.setItem("pluginslist", JSON.stringify(updatePluginslist));

        /**
         * Add new plugin list name 
         * 
         */
        const url = `${appLocalizer.wpntsUrl}/wpnts/v1/org_plugin_name`;
        try{
          const res = await axios.post(url, { updatePluginslist
          }, {
            headers:{
              'content-type': 'application/json',
              'X-WP-NONCE':appLocalizer.nonce
            }
          }).then(function(res) {
            console.log(res)
            console.log(updatePluginslist)
          });
          
        } catch(err){
          // console.log(err);
        }
        
    };
    
    const deletePlugin = (id) => {
        const filteredPluginlist = pluginslist.filter(
            (pluginslist) => pluginslist.id !== id);
        setPluginslist(filteredPluginlist);
        localStorage.setItem("pluginslist", JSON.stringify(filteredPluginlist));
    };


      // add plugin  
      const handleContentChange = (id, newContent) => {
        const updatePluginslist = pluginslist.map((plist) => {
          if (plist.id === id) {
            return { ...plist, content: newContent };
          } else {
            return plist;
          }
        });
        setPluginslist(updatePluginslist);
        localStorage.setItem("pluginslist", JSON.stringify(updatePluginslist));
      };

      //save
      const handleSaveAll = (id, newContent) => {
        const updatePluginslist = pluginslist.map((plist) => {
          if (plist.id === id) {
            return { ...plist, content: newContent };
          } else {
            return plist;
          }
        });
        setPluginslist(updatePluginslist);
        localStorage.setItem("pluginslist", JSON.stringify(updatePluginslist));


        /**
         * update plugin list name 
         * 
         */
        const url = `${appLocalizer.wpntsUrl}/wpnts/v1/org_plugin_name`;
        try{
          const res = axios.post(url, { updatePluginslist
          }, {
            headers:{
              'content-type': 'application/json',
              'X-WP-NONCE':appLocalizer.nonce
            }
          }).then(function(res) {
            // console.log(updatePluginslist)
          });
          
        } catch(err){
          console.log(err);
        }


        Swal.fire({
          toast: true,
          position: 'bottom-right',
          icon: 'success',
          title: "Plugin name updated",
          showConfirmButton: false,
          timer: 1500
        })

      };



  return (

    <div className="acb_add_mail" id="acb_add_mail">
     
      <div className="acb_mails_container">
        {/* Start  */}
          <div className="acb_top">
              <img className="wpnts_logo_footer" src={image} alt="staff" /> 
              <h1 className="setting_panel">Plugin List -<a target="_blank" href="https://slack.com/signin#/signin">Add Plugin slug from WordPress ORG</a></h1>
             
              <h1 className="tesing_panel">Guideline Video <VideoLibraryIcon/></h1>
          
          </div>
          <div className="acb_bottom" id='acb_bottom'>
              <div className="acb_left">
            
                    <div className="wpnts-form-list">
                    <div className="wpntsbtn">
                      <button className="wpnts-add-form" onClick={addPlugin}>
                        Add Plugin
                        <span className="wcs_tooltip_class">
                          <Tippy content="Add your desirable plugin slug e.g notifier-to-slack from WordPress ORG plugin page">
                            <span className="wcs_title"><HelpOutlineIcon className='wcs_tooltip_icon'/></span>
                        </Tippy>
                        </span>
                      </button>
                      
                      <button className="wpnts-save-form" onClick={handleSaveAll}>Update</button>
                    </div>
                    {pluginslist.map((plist) => (
                        <Form
                        id={plist.id}
                        key={plist.id}
                        title={plist.title}
                        content={plist.content}
                        onDelete={() => deletePlugin(plist.id)}
                        onContentChange={handleContentChange}
                        />
                    ))}
                    </div>

              </div>
              <div className="acb_right">
                {/* Right  */}

                  {/* video  */}

                  <div className='wcs-player-wrapper'>
                    {/* <ReactPlayer
                      className='wcs-react-player'
                      url='https://youtu.be/uuN7O5lqezU'
                      width='100%'
                      height='100%'
                    /> */}

                  <ReactPlayer
                    className='wcs-react-player'
                    url='https://youtu.be/uuN7O5lqezU'
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
        {/* End  */}
        {/* <img className="wpnts_logo_footer" src={image} alt="staff" />  */}
      </div>
      {modalOpen && <><div class="wcs_popup_overlay"></div> <Modal setOpenModal={setModalOpen} /> </> }
  </div>

  )
}

export default PluginList
