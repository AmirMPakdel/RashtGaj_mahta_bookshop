import React, { Component } from 'react';

class ScrollableList extends Component {
    state = { componentList:[] }

    componentDidMount(){

        //this.loadList(this.props.list);
    }

    render() { 
        return ( 
            <div style={s.con}>
                {this.state.componentList}
            </div>
        );
    }

    loadList=(list)=>{

        let newState = Object.assign({}, this.state);

        list.forEach(element => {
            
            let newElement = <div style={s.ele_con}>

                <div style={s.ele_sec}>{element.price}</div>
                <div style={s.ele_sec}>{element.percent}</div>
                <div style={s.ele_sec}>{element.date}</div>
            </div>

            newState.componentList.push(newElement);
        });

        this.setState(newState);
    }
}

const s ={

    con:{
        display:'flex',
        height:'100%',
        width:'100%',
        borderRadius:10,
        backgroundColor:'#51d'
    },

    ele_con:{

        display:'flex',
        justifyContent:'space-between',
        height:20,
        width:'100%',
    },

    ele_sec:{

        height:'100%',
        width:'33%',
        backgroundColor:'red',


    }
}
 
export default ScrollableList;