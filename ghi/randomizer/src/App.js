import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';

import FormPage from "./Yelp/FormPage";
import './App.css';



class App extends Component {

    render() {
        return (
            <div className="App">
            
            <FormPage />
            </div>
        );
    } 
}


export default App;