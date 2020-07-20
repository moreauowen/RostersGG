import React, { Component } from 'react';
import axios from 'axios';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RosterInfo = props => (
    <tr>
        <td className="">{props.roster.teamname}</td>
        <td className="">{props.roster.leader}</td>
        <td className="">{props.roster.players.length}</td>
    </tr>
);

export default class Rosters extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            rosters: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/rosters/' + this.state.username + '/rosters')
            .then(res => {
                this.setState({
                    username: this.state.username,
                    rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/api/rosters/' + this.state.username + '/rosters')
            .then(res => {
                this.setState({
                    username: this.state.username,
                    rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    rosterList(){
        return this.state.rosters.map(function(currentRoster, i){
            return <RosterInfo roster={currentRoster} key={i} />
        });
    }

    render() {
        return (
            <div className="roster-display-box fluid-container">
                <Row>
                    <Col>
                        <h2 className="">My Rosters</h2>
                        <table className="table table-striped" style={{ marginTop: 10 }}>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Leader</th>
                                    <th># Players</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterList() }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }
}