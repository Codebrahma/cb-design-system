import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Components from './components';

export default () => (
  <Router>
    <Switch>
      <Route path="/" component={() => "Welcome to CB Design System"} exact />
      <Route path="/components" component={Components} />
    </Switch>
  </Router>
)
