import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Axios from 'axios';
import logo from './images/logo.png'
import './style.css'
const cookies = new Cookies();

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            msg: "",
            visible: false
        }

    }

    login = e => {
        e.preventDefault();

        if (this.state.email !== "" && this.state.password !== "") {
            Axios.post("http://localhost:9000/login",
                {
                    login: this.state.email,
                    password: this.state.password
                }

            )
                .then(response => {
                    console.log(response)
                    if (response.data === 'empty fields') this.setState({ visible: true, msg: "All feild are required" })
                    if (response.data === 'mdp incorrect') this.setState({ visible: true, msg: "Wrong password" })
                    if (response.data === 'non trouvé') this.setState({ visible: true, msg: "Wrong email" })
                    if (response.data === 'aut') {
                        this.props.auth(); cookies.set('user', this.state.email)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else this.setState({ msg: "All fields are required", visible: true })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if (!cookies.get('isAuthenticated'))
            return (


                <div className="center shadow px-5 py-4 mt-5 rounded-lg" style={{ 'width': 340, minheight: 400 }}>
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.msg}
                    </Alert>

                    <div className="float-left mb-4 mt-3 logo logo_light center" >
                        <img src={logo} className="mx-2 float-left " alt="" style={{ width: 40, height: 40 }} />
                        <h2>Supweather</h2>
                    </div>



                    <Form>
                        <FormGroup>
                            <Input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" placeholder="password" onChange={this.handleChange} />
                        </FormGroup>
                        <Button outline onClick={this.login} color="success" className="mt-2">Login</Button>
                    </Form>
                    <p className="mt-4">Don't have an account ? <Link to="/singup">SIGN UP</Link></p>

                </div>
            )
        else return <Redirect to='/home' />
    }
}

export default Login;