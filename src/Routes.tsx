import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './layouts/AppLayout';
import Layout from './layouts/Layout';

const Routes = () => (
  <Router>
    <Switch>
      <PrivateRoute path="/app" component={AppLayout} />
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
);

export default Routes;