import React, { Component } from 'react';
import Dashboard from '../pages/Dashboard';

class StudentListItem extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con} onClick={()=>{this.showInfo(this.props.studentInfo)}}>
                  <div style={s.sec2}>{this.props.studentInfo.gift}&emsp;</div>
                  <div style={s.sec2}>{this.props.studentInfo.credit}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.grade}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.firstName}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.lastName}&emsp;</div>
                  <div style={s.sec2}>{this.props.studentInfo.code}&emsp;</div>
            </div>
         );
    }

    showInfo(studentInfo){
        
        Dashboard.selectedStudent = studentInfo;
        Dashboard.selectedStudent.code = Number(Dashboard.selectedStudent.code)
        
        this.props.history.push('/student');
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
        width:'20.35%',
        textAlign:'right',
        borderRadius:2,
        fontFamily:'amp',
        cursor:'pointer',
        backgroundColor:'rgb(210,210,210)'
    },

    sec2:{
        height:'100%',
        width:'12.5%',
        textAlign:'right',
        borderRadius:2,
        fontFamily:'amp',
        cursor:'pointer',
        backgroundColor:'rgb(210,210,210)'
    }
}
 
export default StudentListItem;