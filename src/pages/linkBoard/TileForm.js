import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
 
export default class TileForm extends React.Component {
    constructor(props){
        super(props);
        this.initialState = {
            projectName: '',
            short_description: '',
            detailed_description: ''
        }
        this.state = this.initialState;
    }

    handleChange = (event)=>{
        const {name, value} = event.target;

        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        return (
            <Modal size="lg" show={this.props.show} onHide={() => this.props.onHide()}>
                <Modal.Header closeButton>
                <Modal.Title>Create new tile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control placeholder="Enter project name" name="projectName" value={this.state.projectName} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>One line description</Form.Label>
                            <Form.Control placeholder="Enter a single line description of the project." name="short_description" value={this.state.short_description} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Detailed description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Enter Detailed description." name="detailed_description" value={this.state.detailed_description} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={()=>this.submitForm()} value="Submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.props.onHide()}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
