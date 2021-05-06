import React, { Component } from 'react';

import PurchaseListItem from './PurchaseListItem';

class PurchaseList extends Component {
    state = { CompList:[] }

    componentDidMount(){

        this.showList(this.props.list)
    }

    render() { 
        return ( 

            <div style={s.con}>

                <div style={s.header_con}>
                    
                    <div style={s.header2}> توضیحات </div>
                    <div style={s.header}> تاریخ </div>
                    <div style={s.header3}> درصد خانواده </div>
                    <div style={s.header}> قیمت </div>
                    
                    <div style={s.space}></div>
                
                </div>

                <div style={s.list_con}>
                    <div style={{height:'auto'}}>
                        {this.state.CompList}
                    </div>

                </div>

            </div>
        );
    }

    showList = (list)=>{

        let CompList = [];
        let i = 1;

        list.forEach(element => {

            CompList.push(

                <PurchaseListItem key={i} history={this.props.history} element={element}/>
                
            )

            i++;
            
        });
        
        this.state.CompList= CompList;
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
        width:'22%',
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
        width:'40%',
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

    header3:{
        width:'13.8%',
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
 
export default PurchaseList;
