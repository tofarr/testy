import React, { FunctionComponent, FC } from 'react';
import { Route, Switch } from 'react-router-dom';

export interface IRoute{
  path: string;
  component: FunctionComponent;
  fuzzy?: boolean
}

interface IProps{
  routes: IRoute[];
}

const Controller: FC<IProps> = ({ routes }) => {

  return (<Switch>
    {routes.map((route) => <Route key={route.path} path={route.path} exact={!route.fuzzy} component={route.component} />)}
  </Switch>);
}

export default Controller;
