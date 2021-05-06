import React, { Component } from 'react';
import Dashboard from '../pages/Dashboard';
let jalaali = require('jalaali-js');

class PurchaseListItem extends Component {
    state = {  }
    render() { 

        let JDate = "";

        let date = this.props.element.created;
        let year = Number(date.slice(0,4));
        let month = Number(date.slice(5,7));
        let day = Number(date.slice(8,10));

        let temp = jalaali.toJalaali(year,month,day);

        JDate = temp.jy+"/"+temp.jm+"/"+temp.jd;

        let short_info = this.props.element.info;
        if( short_info.length > 38){

            short_info = "..."+short_info.slice(0,38);
        }
        

        return ( 
            <div style={s.con}>
                <div style={s.sec2}>{short_info}&emsp;</div>
                <div style={s.sec}>{JDate}&emsp;</div>
                <div style={s.sec3}>{this.props.element.percent}&emsp;</div>
                <div style={s.sec}>{this.props.element.price}&emsp;</div>
            </div>
         );
    }
}

const s = {

    con:{
        display:'flex',
        height: 25,
        width:'99.8%',
        justifyContent:'space-between',
        marginBottom:4,
        borderStyle:"solid",
        borderWidth:0,
        borderRadius:5,
        borderColor:'rgb(216,92,32)',
        backgroundColor:'white'
    },

    sec:{
        height:'100%',
        width:'22.2%',
        textAlign:'center',
        borderRadius:2,
        fontFamily:'amp',
        cursor:'pointer',
        backgroundColor:'rgb(210,210,210)'
    },

    sec2:{
        display: 'inline-block',
        height:'100%',
        width:'40.68%',
        textAlign:'right',
        borderRadius:2,
        fontFamily:'amp',
        cursor:'pointer',
        backgroundColor:'rgb(210,210,210)'
    },

    sec3:{
        height:'100%',
        width:'14.1%',
        textAlign:'center',
        borderRadius:2,
        fontFamily:'amp',
        cursor:'pointer',
        backgroundColor:'rgb(210,210,210)'
    }
}
 
export default PurchaseListItem;