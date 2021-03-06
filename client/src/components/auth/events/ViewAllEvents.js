import React, { Component } from 'react';
//import axios from 'axios';

class ViewAllEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    /*
    componentDidMount() {
        axios.get(`/api/users/${this.props.username}/upcoming-events`)
            .then(res => {
                this.setState({
                    events: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    */

    /*
    eventCards(){
        return this.state.events.map(function(event, i){
            return <EventCard name={event.name}
                        description={event.description}
                        when={event.when} 
                        team_names={event.team_names}
                        key={i} />
        });
    }

    conditionalRenderCards(){
        if(this.state.events.length > 1){
            const sliderSettings = {
                adaptiveHeight: true,
                dots: true,
                initialSlide: 1,
                duration: 50
            }
            return  <Slider {...sliderSettings}>
                        {this.eventCards()}
                    </Slider>

        } else if (this.state.events.length > 0) {
            return this.eventCards();

        } else {
            return  <p className='filler-text'>
                        You do not have any upcoming events.
                    </p>
        }
    }
    */

    render() {
        return (
            <div className='display-box'>
                <div className='box'>
                    <h3 className=''>
                        View All Events
                    </h3>
                    
                    <p className='filler-text'>This component is not yet implemented. For now, check Upcoming Events on your Dashboard.</p>
                </div>
            </div>
        )
    }
}

export default ViewAllEvents;