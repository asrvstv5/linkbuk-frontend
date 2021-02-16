import React from 'react';
import Table from './Table'
import LinkForm from './LinkForm.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { LINKBUK_API_BASE_URL } from './../../config/baseUrl';


export default class LinkBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextBox: false,
            showAddButton: true,
            linkArray: [],
        };
        this.handleEntry = this.handleEntry.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddShow = this.handleAddShow.bind(this);
        this.handleAddHide = this.handleAddHide.bind(this);
    }

    async deleteUrl(itemID){
        var item = {
            "_id": itemID,
        }
        console.log("Deleting item...............")
        console.log("Deleting Url ", item);
        await fetch(LINKBUK_API_BASE_URL+'/deleteUrl', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': this.props.token,
                'email': this.props.email,
            },
            body: JSON.stringify(item)
            })
            .then(res => console.log(res))
            .catch((err) => console.log("Server Error", err.statusCode))
    } 

    async getAllUrls(){
        fetch(LINKBUK_API_BASE_URL+'/showAllUrls?projectId='+this.props.projectId, {
            method: 'GET',
            headers: {
               'token': this.props.token, 
               'email': this.props.email,
            }
        })
            .then(res => res.json())
            .then(linkArray => {
                linkArray = linkArray.list;
                this.setState({ linkArray })})
            .catch((err) => console.log("Server Error", err.statusCode))
    }

    async addUrl(link){
        let config = {
            headers: {
              'token': this.props.token,
              'email': this.props.email,
            }
          }

        var jsonobj = {
            "nickName": link.nickName,
            "url": link.url,
            "projectId": this.props.projectId,
            "type": "url"
        }
        console.log("Adding Urls");
        await axios.post(LINKBUK_API_BASE_URL+'/addUrl', jsonobj, config)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getAllUrls();
    }

    handleSubmit = (link) => {
        this.addUrl(link)
            .then(()=>this.getAllUrls());
    }

    removeLink = (itemID) => {    
        this.deleteUrl(itemID)
            .then(()=>this.getAllUrls());
    }

    handleEntry(){
        this.setState({
            showTextBox: true,
        });
    }

    handleClose() {
        this.setState({
            showTextBox: false
        })
    }

    handleAddHide() {
        this.setState({
            showAddButton: false
        })
    }

    handleAddShow() {
        this.setState({
            showAddButton: true
        })
    }

    render() {
        return (
            <Modal size="lg" show={this.props.show} onHide={() => this.props.onHide()}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.projectName} {' Links'} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table linkData={this.state.linkArray} removeLink={this.removeLink} />  
                </Modal.Body>
                <Modal.Footer>
                {this.state.showAddButton? (
                <Button variant="secondary" onClick={()=>this.props.onHide()}>
                    Close
                </Button>):(null)}
                {this.state.showAddButton? (
                <Button variant="primary" onClick={ ()=>{this.handleAddHide(); this.handleEntry();} }>
                    +
                </Button>): (null)}
                <LinkForm showTextBox={this.state.showTextBox} handleClose={()=>this.handleClose()} handleAdd={()=>this.handleAddShow()} handleSubmit={this.handleSubmit} />
                </Modal.Footer>
            </Modal>
        );
    }
}
