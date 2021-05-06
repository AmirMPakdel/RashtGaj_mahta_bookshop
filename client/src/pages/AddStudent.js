import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import LoginPage from '../pages/Login';
import AddStudentHandler from '../handlers/AddStudentHandler';
import Select from 'react-select';
import Dashboard from '../pages/Dashboard';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import {GetSchoolList} from '../handlers/SchoolListHandler';

const gradeOptions=[
    {value:"هفتم", label:"هفتم"},
    {value:"هشتم", label:"هشتم"},
    {value:"نهم", label:"نهم"},
    {value:"دهم", label:"دهم"},
    {value:"یازدهم", label:"یازدهم"},
    {value:"دوازدهم", label:"دوازدهم"},
    {value:"فارغ التحصیل", label:"فارغ التحصیل"}
]

const fieldOptions=[
    {value:"ریاضی", label:"ریاضی"},
    {value:"تجربی", label:"تجربی"},
    {value:"هنر", label:"هنر"},
    {value:"انسانی", label:"انسانی"},
]

const emptyStudent = {

    firstName:"",
    lastName:"",
    grade:"",
    field:"",
    school:"",
    phone:"",
    home:"",
    inviterCode:0
}
  

class AddStudent extends Component {
    state = { askModal:false, errorModal:false, successModal:false, studentCode:"" , schoolNameList:[]}

    componentDidMount(){
        
        GetSchoolList(()=>{

            let newState = Object.assign({}, this.state);
            newState.schoolNameList = LoginPage.schoolNameList;
            this.setState(newState);
        })
    }

    errorMassage="خطا در شبکه"

    AddStudentData = Object.assign({}, emptyStudent);

    render() { 
        return ( 
            <div style={{opacity:0.85,
                display:'flex',
                height:'78vh',
                minHeight:440,
                width:'80vw',
                minWidth:900,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-around',
                borderRadius:15,
                backgroundColor:'rgb(216,92,32)'}}>

                <div style={s.space}/>
                
                <div style={s.sec1}>
                    
                    <Input height={35} width={200} placeholder="نام خانوادگی" type="text" dir="rtl"
                    ref={(ref=>this.lastNameInput = ref)} value={this.st}
                    onChange={(event)=>{this.AddStudentData.lastName = event.target.value}}/>

                    <Input height={35} width={200} placeholder="نام"type="text" dir="rtl"
                    ref={(ref=>this.firstNameInput = ref)}
                    onChange={(event)=>{this.AddStudentData.firstName = event.target.value}}/>

                </div>
                
                <div style={s.sec1}>

                    
                    <Select options={fieldOptions} styles={customStyles2} placeholder="رشته"
                    onChange={(e)=>{this.AddStudentData.field = e.value}} ref={ref=>this.fieldSelect=ref}/>

                    <Select options={this.state.schoolNameList} styles={customStyles} placeholder="مدرسه" 
                    onChange={(e)=>{this.AddStudentData.school = e.value}} ref={ref=>this.schoolSelect=ref}/>

                    <Select options={gradeOptions} styles={customStyles2} placeholder="پایه"
                    onChange={(e)=>{this.AddStudentData.grade = e.value}} ref={ref=>this.gradeSelect=ref}/>


                </div>
                
                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="شماره همراه" type="tel"
                    ref={(ref=>this.phoneInput = ref)}
                    onChange={(event)=>{this.AddStudentData.phone = event.target.value}}/>

                    <Input height={35} width={200} placeholder="شماره منزل" type="tel"
                    ref={(ref=>this.homeInput = ref)}
                    onChange={(event)=>{this.AddStudentData.home = event.target.value}}/>

                </div>

                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="کد معرف" type="number"
                    ref={(ref=>this.inviterCodeInput = ref)}
                    onChange={(event)=>{this.AddStudentData.inviterCode = Number(event.target.value)}}/>

                </div>
                
                <Button height={50} width="15%" fontColor={"rgba(216,92,32,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose} onClose={this.askModalClose}>
                    ثبت دانش آموز با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.errorMassage}
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت دانش آموز با موفقیت انجام شد
                    <br/>
                    {this.state.studentCode} : کد خانواده
                </SuccessModal>

            </div>
        );
    }

    commit = ()=>{
        
        AddStudentHandler(this.AddStudentData,
            (res)=>{

                this.firstNameInput.clear();
                this.lastNameInput.clear();
                this.inviterCodeInput.clear();
                this.phoneInput.clear();
                this.homeInput.clear();

                Dashboard.StudentInfoList = [];

                let grade = this.AddStudentData.grade;
                let field = this.AddStudentData.field;
                let school = this.AddStudentData.school;
                this.AddStudentData = Object.assign({}, emptyStudent);
                this.AddStudentData.school = school;
                this.AddStudentData.field = field;
                this.AddStudentData.grade = grade;

                this.successModalOpen(res.code);

            },(err)=>{

                this.errorMassage = err;
                this.errorModalOpen();
            }
        );
    }

    askModalCommit = ()=>{

        this.askModalClose();
        this.commit();
    }

    askModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.askModal =true;
        this.setState(newState);
    }

    askModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.askModal =false;
        this.setState(newState);
    }

    errorModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal =true;
        this.setState(newState);
    }

    errorModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal =false;
        this.setState(newState);
    }

    successModalOpen = (code)=>{

        let newState = Object.assign({}, this.state);
        newState.studentCode = code;
        newState.successModal =true;
        this.setState(newState);
    }

    successModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =false;
        this.setState(newState);
    }
}

const s = {

    con:{
        opacity:0.85,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:480,
        width:1100,
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    sec1:{
        height:'15%',
        width:'60%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"1px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
    },

    space:{
        height:'5%',
    },
}

const customStyles = {

    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
        fontFamily:"amp",
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 150,
        display:'flex',
        flexDirection:'row',
        borderStyle:"solid",
        borderRadius:5,
        borderWidth:2,
        paddingLeft:20,
        paddingRight:10,
        fontFamily:"amp",
        borderColor:'white',
        backgroundColor:'white'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
      }
}

const customStyles2 = {

    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
        fontFamily:"amp",
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 100,
        display:'flex',
        flexDirection:'row',
        borderStyle:"solid",
        borderRadius:5,
        borderWidth:2,
        paddingLeft:20,
        paddingRight:10,
        fontFamily:"amp",
        borderColor:'white',
        backgroundColor:'white'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
      }
}
export default AddStudent;