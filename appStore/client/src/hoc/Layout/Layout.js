import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Bootstrap/Footer/Footer';

const layout = React.memo(props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    isAdmin={props.isAdmin} 
                    drawerToggleClicked={sideDrawerToggleHandler} />
                
                <SideDrawer
                    isAuth={props.isAuthenticated} 
                    isAdmin={props.isAdmin} 
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className='content'>
                    <div className='main-content'>
                        {props.children}
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </Aux>
        )
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isAdmin: state.auth.isAdmin
    };
};

export default connect (mapStateToProps) (layout);