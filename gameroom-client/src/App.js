import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('incomeDomainStore')
@observer
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button type="button" className="calculate-btn" onClick={event => this.props.incomeDomainStore.setIncome(50)}>Calculate</button>
                    <p>Income: ${this.props.incomeDomainStore.incomeBeforeTax}.00</p>
                </header>
            </div>
        );
    }
} export default App;