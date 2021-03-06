import React, { Component } from 'react';
import axios from 'axios';
import calcTimeUntil from '../../../util/calcTimeUntil';
import dateFormat from 'dateformat';
import { getCorrectPath } from '../../../util/developmentHelper';

function formatDateString(dateISO) {
    const date = new Date(dateISO);
    return dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
};

const EventInfo = props => (
    <tr>
        <td className=''>{props.event.name}</td>
        <td className=''>{formatDateString(props.event.when)}</td>
        <td className=''>{calcTimeUntil(new Date(props.event.when), Date.now())}</td>
    </tr>
);

class RosterEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        const getRosterEventsRoute = getCorrectPath(`/api/rosters/roster/${this.props.match.params.id}/events`);
        axios.get(getRosterEventsRoute)
            .then(res => {
                this.setState({
                    events: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    rosterEventList(){
        return this.state.events.map(function(currentEvent, i){
            return <EventInfo event={currentEvent} key={i} />
        });
    }

    render() {
        return (
            <div className='display-box'>
                <div className='box'>
    
                    <h3>Team Events</h3>
                    {(this.state.events.length > 0) ? 
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>When</th>
                                    <th>Time Until</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterEventList() }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text'>There are no events for this roster.</p>
                    }

                </div>
            </div>
        )
    }
}
export default RosterEvents;