import React, { Component } from 'react';
import NavButton from './NavButton';

const activeList = {
    spendcredit:false,
    commitgift:false,
    commitpurchase:false,
    groupcommit:false,
    groupgift:false,
    addstudent:false,
    studentList:false
}

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, activeButtons:Object.assign({},activeList) };
        this.state.activeButtons.studentList=true;
        //this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    static lastButton = "studentList";

    componentDidUpdate(){

        if(this.state.activeButtons[Navbar.lastButton] === false){
            this.activeButton(Navbar.lastButton);
        }
    }
      
    componentDidMount() {
        ///this.updateWindowDimensions();
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
                        <div  style={{fontFamily:'ebhar', color:'rgb(220,96,36)', 
                        fontSize:55, userSelect: 'none' }}>مهتا</div>
                    </div>
                </div>
                <div style={s.space}/>

                <div style={{width:"7%"}}/>
                <NavButton history={this.props.history} active={this.state.activeButtons.spendcredit} 
                activeButton={this.activeButton} navTo="spendcredit" text="برداشت اعتبار"/>
                {/*<NavButton history={this.props.history} active={this.state.activeButtons.commitpurchase} 
                activeButton={this.activeButton} navTo="commitpurchase" text="ثبت خرید"/>*/}
                <NavButton history={this.props.history} active={this.state.activeButtons.groupgift} 
                activeButton={this.activeButton} navTo="groupgift" text="هدیه گروهی"/>
                <NavButton history={this.props.history} active={this.state.activeButtons.commitgift} 
                activeButton={this.activeButton} navTo="commitgift" text="ثبت هدیه"/>
                <NavButton history={this.props.history} active={this.state.activeButtons.groupcommit} 
                activeButton={this.activeButton} navTo="groupcommit" text="ثبت گروهی"/>
                <NavButton history={this.props.history} active={this.state.activeButtons.addstudent} width={'11%'}
                activeButton={this.activeButton} navTo="addstudent" text="دانش آموز جدید"/>
                <NavButton history={this.props.history} active={this.state.activeButtons.studentList} width={'12%'}
                activeButton={this.activeButton} navTo="" text="لیست دانش آموزان"/>

            </div>
         );
    }

    activeButton = (buttonName)=>{
        this.state.activeButtons = Object.assign({},activeList);
        this.state.activeButtons[buttonName] = true;
        Navbar.lastButton = buttonName;
        this.setState(this.state);
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

    space:{

        width:'5%',
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
        color:'rgb(220,96,36)',
        fontFamily:'amp',
        fontSize:15,
        padding:3,
        margin:4,
        borderRadius:4,
        borderWidth:1,
        borderStyle:'solid',
    }
}
 
export default Navbar;