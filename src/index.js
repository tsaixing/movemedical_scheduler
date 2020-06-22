import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Create a website that allows you to:
//  schedule personal appointments with a date, time, location, and description
//  see a list of appointments
//  edit appointments
//  cancel appointments

// Additional guidelines for the challenge:
//  React for the view layer
//  You can stop after 3 hours, even if it is incomplete
//  You do not need backend services for persistence, volatile storage is ok for this
// challenge

// Please share your code via a Github repository and include instructions for running the
// application in the README.md file.

let appointmentList = [];

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            date: this.props.date,
            time: this.props.time,
            location: this.props.location,
            description: this.props.description,
            isEditing: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.editAction = this.editAction.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    editAction() {
        let id = parseInt(this.props.id);

        this.setState({
            isEditing: !this.state.isEditing,
            title: this.props.title,
            date: this.props.date,
            time: this.props.time,
            location: this.props.location,
            description: this.props.description,
        });

        this.props.editAppointment(id, {
            title: this.state.title,
            date: this.state.date,
            time: this.state.time,
            location: this.state.location,
            description: this.state.description,
        });
    }

    cancelAction() {
        let id = parseInt(this.props.id);
        this.props.cancelAppointment(id);
    }

    render() {
        return (
            <div className="appointmentBlock">
                <div className="appointmentLine">
                    <span className="appointmentKey">Title</span> {this.state.isEditing ? '' :
                    <span className="appointmentValue">{this.props.title}</span>}
                    {this.state.isEditing ?
                        <input type="text"
                               name="title"
                               value={this.state.title}
                               onChange={this.handleChange}
                        />
                        : ''}
                </div>
                <div className="appointmentLine">
                    <span className="appointmentKey">Date</span> {this.state.isEditing ? '' :
                    <span className="appointmentValue">{this.props.date}</span>}
                    {this.state.isEditing ?
                        <input type="date"
                               name="date"
                               value={this.state.date}
                               onChange={this.handleChange}
                        />
                        : ''}
                </div>
                <div className="appointmentLine">
                    <span className="appointmentKey">Time</span> {this.state.isEditing ? '' :
                    <span className="appointmentValue">{this.props.time}</span>}
                    {this.state.isEditing ?
                        <input type="time"
                               name="time"
                               value={this.state.time}
                               onChange={this.handleChange}
                        />
                        : ''}
                </div>
                <div className="appointmentLine">
                    <span className="appointmentKey">Location</span> {this.state.isEditing ? '' :
                    <span className="appointmentValue">{this.props.location}</span>}
                    {this.state.isEditing ?
                        <input type="text"
                               name="location"
                               value={this.state.location}
                               onChange={this.handleChange}
                        />
                        : ''}
                </div>
                <div className="appointmentLine">
                    <span className="appointmentKey">Description</span> {this.state.isEditing ? '' :
                    <span>{this.props.description}</span>}
                    {this.state.isEditing ?
                        <input type="text"
                               name="description"
                               value={this.state.description}
                               onChange={this.handleChange}
                        />
                        : ''}
                </div>
                <div className="appointmentActions">
                    <button type="button"
                            onClick={this.editAction}>{this.state.isEditing ? 'save appointment' : 'edit appointment'}</button>
                    <button type="button" onClick={this.cancelAction}>cancel appointment</button>
                </div>
            </div>
        );
    }
}

class AppointmentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let appointments = this.props.items.map((item, id) => {
            return (
                <Appointment key={id}
                             title={item.title}
                             date={item.date}
                             time={item.time}
                             location={item.location}
                             description={item.description}
                             id={id}
                             editAppointment={this.props.editAppointment}
                             cancelAppointment={this.props.cancelAppointment}
                />
            );
        });
        return (
            <div>
                {appointments}
            </div>
        );
    }
}

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        let newTitle = this.refs.titleValue.value;
        let newDate = this.refs.dateValue.value;
        let newTime = this.refs.timeValue.value;
        let newLocation = this.refs.locationValue.value;
        let newDescription = this.refs.descriptionValue.value;

        if (newTitle && newDate && newTime) {
            this.props.addItem({newTitle, newDate, newTime, newLocation, newDescription});
            this.refs.form.reset();
        }
    }

    render() {
        return (
            <form ref="form" onSubmit={this.onSubmit}>
                <div>
                    <span className="appointmentKey">* Title</span>
                    <input type="text" ref="titleValue"
                           placeholder="Title"/>
                </div>
                <div>
                    <span className="appointmentKey">* Date</span>
                    <input type="date" ref="dateValue"
                           placeholder="Date"/>
                </div>
                <div>
                    <span className="appointmentKey">* Time</span>
                    <input type="time" ref="timeValue"
                           placeholder="Time"/>
                </div>
                <div>
                    <span className="appointmentKey">Location</span>
                    <input type="text" ref="locationValue"
                           placeholder="Location"/>
                </div>
                <div>
                    <span className="appointmentKey">Description</span>
                    <input type="text" ref="descriptionValue"
                           placeholder="Description"/>
                </div>
                <div className="appointmentActions">
                    <button type="submit">add appointment</button>
                </div>
            </form>
        );
    }
}

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.addAppointment = this.addAppointment.bind(this);
        this.editAppointment = this.editAppointment.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
        this.state = {
            appointmentList: appointmentList
        };
    }

    addAppointment(appointment) {
        appointmentList.unshift({
            id: appointmentList.length++,
            title: appointment.newTitle,
            date: appointment.newDate,
            time: appointment.newTime,
            location: appointment.newLocation,
            description: appointment.newDescription,
        });
        this.setState({appointmentList: appointmentList});
    }

    editAppointment(itemId, appointment) {
        appointmentList.splice(itemId, 1, {
            id: itemId,
            title: appointment.title,
            date: appointment.date,
            time: appointment.time,
            location: appointment.location,
            description: appointment.description,
        });
        this.setState({appointmentList: appointmentList});
    }

    cancelAppointment(itemId) {
        appointmentList.splice(itemId, 1);
        this.setState({appointmentList: appointmentList});
    }

    render() {
        return (
            <div id="main">
                <h1>Appointment Scheduler</h1>

                <h2>Enter New Appointment</h2>
                <div className="appointmentBlock">
                    <AppointmentForm addItem={this.addAppointment}/>
                </div>

                <h2>View Appointments</h2>
                <AppointmentList items={this.props.initList}
                                 editAppointment={this.editAppointment}
                                 cancelAppointment={this.cancelAppointment}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Scheduler initList={appointmentList}/>,
    document.getElementById('root')
);
