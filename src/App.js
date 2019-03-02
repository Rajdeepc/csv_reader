import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DateParser from "./DateParser";
class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <h4>List of European Restaurants</h4>
        </header>
       
       <DateParser/>
      </div>
    );
  }
}

export default App;
