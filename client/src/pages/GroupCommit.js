import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import GroupCommitHandler from '../handlers/GroupCommitHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from '../pages/Dashboard';

const gradeOptions=[
    {value:"هفتم", label:"هفتم"},
    {value:"هشتم", label:"هشتم"},
    {value:"نهم", label:"نهم"},
    {value:"دهم", label:"دهم"},
    {value:"یازدهم", label:"یازدهم"},
    {value:"دوازدهم", label:"دوازدهم"},
    {value:"فارغ التحصیل", label:"فارغ التحصیل"}
]

const emptyGroupCommitData = {
    start:0,
    number:0,
    gift:0,
}

class GroupCommit extends Component {
    
    state = { askModal:false, errorModal:false, successModal:false, error:""}

    errorMassage="خطا در شبکه"

    GroupCommitData = Object.assign({}, emptyGroupCommitData);

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

                    <Input height={35} width={200} placeholder="تعداد دانش آموزان" type="number"
                        ref={(ref=>this.numberInput = ref)}
                        onChange={(event)=>{this.GroupCommitData.number = Number(event.target.value)}}/>

                    <Input height={35} width={200} placeholder="شروع از" type="number"
                        ref={(ref=>this.startInput = ref)}
                        onChange={(event)=>{this.GroupCommitData.start = Number(event.target.value)}}/>

                </div>

                <Input height={35} width={200} placeholder="هدیه اولیه" type="number"
                    ref={(ref=>this.giftInput = ref)}
                    onChange={(event)=>{this.GroupCommitData.gift = Number(event.target.value)}}/>


                <Button height={50} width="15%" fontColor={"rgba(216,92,32,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose} onClose={this.askModalClose}>
                    ثبت گروهی با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.state.error}
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت گروهی با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    commit = ()=>{

        GroupCommitHandler(this.GroupCommitData, 
            
            (res)=>{

                this.numberInput.clear();
                this.giftInput.clear();
                this.startInput.clear();

                Dashboard.StudentInfoList = [];
                this.GroupCommitData = Object.assign({}, emptyGroupCommitData);
                
                this.successModalOpen();
            },
            (err)=>{

                let newState = Object.assign({}, this.state);
                newState.error = err;
                this.setState(newState, ()=>{

                    this.errorModalOpen();
                });
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

    successModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
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

    space:{
        height:'2%',
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
 
export default GroupCommit;