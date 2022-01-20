import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { Container, Row, Col } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


class Detail extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            temp: {},
            weather: [],
            wind: {},
            Today: [],
            Day1: [],
            Day2: [],
            Day3: [],
            Day4: [],
            Day5: [],
            clouds: ""
        }
    }

    day = date => {
        var d = new Date(date)
        var day = d.getDay()
        let mapday = new Map()
        mapday.set(0, 'Monday')
            .set(1, 'Tuesday')
            .set(2, 'Wednesday')
            .set(3, 'Thursday')
            .set(4, 'Friday')
            .set(5, 'Saturday')
            .set(6, 'Sunday')

        return mapday.get(day)
    }
    formatDate = date => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    formatTime = date => {
        var d = new Date(date),
            hours = '' + d.getHours(),
            minuts = '' + d.getMinutes(),
            seconds = d.getSeconds();

        if (hours < 10)
            hours = '0' + hours;
        if (minuts < 10)
            minuts = '0' + minuts;
        if (seconds < 10)
            seconds = '0' + seconds;

        return hours + "h";
    }

    componentDidMount() {
        var url_string = window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("id");
        this.setState({ id: c })

        Axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${c}&APPID=dd4bfe9cf2ab6096faa67b6ef51b2bb0&units=metric`)
            .then(response => {
                this.setState({
                    weather: response.data.weather[0],
                    temp: response.data.main,
                    name: response.data.name,
                    wind: response.data.wind,
                    clouds: response.data.clouds.all
                })
            })

        Axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${c}&APPID=dd4bfe9cf2ab6096faa67b6ef51b2bb0&units=metric`)
            .then(response => {
                var forcast = response.data.list
                var date = new Date()
                this.setState({
                    today: new Date(),
                    day1: date.setDate(date.getDate() + 1),
                    day2: date.setDate(date.getDate() + 1),
                    day3: date.setDate(date.getDate() + 1),
                    day4: date.setDate(date.getDate() + 1),
                    day5: date.setDate(date.getDate() + 1),
                })
                this.setState({
                    Today: forcast.filter(day => this.formatDate(day.dt_txt) === this.formatDate(this.state.today)),
                    Day1: forcast.filter(day => this.formatDate(day.dt_txt) === this.formatDate(this.state.day1)),
                    Day2: forcast.filter(day => this.formatDate(day.dt_txt) === this.formatDate(this.state.day2)),
                    Day3: forcast.filter(day => this.formatDate(day.dt_txt) === this.formatDate(this.state.day3)),
                    Day4: forcast.filter(day => this.formatDate(day.dt_txt) === this.formatDate(this.state.day4)),
                    Day5: forcast.filter(day => this.formatDate(day.dt_txt) === this.formatDate(this.state.day5)),
                })
            })
    }



    render() {

        return (
            <div className="p-3">
                <Link to="/home" className="text-decoration-none text-dark"><ArrowBackIosIcon />Back</Link>
                <Container className={"mt-3 pt-4 shadow-lg rounded detail" + this.props.theme}>

                    <Row className="mb-4 mx-5">

                        <Col xs="12" md="6" lg="6" sm="12">

                            <img src={"http://openweathermap.org/img/wn/" + this.state.weather.icon + "@2x.png"} className="float-left " alt="" width="100" height="100" />
                            <h4>{this.state.name}</h4>
                            <h5 className="mb-0">{parseInt(this.state.temp.temp)}°</h5>
                            <p className="">{this.state.weather.description}</p>

                        </Col>
                        <Col className="" >

                            <p className="mb-0">Clouds : {this.state.clouds} %</p>
                            <p className="mb-0">Pressure : {this.state.temp.pressure} hPa</p>
                            <p className="mb-0">Humidity : {this.state.temp.humidity} %</p>
                            <p className="mb-0">Wind : {this.state.wind.speed} m/sec</p>
                        </Col>
                    </Row>



                    <Row className="py-4 px-3">
                        <Col className={"m-auto py-2 rounded shadow forcat" + this.props.theme} xs="12" sm="5" md="5" lg="2">
                            <h5 className="text-center">Tomorrow</h5>
                            <Row>
                                {this.state.Day1.map(day =>
                                    <Col className=" p-2 " md="3" lg="3" xs="3" sm="3" key={day.dt}>
                                        <p className="mb-0 text-center">{this.formatTime(day.dt_txt)}</p>
                                        <img src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} className="m imgcenter" alt="" />
                                        <p className="mb-0 text-center"> {parseInt(day.main.temp)}°</p>
                                    </Col>
                                )
                                }
                            </Row>

                        </Col>


                        <Col className={"m-auto py-2 rounded shadow forcat" + this.props.theme} xs="12" sm="5" md="5" lg="2">
                            <h5 className="text-center">{this.day(this.state.day2)}</h5>
                            <Row>
                                {this.state.Day2.map(day =>
                                    <Col className="p-2" md="3" lg="3" xs="3" sm="3" key={day.dt}>
                                        <p className="mb-0 text-center">{this.formatTime(day.dt_txt)}</p>
                                        <img src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} className="m imgcenter" alt="" />
                                        <p className="mb-0 text-center"> {parseInt(day.main.temp)}°</p>
                                    </Col>
                                )
                                }
                            </Row>
                        </Col>


                        <Col className={"m-auto py-2 rounded shadow forcat" + this.props.theme} xs="12" sm="5" md="5" lg="2">
                            <h5 className="text-center">{this.day(this.state.day3)}</h5>
                            <Row>
                                {this.state.Day3.map(day =>
                                    <Col className="p-2 " md="3" lg="3" xs="3" sm="3" key={day.dt}>
                                        <p className="mb-0 text-center">{this.formatTime(day.dt_txt)}</p>
                                        <img src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} className="m imgcenter" alt="" />
                                        <p className="mb-0 text-center"> {parseInt(day.main.temp)}°</p>
                                    </Col>
                                )
                                }
                            </Row>
                        </Col>


                        <Col className={"m-auto py-2 rounded shadow forcat" + this.props.theme} xs="12" sm="5" md="5" lg="2">
                            <h5 className="text-center">{this.day(this.state.day4)}</h5>
                            <Row>
                                {this.state.Day4.map(day =>
                                    <Col className="p-2" md="3" lg="3" xs="3" sm="3" key={day.dt}>
                                        <p className="mb-0 text-center">{this.formatTime(day.dt_txt)}</p>
                                        <img src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} className="m imgcenter" alt="" />
                                        <p className="mb-0 text-center"> {parseInt(day.main.temp)}°</p>
                                    </Col>
                                )
                                }
                            </Row>
                        </Col>

                        {this.state.Day5.length > 0 ?
                            <Col className={"m-auto py-2 rounded shadow forcat" + this.props.theme} xs="12" sm="5" md="5" lg="2">
                                <h5 className="text-center">{this.day(this.state.day5)}</h5>
                                <Row>
                                    {this.state.Day5.map(day =>
                                        <Col className="p-2" md="3" lg="3" xs="3" sm="3" key={day.dt}>
                                            <p className="mb-0 text-center">{this.formatTime(day.dt_txt)}</p>
                                            <img src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} className="m imgcenter" alt="" />
                                            <p className="mb-0 text-center"> {parseInt(day.main.temp)}°</p>
                                        </Col>
                                    )
                                    }
                                </Row>
                            </Col>

                            : <span></span>}
                    </Row>
                </Container>

            </div>
        );
    }

}

export default Detail;
