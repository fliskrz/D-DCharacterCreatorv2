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
            clas:' ',
            mode:'main',
            numbers: [15,14,13,12,10,8],
            stats:[],
            modifier:[]
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

    stats = (e) => {
        e.preventDefault();
        this.setState({
            mode: 'stats',
            stats:[]
        })
    }

    defaultNumbers = (e) => {
        e.preventDefault();
        this.setState({
            numbers: [15,14,13,12,10,8]
        })
    }

    randOne = () => {
        const arr = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1
        ].sort((a, b) => a-b)
        return arr[1]+arr[2]+arr[3];
    }

    randomNewNumbers = () => {
        this.setState({
            numbers: [
                this.randOne(),
                this.randOne(),
                this.randOne(),
                this.randOne(),
                this.randOne(),
                this.randOne()
            ]
        })
    }

    add = (e) => {
        this.setState({
            stats: [...this.state.stats,parseInt(e.currentTarget.parentElement.innerText)]
        })
        e.currentTarget.disabled=true;
        e.currentTarget.parentElement.parentElement.nextElementSibling.disabled=true;
        e.currentTarget.parentElement.parentElement.nextElementSibling.nextElementSibling.disabled=true;
    }

    refresh = (e) => {
        this.setState({
            stats: []
        })
        e.currentTarget.parentElement.querySelectorAll('button').forEach((e)=>{
            e.disabled=false;
        })
    }

    accept = (e) => {
        e.preventDefault();
        this.setState({
            mode: 'main'
        })
    }

    modifiers = (number) => {
        if(number){
            return Math.floor((number-10)/2);
        }else{return ' '}
    }


    render() {
        let numbers = this.state.numbers.map((e,i) => {
            return e = <li key={i}>{e} <button onClick={this.add}>+</button></li>
        })

        switch (this.state.mode) {
            case 'main':
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
                                    <button onClick={this.stats}>Stats</button>
                                    <ul>
                                        <li>
                                            <span>Str</span>
                                            <span>{this.state.stats[0]} ({this.modifiers(this.state.stats[0])})</span>
                                        </li>
                                        <li>
                                            <span>Dex</span>
                                            <span>{this.state.stats[1]} ({this.modifiers(this.state.stats[1])})</span>
                                        </li><li>
                                            <span>Const</span>
                                            <span>{this.state.stats[2]} ({this.modifiers(this.state.stats[2])})</span>
                                        </li><li>
                                            <span>Int</span>
                                            <span>{this.state.stats[3]} ({this.modifiers(this.state.stats[3])})</span>
                                        </li><li>
                                            <span>Wis</span>
                                            <span>{this.state.stats[4]} ({this.modifiers(this.state.stats[4])})</span>
                                        </li><li>
                                            <span>Char</span>
                                            <span>{this.state.stats[5]} ({this.modifiers(this.state.stats[5])})</span>
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
            )

            case 'stats':
            return (
                <>
                    <ul>
                        {numbers}
                    </ul>
                    <button onClick={this.defaultNumbers}>Default Numbers</button>
                    <button onClick={this.randomNewNumbers}>Random New Numbers</button>
                    <button onClick={this.refresh}>Clear</button>
                    <ul>
                        <li value={this.state.stats[0]} className='stat'>Strenght: {this.state.stats[0]}</li>
                        <li value={this.state.stats[1]} className='stat'>Dexterity: {this.state.stats[1]}</li>
                        <li value={this.state.stats[2]} className='stat'>Constitution: {this.state.stats[2]}</li>
                        <li value={this.state.stats[3]} className='stat'>Intelligence: {this.state.stats[3]}</li>
                        <li value={this.state.stats[4]} className='stat'>Wisdom: {this.state.stats[4]}</li>
                        <li value={this.state.stats[5]} className='stat'>Charisma: {this.state.stats[5]}</li>
                    </ul>
                    <button onClick={this.accept}>Accept</button>
                </>
            )
            
        }
        
    }
    
}

export default App;
