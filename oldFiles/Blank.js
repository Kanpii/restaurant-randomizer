import React, { Component } from 'react';
import axios from 'axios';

class DisplayPage extends React.Component {

    constructor(props) {
        super(props);
        //props.state is linked with the result sending back from its child a.k.a the result we returned in SearchForm element
        this.state = {
        //leverage the state to store the information return from API to make loading faster
        results: [],
        errorState: null,
        loading: false,
        random: 0,
        };
    }
    
    componentDidMount () {
        this.getRestaurantsFromApi('Toronto');
        // var tester = axios.get('http:localhost:8000/api/test?location=fremont')
        // console.log(tester, "hi")
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
    //function to get information from API 
    getRestaurantsFromApi = (locationSearched) => {
        //UI feedback to tell the user when we are retrieving infromation from the API 
        this.setState({ loading: true })

        //using a proxy server cors-anywhere to get rid of the CROS probblem 
        //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
        // axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
        axios.get('http://localhost:8000/api/test?location=fremont')
        //required authorization format from API 
        // headers: {
        //     //to get the API from the .env file use process.env.{variable name}
        //     Authorization: `bearer plDRW_eTfo89Ii4ssXW0xBdAYWy9O4Vgo3UMU3quYo7QHQZY9mn5BcvsBSpeXbRwQiK6uPhngB7CC64WUMX_MjYlZA47dVIebKWu6giNhqAUdOO9Jp9qxbZYZ-IoY3Yx`
        // },
        //option params passed to API call to retrieve only breakfast and lunch spots 
        // params: {
        //     categories: 'breakfast_brunch',
        // }
        // })
        .then((res) => {
            console.log(res.data.businesses)
            //change the state of App to reflect on the result we are given from the API
            //at the same time, setting the loading state to false 
            this.setState({ results: res.data.businesses, loading: false, random: Math.floor(Math.random() * (this.state.results.length)) })
        })
        .catch((err) => {
            //fire the errorState message if there is no information return from the API
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

        // return(
        //     <div className="RestuarantList__gallery">{RestaurantList}</div>
        // )
    }

    render() {
        return (
            
            <section className="RestuarantList">
                {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}

                {/*conditional rendering for error state - when this.state.errorState is not true*/}
                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}

}
export default DisplayPage