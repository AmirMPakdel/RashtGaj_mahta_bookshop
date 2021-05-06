import React, { Component } from 'react';
import Dashboard from '../pages/Dashboard';

class StudentListItem extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con} onClick={this.showInfo}>
                <div style={s.sec}>{this.props.studentInfo.firstName}&emsp;</div>
                <div style={s.sec}>{this.props.studentInfo.lastName}&emsp;</div>
                <div style={s.sec}>{this.props.studentInfo.code}&emsp;</div>
            </div>
         );
    }

    showInfo = ()=>{

        Dashboard.StudentInfoList.forEach(s=>{

            if(s.code == this.props.studentInfo.code){

                Dashboard.selectedStudent = s;
            }
        });

        this.props.history.push("/student");
        this.props.updateInfo();
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
        width:'33%',
        textAlign:'right',
        borderRadius:2,
        fontFamily:'amp',
        cursor:'pointer',
        backgroundColor:'rgb(210,210,210)'
    }
}
 
export default StudentListItem;