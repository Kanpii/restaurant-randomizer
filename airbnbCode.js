import '../App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

class FormPage extends React.Component {

// This sets the state of the data so that it may be used
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            term: '',
            result: []
        }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    }

handleLocationChange(event) {
    this.setState({location: event.target.value})
}

handleTermChange(event) {
    this.setState({term: event.target.value})
}

// On submit, axios grabs the data the user inputted and sets it into the search link that is provided from the django backend. 
async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state}


    const axiosData = await axios.get(`http://localhost:8000/api/test?location=${data.location}&term=${data.term}`)
    this.setState({result: axiosData.data})
}

// This displays the form for the user to input data
    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Pending</h1>
                <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleTermChange} value={this.state.term} placeholder="Food" required type="text" name="term" id="term" className="form-control"/>
                    <label htmlFor="term">Food Type</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleLocationChange} value={this.state.location} placeholder="location" required type="text" name="location" id="location" className="form-control"/>
                    <label htmlFor="location">Location</label>
                </div>
                    <button className="btn btn-primary">Create</button>
                </form>

                <div className = "RestaurantInfo">
                    <div>
                        <img src = {this.state.result.image_url} width="500px" alt = "" className = "RestaurantInfo__img" />
                    </div>
                    <h2 className = "heading-tertiary RestaurantInfo__name">{this.state.result.name}</h2>
                    
                    
                    <p className = "RestaurantInfo__para">
                        {this.state.result.phone}
                    </p>

                    <img 
                        alt = {`yelp ratings: ${this.state.result.rating}/5`}
                        className = "RestaurantInfo__rating"/>

                    <p className = "RestaurantInfo__reviewCount"> Based on {this.state.result.review_count} Reviews</p>
                
                    <a 
                        href= {this.state.result.url} 
                        className = "RestaurantInfo__website">
                            More information on Yelp
                    </a>

                    <p 
                        alt = "yelp"
                        className = "RestaurantInfo__yelp"/>
                </div>
            </div>
            </div>
            </div>
            
        )
    }
}
export default FormPage;