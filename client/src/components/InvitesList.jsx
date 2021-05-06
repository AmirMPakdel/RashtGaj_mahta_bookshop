import React, { Component } from 'react';

import InviteListItem from '../components/InviteListItem';
import Dashboard from '../pages/Dashboard';

class InvitesList extends Component {
    state = { invitesList:[] }

    componentDidMount(){

        let inviteds = Dashboard.selectedStudent.inviteds;
        let elements = [];

        inviteds.forEach(e=>{

            Dashboard.StudentInfoList.forEach(s=>{

                if(s._id == e){

                    elements.push({lastName:s.lastName, firstName:s.firstName, code:s.code});
                }
            })
        })

        this.showList(elements);
    }

    render() { 
        return ( 

            <div style={s.con}>

                <div style={s.header_con}>
                    
                    <div style={s.header}> نام خانوادگی </div>
                    <div style={s.header}> نام </div>
                    <div style={s.header}> کد خانواده </div>
                    
                    <div style={s.space}></div>
                
                </div>

                <div style={s.list_con}>
                    <div style={{height:'auto'}}>
                        {this.state.invitesList}
                    </div>

                </div>

            </div>
        );
    }

    showList = (list)=>{

        let invitesList = [];
        let i = 1;

        list.forEach(element => {
            
            invitesList.push(

                <InviteListItem key={i} history={this.props.history} updateInfo={this.props.updateInfo} studentInfo={element}/>
            )

            i++;
        });
        
        this.state.invitesList= invitesList;
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
        width:'32.5%',
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
 
export default InvitesList;
