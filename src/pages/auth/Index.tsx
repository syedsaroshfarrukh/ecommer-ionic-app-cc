import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import RecoverPassword from './RecoverPassword';

interface RoutesIF {
    match?: any, // Change the required prop to an optional prop.
}

const Index: React.FC<RoutesIF> = ( {match} ) => (
    <Switch>
        <Redirect exact={true} from={`${match.url}/`} to={`${match.url}/login`} />
        <Route path={`${match.url}/login`} component={Login} exact={true} />
        <Route path={`${match.url}/register`} component={Register} exact={true} />
        <Route path={`${match.url}/recover`} component={RecoverPassword} exact={true} />
    </Switch>
);

export default Index;
