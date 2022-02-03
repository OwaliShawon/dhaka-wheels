import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const { id, type, image } = props.vehicle;
    const handleVehicleClick = () => {
        console.log('Vehicle clicked');
        // <Router>
        //     <Switch>
        //         <Router path='/destination'>
        //             <Destination></Destination>
        //         </Router>
        //     </Switch>
        // </Router>

    }
    return (
        <Col ol>
            <Link to='/destination'>
                <Button onClick={handleVehicleClick} style={{ margin: '10px' }}>
                    <Card className='p-5' style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title style={{ color: 'black' }}>{type}</Card.Title>
                        </Card.Body>
                    </Card>
                </Button>
            </Link>

        </Col>
    );
};

export default Vehicle;