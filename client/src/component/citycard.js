import React, { Component } from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './style.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class CityCard extends Component {
    constructor() {
        super()
        this.state = {
            temp: {},
            weather: []
        }
    }

    componentDidMount() {
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${this.props.idCity}&APPID=OpenWeatherMap_API_key&units=metric`)
            .then(response => {
                this.setState({
                    weather: response.data.weather[0],
                    temp: response.data.main
                })
            })
    }

    removeCity = () => {
        Axios.put("http://localhost:9000/cities", { login: cookies.get('user'), id: this.props.idCity, name: this.props.nameCity })
            .then(response => {
                this.props.delete(this.props.idCity)
            })
    }


    render() {
        return (

            <Card className={"shadow mx-5 p-3 mt-5 card" + this.props.theme} style={{ height: 375, width: 275 }}>

                <CardSubtitle>
                    <IconButton aria-label="delete" className="float-right p-0" onClick={this.removeCity}>
                        <DeleteIcon className="text-danger" />
                    </IconButton>
                </CardSubtitle>

                <Link to={"/home/detail?id=" + this.props.idCity} className="text-decoration-none">
                    <CardTitle className="text-center mb-0">{this.props.nameCity}</CardTitle>
                    <CardBody className="pt-0">
                        <img src={"http://openweathermap.org/img/wn/" + this.state.weather.icon + "@2x.png"} className="center" alt="" width="100" height="100" />

                        <CardSubtitle className="text-center tempMain">{parseInt(this.state.temp.temp)}°</CardSubtitle>

                        <CardSubtitle className="text-center ">{this.state.weather.main}</CardSubtitle>

                        <CardSubtitle className="float-left" style={{ width: 40 }}>
                            <span className="float-left align-top d-block min"><ArrowDropDownIcon /></span>
                            <span className="float-left align-middle d-block temp">{parseInt(this.state.temp.temp_min)}°</span>
                            <span className="float-left align-bottom d-block min">Min</span>
                        </CardSubtitle>

                        <CardSubtitle className="float-right" style={{ width: 40 }}>
                            <span className="float-left align-top d-block max"><ArrowDropUpIcon /></span>
                            <span className="float-left align-middle d-block temp">{parseInt(this.state.temp.temp_max)}°</span>
                            <span className="float-left align-bottom d-block max">Max</span>
                        </CardSubtitle>
                        <CardText></CardText>

                    </CardBody>
                </Link>
            </Card>

        );
    }

}

export default CityCard;
