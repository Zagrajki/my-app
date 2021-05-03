import React, { Component } from 'react';
import koperta from './koperta.png';

    const Hello = (props) => (<h2>Liczba znalezionych: {props.found_num}</h2>)

    const Item = (props) => (
        <>
            <h1 style={{position: "static", top: "0px"}}>{props.texta}</h1>
            <p style={{position: "static", top: "0px"}}>{props.textb}</p>
            <p style={{position: "static", top: "0px"}}><a href={"mailto:"+props.textc} target="_blank"><img src={koperta} height={20} alt="Email: "></img>{props.textc}</a></p>
            <p style={{position: "static", top: "0px"}}>Tagi: {props.textd}</p>
        </>
    )

    const Box = (props) => {
        return (
            <p>
            <input
                type="text"
                name={props.name}
                placeholder={props.name}
                value={props.newItemValue}
                onChange={props.handleOnChange}
                onKeyDown={props.handleOnKey}
            />
            </p>
        )
    }
/*
    function updateState(other){
        this.setState({
            toDoList: this.state.toDoList.concat({a:other.state.newItemValueA, b:other.state.newItemValueB, c:other.state.newItemValueC, d:other.state.newItemValueD}),
            whatToShow: true,
        })
    }

    function returnState(){
        return this.state;
    }
*/
    class ToDo extends React.Component {

        constructor(props) {
            super(props)
            //updateState = updateState.bind(this)
            //returnState = returnState.bind(this)
        }

        state = {
            toDoList: [],
            secondList: [],
            newItemValueD: "",
            newItemValueB: "",
            whatToShow: true,
        }
        secondListHelper = []
        found = 0;

        handleNewEntryD = (event) => {
            this.setState({
                newItemValueD: event.target.value
            })
        }

        handleNewEntryB = (event) => {
            this.setState({
                newItemValueB: event.target.value
            })
        }

        handleEnterTags = (event) => {
            if(event.code === "Enter"){
                if(this.state.newItemValueD === ""){
                    this.setState({
                        whatToShow: true,
                    });
                    this.found = this.props.mainList.length;
                } else {
                    this.secondListHelper = [];
                    this.found = 0;
                    let tagsArr = this.state.newItemValueD.split(" ");
                    this.props.mainList.forEach(e => {let tagFound = 0; let eNew  = e.d.split(" "); eNew.forEach( ee => {
                        tagsArr.forEach(f => {
                            if(ee === f && tagFound === 0){
                                this.secondListHelper = this.secondListHelper.concat({a:e.a, b:e.b, c:e.c, d:e.d});
                                tagFound = 1;
                                this.found = this.found + 1;
                            }
                        })
                    })});
                    console.log(this.secondListHelper);
                    this.setState({
                        secondList: this.secondListHelper.slice(0),
                        whatToShow: false,
                    });
                }
            }
        }

        handleEnterDes = (event) => {
            if(event.code === "Enter"){
                if(this.state.newItemValueB === ""){
                    this.setState({
                        whatToShow: true,
                    });
                    this.found = this.props.mainList.length;
                } else {
                    this.secondListHelper = [];
                    this.found = 0;
                    this.props.mainList.forEach(e => {	if(e.b.search(this.state.newItemValueB) !== -1){
                        this.secondListHelper = this.secondListHelper.concat({a:e.a, b:e.b, c:e.c, d:e.d});
                        this.found = this.found + 1;
                    }});
                    console.log(this.secondListHelper);
                    this.setState({
                        secondList: this.secondListHelper.slice(0),
                        whatToShow: false,
                    });
                }
            }
        }

        // it => ( )
        render() {
            const myList = this.props.mainList.map(it => (
                <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a+it.c} />
            ));
            const thyList = this.state.secondList.map(it => (
                <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a+it.c} />
            ));

            return (
                //React.Fragment
                <>
                    <h2>{this.props.dummyText}</h2>
                    <Box
                        name = "Wyszukiwanie po tagach"
                        newItemValue={this.state.newItemValueD}
                        handleOnChange={this.handleNewEntryD}
                        handleOnKey={this.handleEnterTags}
                    />
                    <Box
                        name = "Wyszukiwanie w opisach"
                        newItemValue={this.state.newItemValueB}
                        handleOnChange={this.handleNewEntryB}
                        handleOnKey={this.handleEnterDes}
                    />
                    {this.state.whatToShow && <Hello found_num={this.props.mainList.length}/>}
                    { ! this.state.whatToShow && <Hello found_num={this.found}/>}
                    {this.state.whatToShow && myList}
                    { ! this.state.whatToShow && thyList}
                </>
            );
        }
    }

class ToPerform extends React.Component{

        render(){
            const myList = this.props.mainList.map(it => (
                <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a+it.c} />
            ));
            return(<>
                {myList}
            </>)
        }
}

    class ToMake extends React.Component{

        state = {
            newItemValueA: "",
            newItemValueB: "",
            newItemValueC: "",
            newItemValueD: "",
            showWarning: false
        }
        errorMessage = "Wrong entry value"

        handleNewEntryA = (event) => {
            this.setState({
                newItemValueA: event.target.value
            })
        }

        handleNewEntryB = (event) => {
            this.setState({
                newItemValueB: event.target.value
            })
        }

        handleNewEntryC = (event) => {
            this.setState({
                newItemValueC: event.target.value
            })
        }

        handleNewEntryD = (event) => {
            this.setState({
                newItemValueD: event.target.value
            })
        }

        handleEnter = (event) => {
            if(event.code === "Enter"){
                if(this.props.mainList.some(e => e.a === this.state.newItemValueA && e.c === this.state.newItemValueC)
                    || "" === this.state.newItemValueA || "" === this.state.newItemValueB
                    || "" === this.state.newItemValueC || "" === this.state.newItemValueD){
                    this.setState({
                        showWarning: true
                    })
                } else {
                    //updateState(this);
                    this.props.adder({a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD});
                    //this.props.mainList = this.props.mainList.concat({a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD})
                    /*this.setState({
                        toDoList: this.state.toDoList.concat({a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD}),
                    })*/
                }
            } else {
                this.setState({
                    showWarning: false
                })
            }
        }
        // it => ( )
        render() {
            return (
                //React.Fragment
                <>
                    <h2>{this.props.dummyText}</h2>
                    <Box
                        name = "imie"
                        newItemValue={this.state.newItemValueA}
                        handleOnChange={this.handleNewEntryA}
                        handleOnKey={this.handleEnter}
                    />
                    <Box
                        name = "opis"
                        newItemValue={this.state.newItemValueB}
                        handleOnChange={this.handleNewEntryB}
                        handleOnKey={this.handleEnter}
                    />
                    <Box
                        name = "email"
                        newItemValue={this.state.newItemValueC}
                        handleOnChange={this.handleNewEntryC}
                        handleOnKey={this.handleEnter}
                    />
                    <Box
                        name = "tagi"
                        newItemValue={this.state.newItemValueD}
                        handleOnChange={this.handleNewEntryD}
                        handleOnKey={this.handleEnter}
                    />
                    {this.state.showWarning && <h1 style={{color: "red"}}>{this.errorMessage}</h1> }
                </>
            );
        }
    }
/*
    ReactDOM.render(
        <ToDo dummyText="Witaj Dniu" />,
        document.getElementById('root')
    );

    ReactDOM.render(
        <Hello />,
        document.getElementById('root2')
    );

    ReactDOM.render(
        <ToMake dummyText="Witaj Noco" />,
        document.getElementById('root3')
    );
    */

export {ToDo, ToPerform, ToMake};
