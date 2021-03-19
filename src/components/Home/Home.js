import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import fakeData from '../../fakeData/fakeData'
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const [vehicles, setVehicle] = useState([]);

    useEffect(() => {
        setVehicle(fakeData);
    }, [])

    // console.log(vehicles);

    return (
        <Row>
            {
                vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
            }
        </Row>
    );
};

export default Home;