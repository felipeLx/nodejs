import React, { ComponentType } from 'react';
import { HashRouter, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

const ChatPage = React.lazy(() => import('./components/Chat/Page/ChatPage'));
const SettingsPage = React.lazy(() => import('./components/Chat/Settings/SettingsPage'));


const BlockedNavigation = withRouter(Navigation as ComponentType<RouteComponentProps>);

function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <BlockedNavigation />
        <Switch>
          <Route exact={true} path='/' component={ChatPage} />
          <Route path='/chat' component={ChatPage} />
          <Route path='/chat/settings' render={props => <SettingsPage {...props} />} />
        </Switch>
      </React.Fragment>
    </HashRouter>
  );
}

export default App;
