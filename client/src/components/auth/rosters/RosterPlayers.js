import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDateString } from '../../../util/formatDateString';
import { getCorrectPath } from '../../../util/developmentHelper';

const PlayerInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
        </td>
        <td className=''>{props.user.username}</td>
        <td className=''>{formatDateString(props.user.date)}</td>
    </tr>
);

class RosterPlayers extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: []
        }
    }
    componentDidMount() {
        const getRosterPlayersRoute = getCorrectPath(`/api/rosters/roster/${this.props.match.params.id}/players`);
        axios.get(getRosterPlayersRoute)
            .then(res => {
                this.setState({
                    players: res.data
                });
            }).catch(err => {
                console.log(err);
            });
    }

    playerList(){
        return this.state.players.map(function(currentPlayer, i){
            return <PlayerInfo user={currentPlayer} key={i} />
        });
    }

    render() {
        return (
            <div className='display-box'>
                <div className='box'>
    
                    <h3>Players</h3>
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Date Joined RostersGG</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.playerList() }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}
export default RosterPlayers;