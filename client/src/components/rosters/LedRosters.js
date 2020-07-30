import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const RosterInfo = props => (
    <tr>
        <td className="">{props.roster.teamname}</td>
        <td className="">{props.roster.team_desc}</td>
        <td className="">{props.roster.leader}</td>
        <td className="">{props.roster.players.length}</td>
        <td>
            <Link to={"/roster/" + props.roster._id}>View</Link>
            <Link to={"/roster/" + props.roster._id + "/edit"}>Edit</Link>
        </td>
    </tr>
);

export default class LedRosters extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            rosters: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/rosters/' + this.state.username + '/led-rosters')
            .then(res => {
                this.setState({
                    username: this.state.username,
                    rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/api/rosters/' + this.state.username + '/led-rosters')
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

    onCreate = e => {
        e.preventDefault();
        this.props.history.push('/roster/create')
    }

    render() {
        return (
            <div className="display-box">
                <div>
                    <h2 className="">
                        My Rosters
                        <Button
                          className="float-right"
                          onClick={this.onCreate}
                        >Create</Button>
                    </h2>
                    <hr />

                    {(this.state.rosters.length > 0) ?
                    <table className="table table-striped" style={{ marginTop: 15 }}>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Description</th>
                                <th>Leader</th>
                                <th># Players</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.rosterList() }
                        </tbody>
                    </table>
                    :
                    <p><span className="filler-text">You do not lead any rosters.</span></p>
                    }

                </div>
            </div>
        );
    }
}