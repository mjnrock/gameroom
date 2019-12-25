import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('incomeDomainStore')
@observer
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <input type="text" onChange={event => this.props.incomeDomainStore.setIncome(event.target.value)} placeholder="Income" className="income-input" />
                    <button type="button" className="calculate-btn">Calculate</button>
                    <p>Income: ${this.props.incomeDomainStore.incomeBeforeTax}.00</p>
                </header>
            </div>
        );
    }
} export default App;