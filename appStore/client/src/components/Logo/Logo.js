import React from 'react';

import brandLogo from '../../assets/images/logo.png';
import './Logo.css';

const logo = (props) => (
    <div className='logo-store' style={{height: props.height}}>
        <a href='/'><img src={brandLogo} alt="MyLogo" /></a>
    </div>
);

export default logo;