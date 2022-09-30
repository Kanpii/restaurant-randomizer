import '../App.css';
import React, { useEffect, useState } from "react";




class MainPage extends React.Component {

  constructor() {
    super()
    this.state = {
      location: '',
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value})
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onFormSubmit(
      this.state.location
    )
    console.log(this.state)
  }

  render () {
    return (
      <div className="row">
      <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
          <h1>Pending</h1>
          <form onSubmit={this.handleSubmit} id="create-salesperson-form">
          {/* <div className="form-floating mb-3">
              <input onChange={this.handleTermChange} value={this.state.term} placeholder="Food" required type="text" name="term" id="term" className="form-control"/>
              <label htmlFor="term">Food Type</label>
          </div> */}
          <div className="form-floating mb-3">
              <input onChange={this.handleLocationChange} value={this.state.location} placeholder="location" required type="text" name="location" id="location" className="form-control"/>
              <label htmlFor="location">Location</label>
          </div>
              <button className="btn btn-primary">Create</button>
          </form>
      </div>
      </div>
      </div>
    )
  }
}

export default MainPage;
