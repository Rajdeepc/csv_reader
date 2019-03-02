import React, { Component } from 'react';
import hotelImg from './hotel.jpg'
class DataParser extends Component {

    constructor(props) {
        // Call super class
        super(props);
        this.state = {
            todos: ['a', 'b'],
            currentPage: 1,
            todosPerPage: 6
        };

        // Bind this to function updateData (This eliminates the error)
        this.updateData = this.updateData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {

        // Your parse code, but not seperated in a function
        var csvFilePath = require("./myFile.csv");
        var Papa = require("papaparse");
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            // Here this is also available. So we can call our custom class method
            complete: this.updateData
        });

    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    updateData(result) {
        const data = result.data;
        // Here this is available and we can call this.setState (since it's binded in the constructor)
        console.log(JSON.stringify(data))
        this.setState({ todos: data });
        // or shorter ES syntax: this.setState({ data });
    }

    componentDidMount() {

    }

    render() {
        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos ? todos.slice(indexOfFirstTodo, indexOfLastTodo) : [];
        
        const renderTodos = currentTodos.map((todo, index) => {
            return (
                <div className="card">
                <div class="clearfix">
                <div className="leftFloat width20">
                    <img source={require('./hotel.jpg')} alt="" className="hotelpic"/>
                </div>
                <div className="leftFloat width80 text-left">
                <div className="clearfix">
                <p className="leftFloat">{todo.Name}</p> <p className="floatright">{todo.Rating}</p>
                </div>
                {/* <p>{todo["Cuisine Style"]}</p> */}
                <p>City: {todo.City}</p>
                </div>
                </div>
                <hr/>
                <div class="text-left">
                <p>No of Reviews: {todo["Number of Reviews"]}</p>
                
                    </div>
                </div>
            )
            
            ;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= 10; i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    className="linkCLick"
                >
                    {number}
                </li>
            );
        });
        // Your render function
        return (
            <div className="backwrapper">
             <form className="formsearch">
                <input className="Search" type="text" placeholder="Search by name or cuisine"/>
            </form>
                <div>
                    {renderTodos}
                </div>
                <div id="page-numbers">
                <ul>
                    {renderPageNumbers}
                </ul>
                </div>
            </div>
        )
    }
}

export default DataParser;