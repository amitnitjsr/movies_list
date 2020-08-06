import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardImg } from 'reactstrap';
import Axios from 'axios';
import './Movies_Card.css';

class Movies_Card extends Component {
    state = {
        movies_details: null,
    }

    componentDidMount() {
        let data = {
            "category": "movies",
            "sort": "voting",
            "language": "kannada",
            "genre": "all"
        }
        Axios.post('/movieList', data)
            .then((response) => {
                this.setState({ movies_details: response.data.result });
            })
            .catch((error) => {
                console.log('Error', error)
            })
    }

    render() {
        return (
            <div className="parent">
                {this.state.movies_details ?
                    this.state.movies_details.map((val) => {
                        return (
                            <Card className="top-prod" style={{ maxWidth: 480, maxHeight: 340, }}>
                                <CardBody className="text-center">
                                    <Row>
                                        <Col className="col-sm-2 votes" >
                                            <i className="fa fa-caret-down font"></i><br />
                                            <span style={{ fontWeight: '500' }}>{val.totalVoted}</span><br />
                                            <i className="fa fa-caret-up font"></i>
                                            <p style={{ fontWeight: '500' }}>Votes</p>
                                        </Col>
                                        <Col className="col-sm-4">
                                            <CardImg style={{ maxHeight: 200, maxWidth: 150, }}
                                                src={val.poster} alt="Card image cap" />
                                        </Col>
                                        <Col className="col-sm-6 text" >
                                            <span style={{ fontSize: '20px', fontWeight: '400' }}>{val.title}</span><br />
                                            <span>Genre: {val.genre}</span><br />
                                            <span>Director: {val.director[0]}</span><br />
                                            <span>Starring: {val.stars[0]}</span><br />
                                            <span>{(new Date(Number(val.releasedDate) * 1000)).toDateString()}</span><br />
                                            <span className="textstyle">{val.pageViews} views | voted by {val.totalVoted} people</span>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <Row>
                                    <button className="btn-style">Watch Trailer</button>
                                </Row>
                            </Card>
                        );
                    })
                    : <span className="loading">Loading...</span>}
            </div>
        )
    }
}

export default Movies_Card;