"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import { postData } from './lib/fetch';
import { submitNumber as submitNum } from './lib/urls';

class SubmitNumber extends React.Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitNumber = this.submitNumber.bind(this);
        this.state = {
            number: '',
            data: '',
            requestPending: false
        };
    }

    handleInputChange(event) {
        this.setState({ number: event.target.value });
    }

    submitNumber() {
        this.setState({ requestPending: true }, () => {
            postData('POST', submitNum, { numValue: this.state.number }, (resp) => {
                this.setState({ data: resp.nMostFreqOccurWords, requestPending: false });
            }, (error) => {
                console.log('Failure', error);
                this.setState({ data: [], requestPending: false });
            });
        })

    }


    render() {
        return (
            <div>
                {this.state.requestPending &&
                    <div className='spinnerContainer'>
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                }
                <div className="header">
                <p align="center" > TTT-Pre-Assignment</p> 
               
                </div>
                
                <div className="submitForm">
                    <input value={this.state.number} onChange={this.handleInputChange} />
                    <button onClick={this.submitNumber}>Submit</button>
                </div>
                {this.state.data && <div className="resultContainer">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Count</th>
                            </tr>
                            {this.state.data.length > 0 && this.state.data.map((datum, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{datum.name}</td>
                                        <td>{datum.count}</td>
                                    </tr>
                                );
                            })}
                            {this.state.data.length === 0 &&
                                <tr>
                                    <td>No Data Found for the number {this.state.number}. Try searching some other number.</td>
                                    <td>&nbsp;</td>
                                </tr>}
                        </tbody>
                    </table>
      
                </div>}

 





            </div>
        );
    }

    
}

ReactDOM.render(<SubmitNumber />, document.getElementById('app'));