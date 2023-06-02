import React from 'react';
import PluginList from './pages/PluginList';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Setting';

const App = () => {
    let current_page = window.location.search;

    if(current_page === '?page=wpnts_notifier'){
        return (
            <div className="acb_dashboard" id='acb_dashboard_start'>
              <Dashboard/>
            </div>
         );
    }
    else if(current_page === '?page=wpnts_notifier_authors'){
        return (
            <div className="acb_authors" id='acb_authors_page'>
               <PluginList/>
            </div>
        );
    }
    else if(current_page === '?page=wpnts_notifier_setting'){
        return (
            <div className="acb_setting" id='acb_setting_start'>
                <Setting/>
            </div>
        );
    } 
 
}


export default App; 