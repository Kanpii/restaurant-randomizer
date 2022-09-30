import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';

import FormPage from "./Yelp/FormPage";
import './App.css';



class App extends Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//         location: null,
//     };
// }

//     onFormSubmit = (location) => {
//         this.setState({
//             location: location,
//         })
//     }

    render() {
        return (
            <div className="App">
            
            <FormPage />
            </div>
        );
    } 
}


export default App;