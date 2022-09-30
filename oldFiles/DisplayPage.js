import React, { Component } from 'react';
import axios from 'axios';

class DisplayPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        results: [],
        errorState: null,
        loading: false,
        location: '',
        term: '',
        };

    }
    
    componentDidMount () {
        this.getRestaurantsFromApi('Toronto');
    }

    componentDidUpdate (prevProps, prevState) {
        if(this.props.searchLocationQuery !== prevProps.searchLocationQuery) {
            this.setState({
                results: [],
            }, () => this.getRestaurantsFromApi(this.props.searchLocationQuery))
            // this.setState({
            //     random: Math.floor(Math.random() * (this.state.results.length))
            // })
        }
    }
    getRestaurantsFromApi = (locationSearched) => {
        this.setState({ loading: true })

        // axios.get(`http://localhost:8000/api/test?location=${location}&term=${term}`)

        .then((res) => {
            console.log(res.data.businesses)
            this.setState({ results: res.data.businesses, loading: false, })
        })
        .catch((err) => {
            this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
        })
    }

    renderEmptyState () {
        return (
            <h2 className = "heading-tertiary">Loading</h2>
        )
    }


    renderRestaurantInfo () {
        
        // const RestaurantList = this.state.results.map((result) => {
            return (    
                <div 
                    className = "RestaurantInfo"
                    key = {this.state.results[this.state.random].id}
                >
                    <img src = {this.state.results[this.state.random].image_url} alt = "" className = "RestaurantInfo__img" />
                    <h2 className = "heading-tertiary RestaurantInfo__name">{this.state.results[this.state.random].name}</h2>
                    
                    <p className = "RestaurantInfo__para">
                        {this.state.results[this.state.random].location.display_address[0]}, {this.state.results[this.state.random].location.display_address[1]}
                    </p>
                    
                    <p className = "RestaurantInfo__para">
                        {this.state.results[this.state.random].phone}
                    </p>

                    <img 
                        alt = {`yelp ratings: ${this.state.results[this.state.random].rating}/5`}
                        className = "RestaurantInfo__rating"/>

                    <p className = "RestaurantInfo__reviewCount"> Based on {this.state.results[this.state.random].review_count} Reviews</p>
                
                    <a 
                        href= {this.state.results[this.state.random].url} 
                        className = "RestaurantInfo__website">
                            More information on Yelp
                    </a>

                    <p 
                        alt = "yelp"
                        className = "RestaurantInfo__yelp"/>
                </div>  
            );

    }

    render() {
        return (
            
            <section className="RestuarantList">
                {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}

                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}

}
export default DisplayPage