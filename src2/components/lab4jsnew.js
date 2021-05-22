import React from 'react';
import koperta from './koperta.png';
import { auth, addPost, getAllPosts } from "../firebase"

    const Hello = (props) => (<h2>Liczba znalezionych: {props.found_num}</h2>)

    const Item = (props) => (
        <div style={{border: "2px solid gold", background: "pink"}}>
            <h1 style={{position: "static", top: "20px"}}>{props.texta}</h1>
            <p style={{position: "static", top: "40px"}}>{props.textb}</p>
            <p style={{position: "static", top: "60px"}}><a href={"mailto:"+props.textc} target="_blank" rel="noreferrer"><img src={koperta} height={20} alt="Email: "></img>{props.textc}</a></p>
            <p style={{position: "static", top: "80px"}}>Tagi: {props.textd}</p>
        </div>
    )

    const Box = (props) => {
        return (
            <p>
            <input
                className="form-input"
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

    class ToDo extends React.Component {

        state = {
            usedList: [],
            secondList: [],
            newItemValueD: "",
            newItemValueB: "",
            whatToShow: true,
        }
        secondListHelper = []
        found = 0;
        all = 0;

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
                    //this.found = this.state.myList.length;
                    //getAllPosts().then(docs => {this.state.myList = docs.length});
                } else {
                    this.secondListHelper = [];
                    this.found = 0;
                    let tagsArr = this.state.newItemValueD.split(" ");
                    getAllPosts().then(docs => {docs.forEach(k => {let e= { ...k.data()};
                        let tagFound = 0; let eNew  = e.d.split(" "); eNew.forEach( ee => {
                        tagsArr.forEach(f => {
                            if(ee === f && tagFound === 0){
                                this.secondListHelper = this.secondListHelper.concat({a:e.a, b:e.b, c:e.c, d:e.d});
                                tagFound = 1;
                                this.found = this.found + 1;
                            }
                        })
                    })})
                        this.setState({
                            secondList: this.secondListHelper.slice(0),
                            whatToShow: false,
                        });
                    }).catch(error => {console.log(error);});
                    /*
                    this.props.mainList.forEach(e => {let tagFound = 0; let eNew  = e.d.split(" "); eNew.forEach( ee => {
                        tagsArr.forEach(f => {
                            if(ee === f && tagFound === 0){
                                this.secondListHelper = this.secondListHelper.concat({a:e.a, b:e.b, c:e.c, d:e.d});
                                tagFound = 1;
                                this.found = this.found + 1;
                            }
                        })
                    })});
                     */
                }
            }
        }

        handleEnterDes = (event) => {
            if(event.code === "Enter"){
                if(this.state.newItemValueB === ""){
                    this.setState({
                        whatToShow: true,
                    });
                    //this.found = this.props.mainList.length;
                    //getAllPosts().then(docs => {this.state.myList = docs.length});
                } else {
                    this.secondListHelper = [];
                    this.found = 0;
                    getAllPosts().then(docs => {docs.forEach(f => {let e= { ...f.data()};
                        if(e.b.search(this.state.newItemValueB) !== -1){
                        this.secondListHelper = this.secondListHelper.concat({a:e.a, b:e.b, c:e.c, d:e.d});
                        this.found = this.found + 1;
                    }})
                        this.setState({
                            secondList: this.secondListHelper.slice(0),
                            whatToShow: false,
                        });
                    }).catch(error => {console.log(error);});
                    /*
                    this.props.mainList.forEach(e => {	if(e.b.search(this.state.newItemValueB) !== -1){
                        this.secondListHelper = this.secondListHelper.concat({a:e.a, b:e.b, c:e.c, d:e.d});
                        this.found = this.found + 1;
                    }});
                     */
                }
            }
        }

        // it => ( )
        myList = [];
        tut = false;
        render() {
            if (this.tut === false) {
                getAllPosts().then(docs => {
                    this.all = 0;
                    docs.forEach(e => {
                        this.myList.push({ ...e.data()})
                        this.all++;
                    });
                    this.setState({
                        usedList: this.myList.map(it => (
                            <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a + it.c}/>
                        ))
                    });
                    this.myList = [];
                    this.tut = false;

                }).catch(error => {console.log(error);});
            }
            this.tut = true;
            /*
            getAllPosts().then(docs => {
                docs.forEach(e =>{this.myList.push(e)});
                this.state.myList = this.myList.map(it => (
                <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a+it.c} />
                ))
                this.myList = [];
            });
            const myList = this.props.mainList.map(it => (
                <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a+it.c} />
            ));*/
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
                    {this.state.whatToShow && <Hello found_num={this.all}/>}
                    { ! this.state.whatToShow && <Hello found_num={this.found}/>}
                    {this.state.whatToShow && this.state.usedList}
                    { ! this.state.whatToShow && thyList}
                </>
            );
        }
        //found_num={this.props.mainList.length}
    }

class ToPerform extends React.Component{

    state = {
        usedList: [],
    }
    myList = [];

        tut = false;
        render() {
            if (this.tut === false) {
            getAllPosts().then(docs => {
                docs.forEach(e => {
                    this.myList.push({ ...e.data()})
                });
                this.setState({
                    usedList: this.myList.map(it => (
                        <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a + it.c}/>
                    ))
                });
                this.myList = [];
                this.tut = false;

            }).catch(error => {console.log(error);});
            }
            this.tut = true;
            /*
            const myList = this.props.mainList.map(it => (
                <Item texta={it.a} textb={it.b} textc={it.c} textd={it.d} key={it.a+it.c} />
            ));*/
            return(<>
                {this.state.usedList}
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
        myList = [];

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

        addNew = () => {
            getAllPosts().then(docs => {
                docs.forEach(e =>{this.myList.push({...e.data()})});
                if(this.myList.some(e => e.a === this.state.newItemValueA && e.c === this.state.newItemValueC)
                    || "" === this.state.newItemValueA || "" === this.state.newItemValueB
                    || "" === this.state.newItemValueC || "" === this.state.newItemValueD){
                    this.setState({
                        showWarning: true
                    })
                } else {
                    addPost(auth.currentUser, {a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD});
                }
                this.myList = [];
            }).catch(err => {console.log(err)});
        }

        handleEnter = (event) => {
            if(event.code === "Enter"){
                this.addNew()
                /*
                if(this.props.mainList.some(e => e.a === this.state.newItemValueA && e.c === this.state.newItemValueC)
                    || "" === this.state.newItemValueA || "" === this.state.newItemValueB
                    || "" === this.state.newItemValueC || "" === this.state.newItemValueD){
                    this.setState({
                        showWarning: true
                    })
                } else {
                    //updateState(this);
                    addPost(auth.currentUser, {a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD});
                    //this.props.adder({a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD});
                    //truth = true;
                    //this.props.mainList = this.props.mainList.concat({a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD})
                    this.setState({
                        toDoList: this.state.toDoList.concat({a:this.state.newItemValueA, b:this.state.newItemValueB, c:this.state.newItemValueC, d:this.state.newItemValueD}),
                    })
                }*/
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
                <div className="form">
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
                    <button onClick={this.addNew}>Dodaj</button>
                    {this.state.showWarning && <h1 style={{color: "red"}}>{this.errorMessage}</h1> }
                </div>
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
