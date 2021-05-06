import React, { Component } from 'react';

import StudentList from '../components/StudentList';
import {GetStudentList} from '../handlers/StudentListHandler';
import SearchBar from '../components/SearchBar';
import {Search} from '../utils/Search';
import Button from '../components/Button';
import {Sort} from '../utils/Sort';

class Dashboard extends Component {

    static StudentInfoList = [];
    static selectedStudent = {}
    
    state = { sortBy:"code", sortOrder:"A", listBtn:"نمایش ثبت نشده ها", listType:"invites", list:[]}

    componentDidMount(){

        if(Dashboard.StudentInfoList.length == 0){

            GetStudentList((res)=>{

                Dashboard.StudentInfoList = res;

                this.listBtn();
    
            },(err)=>{
    
                alert(err);
            });

        }else{

            this.listBtn();
        }
        
    }

    render() { 
        return ( 
            <div style={s.bg}>
                <div style={{opacity:0.85,
                            display:'flex',
                            height:'78vh',
                            minHeight:440,
                            width:'86vw',
                            minWidth:900,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            borderRadius:15,
                            backgroundColor:'rgb(216,92,32)',}}>

                    <div style={s.space}/>
                    
                    <div style={s.list_con}>
                        <StudentList listType={this.state.listType} getShowList={(showlist)=>this.showlist=showlist} 
                        list={this.state.list}history={this.props.history} sortByName={()=>{this.sortBy("name")}} 
                        sortByCode={()=>{this.sortBy("code")}}/>
                    </div>

                    <div style={{display:"flex", height:"14%", width:"100%", alignItems:'center'}}>
                        <div style={{width:"30%"}}></div>
                        <SearchBar searchBtnClick={this.search} list={this.state.list}/> 
                        <div style={{width:"30%", height:"100%"}}>
                            <Button fontSize="16px" onClick={this.listBtn}>{this.state.listBtn}</Button>
                        </div>  
                    </div>
                    

                </div>
            </div>
         );
    }

    search=(searchWord)=>{
        
        if(searchWord != ""){

            let list = Search(searchWord, this.state.list)
            list = Sort(list,this.state.sortBy, this.state.sortOrder)
            this.showlist(list);

        }else{

            Sort(this.state.list, this.state.sortBy, this.state.sortOrder)
            this.showlist(Sort(this.state.list, this.state.sortBy, this.state.sortOrder));
        }
    }

    sortBy= (by)=>{

        let newState = Object.assign({}, this.state);
        
        if(newState.sortBy == by){
            
            if(newState.sortOrder == "A"){
                newState.sortOrder = "D";
            }else{
                newState.sortOrder = "A";
            }
        }else{
            newState.sortBy = by;
            newState.sortOrder = "A";
        }

        this.setState(newState);
        this.showlist(Sort(this.state.list, newState.sortBy, newState.sortOrder));
    }

    listBtn= ()=>{

        if(this.state.listType == "signed"){

            let newState = Object.assign({}, this.state);

            newState.listType = "invites";
            newState.listBtn = "نمایش دانش آموزان";
            newState.list = this.showInvites();

            this.setState(newState, ()=>{
                this.showlist(newState.list);
            });

        }else{

            let newState = Object.assign({}, this.state);

            newState.listType = "signed";
            newState.listBtn = "نمایش ثبت نشده ها";
            newState.list = this.showSigned();

            this.setState(newState, ()=>{
                this.showlist(newState.list);
            });
        }
    }

    showSigned = ()=>{

        let list = [];

        Dashboard.StudentInfoList.forEach(element => {
            
            if(element.firstName){
                list.push(element);
            }
        });

        return list;
    }

    showInvites = ()=>{

        let list = [];

        Dashboard.StudentInfoList.forEach(element => {
            
            if(!element.firstName){
                list.push(element);
            }
        });

        return list;
    }

}

const s = {

    bg:{

        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    container:{
        
        opacity:0.85,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:'70%',
        width:'80%',
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    list_con:{
        
        height:'80%',
        width:'95%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12,
        backgroundColor:'white'
    },

    space:{
        height:'1%'
    }
}
 
export default Dashboard;