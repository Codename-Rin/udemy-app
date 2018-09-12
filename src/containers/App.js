import React, { PureComponent } from 'react';
import css from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
  }

  // componentWillMount() {
  //   console.log('[App.js] Inside ComponentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] Inside ComponentDidMount');
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  // }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);

    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');

    return null;
  }


  state = {
    persons : [
      { id: 'das', name: 'Franek', age: 28 },
      { id: 'qwe', name: 'Andrzej', age: 18 },
      { id: 'zxc', name: 'Julia', age: 22 }
    ],
    showPersons: false,
    toggleClickCounter: 0,
    authenticated: false
  }

  nameChangedHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = e.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClickCounter: prevState.toggleClickCounter + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside Render');

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
        persons={this.state.persons} 
        clicked={this.deletePersonHandler} 
        changed={this.nameChangedHandler} />
    }

    

    return (
        <React.Fragment>
          <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit 
            title={this.props.title}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}/>
            <AuthContext.Provider value={this.state.authenticated}>
              {persons}
            </AuthContext.Provider>
        </React.Fragment>
    );
  }
}

export default withClass(App, css.App);
