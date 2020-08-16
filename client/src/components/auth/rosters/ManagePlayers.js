import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { formatDateString } from '../../../util/formatDateString';
import { kickPlayerFromRoster } from '../../../actions/rosterAuthActions';


const PlayerInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
        </td>
        <td className=''>{props.user.username}</td>
        <td className=''>{formatDateString(props.user.date)}</td>
        <td className=''>
            <Button
                className='btn-secondary'
                onClick={() => props.onKick(props.user.username)}
                >Kick</Button>
        </td>
    </tr>
);

class ManagePlayers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
    }

    onKickPlayer = (e, given_username_to_remove) => {
        e.preventDefault();
        const rosterRemoveData = {
            team_id: this.props.team_id,
            data: {
                username_to_remove: given_username_to_remove,
                player_initiated: false
            }
        };

        this.props.kickPlayerFromRoster(rosterRemoveData, this.props.history);
    }

    componentDidMount() {
        axios.get(`/api/rosters/roster/${this.props.team_id}/players`)
            .then(res => {
                this.setState({
                    players: res.data
                });
            }).catch(err => {
                console.log(err);
            });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    playerList(my_username){
        return this.state.players.map(function(currentPlayer, i){
            if(currentPlayer.username !== my_username) { 
                return <PlayerInfo 
                    user={currentPlayer}
                    key={i}
                    onKick={this.onKickPlayer}/> 
            }
        });
    }
  
    render() {
        return (
            <div className='form-box'>
                <div className='player-list'>
                    <h3>Manage Players</h3>
                    
                    {(this.state.players.length > 1) ? 
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Date Joined RostersGG</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.playerList(this.props.auth.user.username) }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text'>You are the only player on this roster.</p>
                    }
                </div>
            </div>
        )
    }
}

ManagePlayers.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { kickPlayerFromRoster })(ManagePlayers);