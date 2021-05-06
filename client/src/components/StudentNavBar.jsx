import React, { Component } from 'react';

import StudentNavButton from './StudentNavButton';
import NavButton from './NavButton';

const activeList = {
    spendcredit:false,
    commitgift:false,
    commitpurchase:false,
    info:false,
    edit:false,
    studentList:false
}

class StudentNavbar extends Component {

    state = { width: 0, height: 0, activeButtons:Object.assign({},activeList) }

    constructor(props) {
        super(props);
        this.state.activeButtons['info'] = true;
        ///this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    static lastButton = "info";

    componentDidUpdate(){
        
        if(this.state.activeButtons[StudentNavbar.lastButton] === false){
            this.activeButton(StudentNavbar.lastButton);
        }
    }

    componentDidMount() {
        //this.updateWindowDimensions();
        //window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        //window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        let newState = Object.assign({},this.state);
        newState.width = window.innerWidth;
        newState.height = window.innerHeight;
        this.setState(newState);
    }

    render() {

        return (
            <div style={{
                display:'flex',
                justifyContent:'center',
                margin:0,
                minWidth:1280,
                minHeight:80,
                height:'13vh',
                width:'100vw',
                backgroundColor:'rgb(63,74,80)'
            }}>

            <div style={s.logo_con}>

            <a onClick={this.logout} style={s.logout}>خروج</a>

            <div style={s.icon}>
                <div  style={{fontFamily:'ebhar', color:'white', 
                fontSize:55, userSelect: 'none' }}>ادمین&thinsp;</div>
                <div  style={{fontFamily:'ebhar', color:'rgb(55, 110, 198)', 
                fontSize:55, userSelect: 'none' }}>مهتا</div>
            </div>

            
            
            </div>

                <div style={s.space}/>

                <StudentNavButton history={this.props.history} active={this.state.activeButtons.spendcredit} 
                activeButton={this.activeButton} navTo="spendcredit" text="برداشت اعتبار"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.commitpurchase} 
                activeButton={this.activeButton} navTo="commitpurchase" text="ثبت خرید"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.commitgift} 
                activeButton={this.activeButton} navTo="commitgift" text="ثبت هدیه"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.edit} 
                activeButton={this.activeButton} navTo="edit" text="ویرایش"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.info} 
                activeButton={this.activeButton} navTo="" text="مشخصات"/>
                <NavButton history={this.props.history} active={this.state.activeButtons.studentList} width={'12%'}
                activeButton={this.activeButton} navTo="" text="لیست دانش آموزان"/>

            </div>
         );
    }

    activeButton = (buttonName)=>{
        let newState = Object.assign({}, this.state);
        newState.activeButtons = Object.assign({},activeList);
        newState.activeButtons[buttonName] = true;
        if(buttonName != "studentList"){
            StudentNavbar.lastButton = buttonName;
        }else{
            StudentNavbar.lastButton = 'info';
        }
        this.setState(newState);
    }

    logout=()=>{
        fetch('/api/admin/logout', {
            method:"POST",
            body: "",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            })
            .then(res =>{
    
                if(res.status === 200){
                    
                    this.props.history.push('/auth');

                }else{
    
                    alert(res);
                }
            });
    }
}

const s = {

    con:{

        display:'flex',
        justifyContent:'space-between',
        height:'100%',
        width:1200,
        backgroundColor:'rgb(63,74,80)'
    },

    space:{

        width:'13.8%',
        height:'100%',
    },

    logo_con:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'space-around',
        height:'100%',
        width:'20%',
    },

    icon:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    logout:{
        cursor:'pointer',
        height:'30%',
        backgroundColor:'transparent',
        color:'rgb(55, 110, 198)',
        fontFamily:'amp',
        fontSize:15,
        padding:3,
        margin:4,
        borderRadius:4,
        borderWidth:1,
        borderStyle:'solid',
    }
}
 
export default StudentNavbar;