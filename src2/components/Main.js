import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {ToDo, ToPerform, ToMake} from "./lab4jsnew";
import Login from "./Login";
import Register from "./Register";

const Main = () => {

    return (
        <div className="main-view">
            <Switch>
                <Route path="/" exact><ToPerform/></Route>
                <Route path="/register"><Register /></Route>
                <Route path="/login"><Login /></Route>
                <Route path="/add"><ToMake /></Route>
                <Route path="/search"><ToDo /></Route>
            </Switch>
        </div>
    );
};
/*
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
                    {this.props.message && <section><ToPerform mainList={this.state.toDoList}/></section>}
                </Route>
                <Route path="/wyswietl">
                    {this.props.message && <section><ToDo mainList={this.state.toDoList} adder={this.adder}/></section>}
                    {!this.props.message && <section><h2>ERROR 404, known also as Med'an</h2></section>}
                </Route>
                <Route path="/dodaj">
                    {this.props.message && <section><ToMake mainList={this.state.toDoList} adder={this.adder}/></section>}
                    {!this.props.message && <section><h2>ERROR 404, known also as Med'an</h2></section>}
                </Route>
                <Route path="/zaloguj">
                    {!this.props.message && <section><Login/></section>}
                    {this.props.message && <section><h2>ERROR 404, known also as Med'an</h2></section>}
                </Route>
                <Route path="/zarejestruj">
                    {!this.props.message && <section><Register/></section>}
                    {this.props.message && <section><h2>ERROR 404, known also as Med'an</h2></section>}
                </Route>
                <Route path="/wyloguj">
                    {this.props.message && <section><ToMake mainList={this.state.toDoList} adder={this.adder}/></section>}
                    {!this.props.message && <section><h2>ERROR 404, known also as Med'an</h2></section>}
                </Route>
                <Route>
                    <section><h2>ERROR 404, known also as Med'an</h2></section>
                </Route>
            </Switch>
        );
    }
}
*/
export default Main;
