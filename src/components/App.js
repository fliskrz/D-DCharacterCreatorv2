import React from 'react';
import '../index.css';
import axios from 'axios';
import { runInThisContext } from 'vm';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            classes:'',
            races: '',
            chooseClass: false,
            chooseRace: false,
            race:' ',
            name:' ',
            clas:' '
        }

        this.getClass = (() =>
        axios.get(`http://www.dnd5eapi.co/api/classes/`)
        .then((res) => {
            this.setState({
                classes: res.data.results.map((e,i) => <button onClick={this.myClass} key={i}>{e.name}</button>)
            })
        }))()

        this.getRace = (() =>
        axios.get(`http://www.dnd5eapi.co/api/races/`)
        .then((res) => {
            this.setState({
                races: res.data.results.map((e,i) => <button onClick={this.myRace} key={i}>{e.name}</button>)
            })
        }))()
    }

    setName = (e) => {
        e.preventDefault();
        e.currentTarget.innerHTML = `<h1>${this.state.name}</h1>`;
    }

    nameChange = (e) => {
        this.setState({
            name: e.currentTarget.value
        })
    }

    chooseClass = (e) => {
        e.preventDefault();
        this.setState({
            chooseClass:true
        })
    }

    myClass = (e) => {
        e.preventDefault();
        this.setState({
            clas: e.currentTarget.innerHTML,
            chooseClass: false
        })
    }

    chooseRace = (e) => {
        e.preventDefault();
        this.setState({
            chooseRace:true
        })
    }

    myRace = (e) => {
        e.preventDefault();
        this.setState({
            race: e.currentTarget.innerHTML,
            chooseRace: false
        })
    }


    render() {
        return (
            <div className='main'>
                {this.state.chooseClass ? 
                <div>
                    {this.state.classes}
                </div> :
                    this.state.chooseRace ? 
                    <div>
                        {this.state.races}
                    </div>  :

                <div className='container'>
                <div className='header'>
                    <form onSubmit={this.setName} className='name'>
                        <label>Enter Character Name</label>
                        <div>
                            <input onChange={this.nameChange} value={this.state.name} type='text' name='name'></input>
                            <button>Choose Name</button>
                        </div>
                    </form>
                    <div className='race'>
                        <div className='row'><span>Class: {this.state.clas} <button onClick={this.chooseClass}>Choose Class</button></span><span>Background</span><span>Player</span></div>
                        <div className='row'><span>Race: {this.state.race} <button onClick={this.chooseRace}>Choose Race</button></span><span>Alignment</span><span>Exp</span></div>
                    </div>
                </div>
                <div className='data'>
                    <div className='col'>
                        <div className='skills'>
                            <div className='attributes'>
                                <ul>
                                    <li>
                                        <span>Str</span>
                                        <span>18</span>
                                    </li>
                                    <li>
                                        <span>Dex</span>
                                        <span>18</span>
                                    </li><li>
                                        <span>Const</span>
                                        <span>18</span>
                                    </li><li>
                                        <span>Int</span>
                                        <span>18</span>
                                    </li><li>
                                        <span>Wis</span>
                                        <span>18</span>
                                    </li><li>
                                        <span>Char</span>
                                        <span>18</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='abilities'>
                                <ul>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                    <li>x</li>
                                </ul>
                            </div>
                        </div>
                        <div className='lang'>
                            <ul>
                                <li>Common</li>
                                <li>Elvish</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='defense'>
                            <div style={{display:'flex'}}>
                                <div>Armor Class</div>
                                <div>Initiative</div>
                                <div>Speed</div>
                            </div>
                            <div>Current HP</div>
                            <div>Temporary HP</div>
                            <div style={{display:'flex'}}>
                                <div>Hit dice</div>
                                <div>Death Saves</div>
                            </div>
                        </div>
                        <div className='attack'>jakieś tam ataki</div>
                        <div className='items'>miecze i łuki</div>
                    </div>
                    <div className='col'>
                        <div className='personality'>
                            <ul>
                                <li>Personality Traits</li>
                                <li>Ideals</li>
                                <li>Bonds</li>
                                <li>Flaws</li>
                            </ul>
                        </div>
                        <div className='features'>cośtam cośtam</div>
                    </div>
                </div>
            </div>
            
                }

                
            </div>
        );
    }
}

export default App;
