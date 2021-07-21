import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Loader} from "../lib/ui";
import { useUser } from "../hooks/use-user";

const User = React.lazy(() => import("./user/index"));
const Guest = React.lazy(() => import("./guest/index"));

const Index = () => {
  const {user} = useUser()

  // Fetch language and current user data
  return <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
    <Router>
      <Switch>
        <Route exact path="**" render={() =>
          user ? <User/> : <Guest/>
        }/>
      </Switch>
    </Router>
  </React.Suspense>
};

export default Index;