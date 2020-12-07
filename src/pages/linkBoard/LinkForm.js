import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'reactstrap';

export default class LinkForm extends React.Component {  
    constructor(props){
        super(props);
        this.initialState = {
            nickName: '',
            url: '',
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
        if(this.props.showTextBox){
                return (
                    <>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridNickName">
                            <Form.Control placeholder="Nick-name" name="nickName" value={this.state.nickName} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridurl">
                            <Form.Control placeholder="Url" name="url" value={this.state.url} onChange={this.handleChange}/>
                            </Form.Group>
                        <div>
                        <Button size="sm" variant="primary" onClick={()=>{this.props.handleClose(); this.props.handleAdd(); this.submitForm();}} value="Submit">
                        Submit
                        </Button>
                        </div>
                        </Form.Row>
                    </Form>
                    </>
                )
        } else{
            return null;
        }
    }
  }
