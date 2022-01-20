import React, { Component } from 'react'
import './style.css'
import CityCard from './citycard'
import Slider from "react-slick";
import Axios from 'axios'
import AddCity from './addcity'
import { Alert } from 'reactstrap';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Home extends Component {

    constructor() {
        super();
        this.state = {
            cities: [],

        }
    }
    addCity = (city) => {
        var array = this.state.cities
        array.push(city)
        this.setState({ cities: array })
        this.props.showAlert("City added")
    }

    delCity = (id) => {
        var array = this.state.cities.filter(c => c.id !== id)
        this.setState({ cities: array })
        this.props.showAlert("City deleted")
    }

    componentDidMount() {
        var login = cookies.get('user');
        Axios.get(`http://localhost:9000/cities/${login}`)
            .then(response => {
                this.setState({ cities: response.data.cities });
            })
    }



    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 990,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 0
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <>
                <Alert color="success" className="float-right mt-3 mr-1" isOpen={this.props.visible} toggle={this.props.onDismiss} style={{ width: 250 }}>
                    {this.props.msg}
                </Alert>
                <div className="container ">

                    <Slider {...settings} >
                        <AddCity add={this.addCity} theme={this.props.theme} alert={this.props.showAlert} />
                        {
                            this.state.cities.map(city =>
                                <CityCard nameCity={city.name} idCity={city.id} key={city.id} theme={this.props.theme} showAlert={this.props.showAlert} delete={this.delCity} />
                            )
                        }
                    </Slider>

                </div>

            </>

        );
    }

}

export default Home;