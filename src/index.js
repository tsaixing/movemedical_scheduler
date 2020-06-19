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

    this.handleChange = this.handleChange.bind(this);
    this.cancelAction = this.cancelAction.bind(this);
  }
  handleChange(event) {
    const inputName = event.target.name
    const inputValue = event.target.value

    let id = parseInt(this.props.id);
    appointmentList[id][inputName] = inputValue;
  }
  cancelAction() {
    let id = parseInt(this.props.id);
    this.props.cancelAppointment(id);
  }
  render() {
    return (
        <div>
        Title
        <input type="text"
    name="title"
    defaultValue={this.props.title}
    onChange={this.handleChange}
    /> <br />
    Date
    <input type="text"
    name="date"
    defaultValue={this.props.date}
    onChange={this.handleChange}
    /> <br />
    Time
    <input type="text"
    name="time"
    defaultValue={this.props.time}
    onChange={this.handleChange}
    /> <br />
    Location
    <input type="text"
    name="location"
    defaultValue={this.props.location}
    onChange={this.handleChange}
    /> <br />
    Description
    <input type="text"
    name="description"
    defaultValue={this.props.description}
    onChange={this.handleChange}
    /> <br />
    <button type="button" onClick={this.cancelAction}>cancel appointment</button>
    <br /><br />
    </div>
  );
  }
}

class AppointmentList extends React.Component {
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
      cancelAppointment={this.props.cancelAppointment}
      />
    );
    });
    return (
        <div> {appointments} </div>
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

    if (newTitle) {
      this.props.addItem({newTitle, newDate, newTime, newLocation, newDescription});
      this.refs.form.reset();
    }
  }
  render() {
    return (
        <form ref="form" onSubmit={this.onSubmit}>
        <input type="text" ref="titleValue" placeholder="Title"/><br/>
        <input type="text" ref="dateValue" placeholder="Date"/><br/>
        <input type="text" ref="timeValue" placeholder="Time"/><br/>
        <input type="text" ref="locationValue" placeholder="Location"/><br/>
        <input type="text" ref="descriptionValue" placeholder="Description"/><br/>
        <button type="submit">add appointment</button>
    </form>
  );
  }
}

class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    this.addAppointment = this.addAppointment.bind(this);
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
  cancelAppointment(itemId) {
    appointmentList.splice(itemId, 1);
    this.setState({appointmentList: appointmentList});
  }
  render() {
    return (
        <div id="main">
        <h1>Appointment Scheduler</h1>

    <h2>Enter New Appointment</h2>
    <AppointmentForm addItem={this.addAppointment}/>

    <h2>View Appointments</h2>
    <AppointmentList items={this.props.initList}
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
