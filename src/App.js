import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import ProfIndex from './components/prof/Index';
import HomeIndex from './components/student/Index';
import Index404 from './components/notfound/Index';
import WebIndex from './components/webcam/Index';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/prof" component={ProfIndex} />
                    <Route path="/student" component={HomeIndex} />
                    <Route path="/webcam" component={WebIndex} />
                    <Route component={Index404} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default App;
