import React from 'react';
import css from './Cockpit.css';

const cockpit = (props) => {

    const classes = [];
    let btnClass = css.Button;

    if (props.showPersons) {
        btnClass = [css.Button, css.Red].join(' ');
    }

    if(props.persons.length <= 2) {
      classes.push(css.red);
    }
    if(props.persons.length <= 1) {
      classes.push(css.bold);
    }

    return (
        <React.Fragment>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <button 
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
            <button onClick={props.login}>Log in</button>
        </React.Fragment>
    )
};

export default cockpit;