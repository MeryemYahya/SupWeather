import React, { Component } from 'react'
import Axios from 'axios';
import { Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Card, CardBody, CardTitle, Alert } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import data from './city.list.json';
import './style.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class AddCity extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            selectedcity: [],
            temp: '',
            visible: false,
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal, selectedcity: [] })
    }

    selectdata = event => {
        event.preventDefault()
        if (event.target.value === '') this.setState({ selectedcity: [] })
        else {
            var array = data.filter(d => d.name.toLowerCase().startsWith(event.target.value))
            this.setState({ selectedcity: array.slice(0, 7) })
        }
    }

    addcity = (e, id, name) => {
        e.preventDefault();
        Axios.post("http://localhost:9000/cities",
            {
                name: name,
                id: id,
                login: cookies.get('user'),
            })
            .then(response => {
                if (response.data === 'existed') { this.setState({ visible: true }) }
                if (response.data === 'added') {
                    this.props.add({
                        id: id,
                        name: name
                    })
                    this.setState({ modal: false })
                }
            })
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={"navb" + this.props.theme} >
                    <ModalHeader toggle={this.toggle} className={"navb" + this.props.theme}>Search city</ModalHeader>

                    <ModalBody className={"pb-3 navb" + this.props.theme}>
                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                            City already added
                        </Alert>
                        <input type="text" onChange={this.selectdata} className={"form-control navb" + this.props.theme} />
                        <ListGroup className='shadow'>
                            {
                                this.state.selectedcity.map(city =>
                                    <ListGroupItem key={city.id} onClick={(e) => this.addcity(e, city.id, city.name)} style={{ 'cursor': 'pointer' }} className={"navb" + this.props.theme}>
                                        <span className={"navb" + this.props.theme}> {city.name + "   "}<b>{city.country}</b></span>
                                    </ListGroupItem>
                                )
                            }
                        </ListGroup>
                    </ModalBody>

                </Modal>


                <Card className={"shadow mx-5 p-4 mt-5 card" + this.props.theme} style={{ height: 375, width: 275 }}  >
                    <CardTitle className="text-center ">Add city</CardTitle>
                    <CardBody className="pt-0">

                        <Fab color="primary" aria-label="add" className="d-flex center mt-3" onClick={this.toggle}>
                            <AddIcon />
                        </Fab>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default AddCity;