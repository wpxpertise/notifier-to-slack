import App from "./App";
import React from 'react';
import { render } from '@wordpress/element';

window.addEventListener('DOMContentLoaded', (event) => {

    var dashboard = document.getElementById('wpcts_dashboard');
    var authors = document.getElementById('wpcts_authors');
    var setting = document.getElementById('wpcts_setting');

    if (dashboard) {
       render(
            <App />
       , dashboard);
    }
    if (authors) {
       render(
            <App />
       , authors);
    }
    if (setting) {
        render(<App />, setting);
    }

});