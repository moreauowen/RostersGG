import React, { Component } from "react";
//import axios from 'axios';

class UserEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        // This is where route to get user events is implemented to fetch events
    }
    render() {
        return (
            <div className="general-display-box">
                <div>
                    <h2 className="">
                        My Events
                    </h2>
                    <hr />
                    <p className="">
                        <b>COMING SOON</b>
                    </p>
                </div>
            </div>
        )
    }
}

export default UserEvents;