import React, { Component } from 'react';

import StudentListItem from './StudentListItem';
import sort1 from '../assets/icons/sort1.png';
import sort2 from '../assets/icons/sort2.png';
import sort3 from '../assets/icons/sort3.png';
import sort4 from '../assets/icons/sort4.png';

class StudentList extends Component {
    state = { studentList:[], NameSort:sort2, CodeSort:sort4}

    componentDidMount(){

        this.props.getShowList(this.showList);
    }

    render() { 
        return ( 

            <div style={s.con}>

                <div style={s.header_con}>
                    
                    <div style={s.header2}> مقدار هدیه </div>
                    <div style={s.header2}> مقدار اعتبار </div>
                    <div style={s.header}> پایه تحصیلی </div>
                    <div style={s.header}> نام </div>
                    <div style={s.header} onClick={this.sortByName}>  نام خانوادگی <img style={s.sort_ic} src={this.state.NameSort}/> </div>
                    <div style={s.header2} onClick={this.sortByCode}> کد خانواده <img style={s.sort_ic} src={this.state.CodeSort}/></div>
                    <div style={s.space}></div>
                
                </div>

                <div style={s.list_con}>
                
                    <div style={{height:'auto'}}>
                        {this.state.studentList}
                    </div>

                </div>

            </div>
        );
    }

    sortByName = ()=>{

        if(this.props.listType == "signed"){

            let newState = Object.assign({},this.state);

            if(this.state.NameSort === sort2){
                newState.NameSort = sort4;
                newState.CodeSort = sort2;
            }else if(this.state.NameSort === sort4){
                newState.NameSort = sort3;
                newState.CodeSort = sort2;
            }else if(this.state.NameSort === sort3){
                newState.NameSort = sort4;
                newState.CodeSort = sort2;
            }
            
            this.setState(newState, this.props.sortByName);
        }
    }

    sortByCode = ()=>{

        let newState = Object.assign({},this.state);

        if(this.state.CodeSort === sort2){
            newState.NameSort = sort2;
            newState.CodeSort = sort4;
        }else if(this.state.CodeSort === sort4){
            newState.NameSort = sort2;
            newState.CodeSort = sort3;
        }else if(this.state.CodeSort === sort3){
            newState.NameSort = sort2;
            newState.CodeSort = sort4;
        }
        this.setState(newState,this.props.sortByCode);
    }

    showList = (list)=>{

        let studentList = [];
        let i = 1;

        list.forEach(element => {
            
            studentList.push(

                <StudentListItem key={i} history={this.props.history} studentInfo={element}/>
            )

            i++;
            
        });
        
        this.state.studentList= studentList;
        this.setState(this.state);
    }
}

const s = {

    con:{
        display:'flex',
        flexDirection:'column',
        height:'95%',
        width:'98%',
    },

    space:{
        width:"1.5%"
    },

    list_con:{
        display:'flex',
        flexDirection:'column',
        height:'95%',
        width:'100%',
        overflowY:'scroll',
    },

    header_con:{
        display:'flex',
        justifyContent:'space-between',
        height:30,
        width:'100%',
        marginBottom:8,
        backgroundColor:'white'
    },

    header:{
        width:'20.03%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        backgroundColor:'rgb(80,80,80)',
        textAlign:'center',
        color:'white',
        fontFamily:'amp',
    },

    header2:{
        width:'12.35%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        backgroundColor:'rgb(80,80,80)',
        textAlign:'center',
        color:'white',
        fontFamily:'amp',
    },

    sort_ic:{

        height:'80%',
        margin:6,
        cursor:'pointer'
    }


}
 
export default StudentList;
