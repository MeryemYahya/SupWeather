import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Detail from './detail'
import Nav from './navs'
import './style.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: cookies.get('theme'),
      isChecked: cookies.get('checked'),
      visible: false,
      msg: "",
    }
  }

  switch_theme = (e) => {
    if (e.target.checked) {
      this.setState({ theme: '_dark', isChecked: 'checked' })
      cookies.set('theme', '_dark')
      cookies.set('checked', 'checked')
    }
    else {
      this.setState({ theme: '_light', isChecked: '' })
      cookies.set('theme', '_light')
      cookies.set('checked', '')
    }
  }

  onDismiss = () => {
    this.setState({ visible: false })
  }
  showAlert = (alert) => {
    this.setState({ visible: true, msg: alert })
  }

  render() {
    if (cookies.get('isAuthenticated') === 'true')
      return (
        <main className={"cont cont" + this.state.theme}>
          <Nav {...this.state} switch_theme={this.switch_theme} {...this.props} />
          <Switch >
            <Route path="/home" exact> <Home {...this.state} onDismiss={this.onDismiss} showAlert={this.showAlert} /> </Route>
            <Route path="/home/detail" > <Detail {...this.state} /> </Route>
          </Switch>
        </main>
      );

    else return <Redirect to='/' />
  }

}
export default Main;
