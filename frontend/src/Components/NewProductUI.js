import React, { Component } from 'react';
import * as fb from '../firebasefunctions';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import Form from 'react-bootstrap/lib/Form';

class NewProductUI extends Component {



    add = (e) => {
        e.preventDefault();
        var product = {
            name : document.getElementById('name').value,
            brand : document.getElementById('brand').value,
            rating : document.getElementById('rating').value,
            type : document.getElementById('type').value
        };
        var file = document.getElementById('image').files[0];
        var email = this.props.email;
        fb.addProduct(email, product, file).then(this.props.finish);
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Product Name: </Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group controlId="brand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group controlId="rating">
                    <Form.Label>Rating: </Form.Label>
                    <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="type">
                    <Form.Label>Type: </Form.Label>
                    <Form.Control as="select">
                    <option>Shampoo</option>
                    <option>Conditioner</option>
                    <option>Gel</option>
                    <option>Oil</option>
                    <option>Cream</option>
                    <option>Butter</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Control type="file"/>
                </Form.Group>
                
                <Form.Row>
                <ButtonToolBar>
                    <Button variant="danger" >
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={ (e) => this.add(e) }>
                        Save
                    </Button>
                    </ButtonToolBar>
                </Form.Row>
            </Form>
        );
      }
}

export default NewProductUI;