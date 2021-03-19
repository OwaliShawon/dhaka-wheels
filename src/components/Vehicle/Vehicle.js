import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Vehicle = (props) => {
    const { id, type, image } = props.vehicle;
    return (

        // <div>
        //     <h1>{id}</h1>
        //     <img src={image} alt=""/>
        //     <h1>{type}</h1>
        // </div>


        <Col>
            <Button style={{ margin: '10px' }}>
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title style={{ color: 'black' }}>{type}</Card.Title>
                    </Card.Body>
                </Card>
            </Button>
        </Col>
    );
};

export default Vehicle;