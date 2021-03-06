import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getCorrectPath } from '../../../util/developmentHelper';

const InvitationInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/roster/${props.roster._id}`}>{props.roster.teamname}</Link>
        </td>
        <td className=''>{props.roster.game}</td>
        <td className=''>{props.roster.region}</td>
        <td>
            
            <Button
                className='btn-accept' 
                onClick={() => onAccept(props.roster._id, props.username)}
                >Accept</Button>
            <Button
                className='btn-decline'
                onClick={() => onDecline(props.roster._id, props.username)}
                >Decline</Button>
        </td>
    </tr>
);

function onAccept(team_id, given_username){
    const acceptRoute = getCorrectPath(`/api/rosters/roster/${team_id}/accept-invite`);
    axios.patch(acceptRoute, {username: given_username})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    window.location.reload(false);
}

function onDecline(team_id, given_username){
    const declineRoute = getCorrectPath(`/api/rosters/roster/${team_id}/decline-invite`);
    axios.patch(declineRoute, {username: given_username})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    window.location.reload(false);
}


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_username: '',
            user_invitations: []
        }
    }

    onEdit = e => {
        e.preventDefault();
        this.props.history.push(`/user/${this.props.given_username}/edit`);
    }

    invitationList(user_username){
        return this.state.user_invitations.map(function(currentInvitation, i){
            return <InvitationInfo 
                    roster={currentInvitation} 
                    username={user_username} 
                    key={i} />
        });
    }

    componentDidMount() {
        const getUserInfoRoute = getCorrectPath(`/api/users/${this.props.given_username}`);
        axios.get(getUserInfoRoute)
            .then(res => {
                this.setState({
                    user_name: res.data.name,
                    user_username: res.data.username
                });
            })
            .catch(function (err) {
                console.log(err);

                // This seems like it's the only way to "log out" of session if user isn't found.
                localStorage.removeItem('jwtToken');
                window.location.reload(false);
            });

        const getUserInvitations = getCorrectPath(`/api/users/${this.props.given_username}/invitations`);
        axios.get(getUserInvitations)
            .then(res => {
                this.setState({
                    user_invitations: res.data
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <div className='display-box'>
                <div className='box'>
                    <h3>
                        Welcome, <span className='primary-text-green'>{this.state.user_name}</span>!
                    </h3>

                    <h5>Invitations: </h5>

                    {(this.state.user_invitations.length > 0) ?
                    <div className='table-container'>
                        <table className='table table-striped' style={{ marginTop: 10 }}>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Game</th>
                                    <th>Region</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.invitationList(this.state.user_username) }
                            </tbody>
                        </table>
                    </div>
                    :
                        <p className='filler-text'>You do not have any invitations.</p>
                    }
                </div>
            </div>
        )
    }
}

export default UserInfo;