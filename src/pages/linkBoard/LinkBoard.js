import React from 'react';
import './../../css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Tile from './Tile.js'
import TileForm from './TileForm';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { LINKBUK_API_BASE_URL } from './../../config/baseUrl';

const confirmationBox = (props) => {
    return (
        <div>
            <Modal size="sm" onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.projectName} {'Are you sure you want to delete this Project'} </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                {this.state.showAddButton? (
                <Button variant="secondary" onClick={()=>this.props.onHide()}>
                    No
                </Button>):(null)}
                {this.state.showAddButton? (
                <Button variant="primary" onClick={ ()=>{this.handleAddHide(); this.handleEntry();} }>
                    Yes
                </Button>): (null)}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const LinkBoardBody = (props) => {
    const tiles = props.TileArray.map((tile, index) => {
        return (
        <div key={index}>
            <Tile tileData={tile} removeProject={props.removeProject}
                name={props.name}
                token={props.token}
                email={props.email}
            />
        </div>
        )
    })

    return tiles
}

export default class LinkBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: false,
            tiles: [],
        };
        this.handleShow = this.handleShow.bind(this);
    }
    
    async deleteProject(itemID, projectName){
        var item = {
            "_id": itemID, "projectName": projectName,
        }
        await fetch(LINKBUK_API_BASE_URL+'/deleteProject', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': this.props.token,
                'email': this.props.email,
            },
            body: JSON.stringify(item)
            })
            .catch((err) => console.log("Server Error", err.statusCode))
    } 

    async getAllTiles(){
        await fetch(LINKBUK_API_BASE_URL+'/showAllProjects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': this.props.token,
                    'email': this.props.email,
                },
            })
            .then(res => res.json())
            .then(tiles => {
                tiles = tiles.list;
                this.setState({ tiles })
            })
            .catch((err) => console.log("Server Error", err.statusCode))
    }

    async addProject(project){
        let config = {
            headers: {
              'token': this.props.token,
              'email': this.props.email,
            }
          }

        var jsonobj = {
            "projectName": project.projectName,
            "short_description": project.short_description,
            "detailed_description": project.detailed_description,            
            "type": "project"
        }
        axios.post(LINKBUK_API_BASE_URL+'/addProject', jsonobj, config)
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getAllTiles();
    }

    handleSubmit = (project) => {
        this.addProject(project)
    }

    removeProject = (itemID, projectName) => {
        // Modal for are you sure?     
        this.deleteProject(itemID, projectName)
            .then(()=>this.getAllTiles());
    }

    handleClose(){
        this.setState({
            showForm: false,
        });
    }

    async handleShow(){
        await this.setState({
            showForm: true,
        });
    }

    render() {
        return (
            <>
            <div className="button-move">
                <Button variant="success" onClick={this.handleShow}>
                +
                </Button>
                <TileForm show={this.state.showForm} onHide={() => this.handleClose()} handleSubmit={this.handleSubmit}/>
            </div><hr></hr>
            <div className="row">
                <LinkBoardBody TileArray={this.state.tiles} removeProject={this.removeProject}
                name={this.props.name}
                token={this.props.token}
                email={this.props.email}
                />
            </div>            
            </>
        );
    }
}