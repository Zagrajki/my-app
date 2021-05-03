import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import {ToDo, ToPerform, ToMake} from "./lab4jsnew";

class Main extends Component {
    state = {
        toDoList: []
    }

    adder = (newObj) => {
        this.setState({
            toDoList: this.state.toDoList.concat({a:newObj.a, b:newObj.b, c:newObj.c, d:newObj.d}),
        });
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact>
                    <section><ToPerform mainList={this.state.toDoList}/></section>
                </Route>
                <Route path="/wyswietl">
                    <section><ToDo mainList={this.state.toDoList} adder={this.adder}/></section>
                </Route>
                <Route path="/dodaj">
                    <section><ToMake mainList={this.state.toDoList} adder={this.adder}/></section>
                </Route>
                <Route>
                    <section><h2>ERROR 404, known also as Med'an</h2></section>
                </Route>
            </Switch>
        );
    }
}

export default Main;
