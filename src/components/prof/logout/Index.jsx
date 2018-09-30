import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../../handlers/prof/AuthService';

export default class ProfLogoutIndex extends React.Component {
    constructor() {
        super()
        this.Auth = new AuthService()
    }

    componentWillMount() {
        this.Auth.logout();
        this.props.updateRoutes(false);
    }

    render() {
        return (<Redirect to="/prof/home" />)
    }
}
