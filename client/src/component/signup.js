import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Axios from 'axios';
import logo from './images/logo.png'
import './style.css'
const cookies = new Cookies();

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            passwordC: "",
            msg: "",
            visible: false,
        }

    }

    login = e => {
        e.preventDefault();
        if (this.state.email !== "" && this.state.password !== "" && this.state.passwordC !== "") {

            if (this.state.password.length <= 12 && this.state.password.length >= 6) {

                if (this.state.password === this.state.passwordC) {
                    Axios.post("http://localhost:9000/singup", { login: this.state.email, password: this.state.password, passwordC: this.state.passwordC })
                        .then(response => {
                            if (response.data === 'utilisé') this.setState({ visible: true, msg: "Email already used" })
                            if (response.data === 'empty fields') this.setState({ visible: true, msg: "All feild are required" })
                            if (response.data === 'non identique') this.setState({ visible: true, msg: "Passwords are not identiques" })
                            if (response.data === 'error') this.setState({ visible: true, msg: "Password or email don't match criteria" })
                            if (response.data === 'Done') { this.props.auth(); cookies.set('user', this.state.email) }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

                else this.setState({ msg: "Passwords must be identique", visible: true })
            }
            else this.setState({ msg: " Password lenght must be between 12 and 6", visible: true })
        }
        else this.setState({ msg: "All fields are required", visible: true })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if (!cookies.get('isAuthenticated'))
            return (


                <div className="center shadow px-5 py-4 mt-5 rounded-lg" style={{ 'width': 340, minheight: 450 }}>
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
                        <FormGroup>
                            <Input type="password" name="passwordC" placeholder="confirm password" onChange={this.handleChange} />
                        </FormGroup>
                        <Button onClick={this.login} color="success" className="mt-2" >Signup</Button>
                    </Form>
                    <p className="mt-4">You have an account ? <Link to="/">Login</Link></p>

                </div>
            )
        else return <Redirect to='/home' />
    }
}

export default SignUp;