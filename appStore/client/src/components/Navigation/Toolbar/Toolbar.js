import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className='toolbar-fixed'>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className='logo-store'>
            <Logo />
        </div>
        <nav className='desktopOnly'>
            <NavigationItems isAuthenticated={props.isAuth} isAdmin={props.isAdmin} />
        </nav>
    </header>
);

export default toolbar;