import React from 'react';
import { Card, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Library from './../../../images/library.jpg';

const styles = {
  cardImage: {
    objectFit: 'cover',
    height: '10rem'
  }
}

const CardItem = ({ building }) => {

  return (
    <Card style={{ width: '18rem', marginTop: "2rem" }}>
      <Card.Img variant="top" style={styles.cardImage} src={building.image} />
      <Card.Body>
        <Card.Title>{building.name}</Card.Title>
        <Card.Text>
          Maximum Occupancy: {building.maxocc} <br /> Current Occupancy: {building.curocc}
        </Card.Text>
        <Link to={`/building/${building.id}`}>
        <Button variant="primary">View Stats</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardItem