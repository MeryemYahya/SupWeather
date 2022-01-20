import React, { Component } from 'react';
import './style.css'
import { ListGroup} from 'reactstrap';
import logo from './images/logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Navs extends Component {

    constructor() {
        super();
        this.state = {
       width : "0px"
        }
    }
    openNav = () => {
       this.setState({width:"300px"})
    }
    closeNav = () => {
       this.setState({width: "0px" })
    }
    render() {
        return (
            <>


                <div className={"shadow p-3 navbar navb navb" + this.props.theme}>
                    <div className={"float-left logo logo" + this.props.theme} >
                        <MenuIcon style={{ fontSize: 30 }} className="menu_icon" onClick={this.openNav}/>
                        <img src={logo} className="logo_img mx-2 s" alt="" />
                        <h4 className="s">Supweather</h4>
                    </div>
                    
                    <h4 className="center" >Today</h4>

                    <div className="float-right s">
                        
                            Light
                        <label className="switch mx-2">
                                <input type="checkbox" onChange={this.props.switch_theme} checked={this.props.isChecked} />
                                <span className="slider round"></span>
                        </label>
                            Dark
                    
                    
                
                    </div>
                
                </div>

                <div id="mySidenav" className={"sidenav sidenav"+this.props.theme} style={{width:this.state.width}}>
                    <span className={"closebtn closebtn" + this.props.theme} onClick={this.closeNav}>&times;</span>
                    <ListGroup>
                        
                        
                    <div className={"float-left mb-3 ml-3 logo logo" + this.props.theme} >
                        <img src={logo} className="logo_img mx-2" alt="" />
                        <h4>Supweather</h4> 
                    </div>
                        
                <h5 className="ml-4 mb-4">{cookies.get('user')}</h5>

                    <div className="float-left mb-3 ml-4 p" style={{width:300}}> 
                       Light
                        <label className="switch mx-2 ">
                                <input type="checkbox" onChange={this.props.switch_theme} checked={this.props.isChecked}/>
                                <span className="slider round"></span>
                        </label>
                        Dark  
                    </div>
                      
                        <button onClick={this.props.auth} className="btn btn-info mx-4">Logout</button>
                    </ListGroup>
                </div>




            </>

        );
    }
}

export default Navs;