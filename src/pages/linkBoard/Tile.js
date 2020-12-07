import React from 'react';
import LinkBox from './LinkBox.js'
import { IoIosTrash } from "react-icons/io";

export default class Tile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hover: false,
            show: false,
        };
        this._handleHoverToggle = this._handleHoverToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose(){
        this.setState({
            show: false,
        });
    }

    handleShow(){
        this.setState({
            show: true,
        });
    }

    _handleHoverToggle(){
        this.setState({
            hover: !this.state.hover,
        });
    }

    render() {
        return(
            <>
            <div className="tile" onMouseEnter={this._handleHoverToggle} onMouseLeave={this._handleHoverToggle}>
            <button className="trash-btn-tile" onClick={() => this.props.removeProject(this.props.tileData._id, this.props.tileData.project_name)}><IoIosTrash /></button>
            <div onClick={this.handleShow}>
                <div className = "content text">
                    <b>{this.props.tileData.project_name}</b>
                    <br />
                    {this.state.hover? this.props.tileData.detailed_description : this.props.tileData.short_description}
                </div>
            </div>
            </div>
            <LinkBox show={this.state.show} onHide={() => this.handleClose()} projectName={this.props.tileData.project_name} projectId={this.props.tileData._id}
                name={this.props.name}
                token={this.props.token}
                email={this.props.email}
            />
            </>
        );
    }
}
