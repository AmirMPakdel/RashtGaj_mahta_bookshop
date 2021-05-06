import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <Redirect to="/admin" />
         );
    }
}
 
export default Home;