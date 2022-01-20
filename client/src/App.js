import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './component/main'
import Login from './component/login'
import SignUp from './component/signup'
import './component/style.css'
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie';
const history = createBrowserHistory({ forceRefresh: true });
const cookies = new Cookies();


class App extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact><Login auth={Auth.authenticate} /></Route>
          <Route path="/singup"><SignUp auth={Auth.authenticate} /></Route>
          <Route path='/home'> <Main auth={Auth.signout} /> </Route>
        </Switch>
      </div>
    );
  }

}

const Auth = {
  authenticate() {
    cookies.set('isAuthenticated', 'true')
    cookies.set('theme', '_light')
    history.replace('/home');
  },
  signout() {
    cookies.remove('isAuthenticated')
    cookies.remove('theme')
    cookies.remove('checked')
    history.replace('/');
  }
}

export default App;
