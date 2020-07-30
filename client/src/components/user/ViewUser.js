import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RosterInfo = props => (
    <tr>
        <td className="">{props.roster.teamname}</td>
        <td className="">{props.roster.team_desc}</td>
        <td className="">{props.roster.leader}</td>
        <td className="">{props.roster.players.length}</td>
        <td>
            <Link to={"/roster/" + props.roster._id}>View</Link>
        </td>
    </tr>
);

export default class ViewUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            username: "",
            date: "",
            rosters: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/rosters/' + this.props.match.params.username + '/rosters')
            .then(res => {
                this.setState({ rosters: res.data });
            }).catch(function(err) {
                console.log(err);
            });

        axios.get('http://localhost:5000/api/users/' + this.props.match.params.username)
            .then(res => {
                this.setState({ name: res.data.name,
                                username: res.data.username,
                                date: res.data.date});
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
            <div className="general-display-box">
                <div>
                    <Link to="/dashboard">
                        <i className="fa fa-arrow-circle-left  "></i>
                        {" "}Back to Dashboard
                    </Link>

                    <h2 className="">{this.state.name}</h2>
                    <h6>{this.state.username}</h6>
                    <hr />

                    <h6>Member since: {this.state.date}</h6>
                    <hr />

                    <h6>Plays on the following rosters: </h6>
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
                    <p><span className="filler-text">This user is not a part of any rosters.</span></p>
                    }

                </div>
            </div>
        );
    }
}