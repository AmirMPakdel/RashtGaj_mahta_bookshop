import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import SpendCreditHandler from '../handlers/SpendCreditHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from './Dashboard';

class SpendCredit extends Component {
    state = { credit:Dashboard.selectedStudent.credit, askModal:false, errorModal:false, successModal:false }

    errorMassage="خطا در شبکه"

    SpendCreditData = {

        code:Dashboard.selectedStudent.code,
        price:0,
    }

    render() { 

        if(this.SpendCreditData.code === undefined){

            return(
                <Redirect to="/admin" />
            );

        }else{

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
                    backgroundColor:'rgb(55, 110, 198)'}}>

                    <div style={s.space}/>
                    

                    <Input height={35} width="20%" placeholder="(مبلغ خرید(تومان"  type="number"
                    ref={(ref=>this.priceInput = ref)}
                    onChange={(event)=>{this.SpendCreditData.price = Number(event.target.value)}}/>

                    <div style={s.text}>
                        {"("+this.state.credit +") : "+" مقدار اعتبار به تومان"}
                    </div>
                    
                    <Button height={50} width="15%" fontColor={"rgba(55, 110, 198,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                    <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose} onClose={this.askModalClose}>
                        ثبت مصرف اعتبار با مشخصات زیر؟
                    </YesNoModal>
                    
                    <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                        {this.errorMassage}
                    </ErrorModal>
                    
                    <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                        عملیات ثبت مصرف اعتبار با موفقیت انجام شد
                    </SuccessModal>

                </div>
            );

        }
    }

    onUseFromChanged = (event)=>{

        this.setState({usefrom:event.currentTarget.value});
    }

    commit = ()=>{

        this.SpendCreditData.useFrom = this.state.usefrom;

        SpendCreditHandler(this.SpendCreditData,
            (res)=>{

                this.priceInput.clear();

                Dashboard.StudentInfoList = [];
                Dashboard.selectedStudent.credit -= this.SpendCreditData.price;
                
                this.successModalOpen();

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

    successModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =true;
        this.setState(newState);
    }

    successModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =false;
        newState.credit = Dashboard.selectedStudent.credit;
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
        backgroundColor:'rgb(55, 110, 198)',
    },

    sec1:{
        height:'15%',
        width:'30%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"1px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
    },
    
    sec2:{

        height:'30%',
        width:'50%',
        display:'inline',
        alignItems:'center',
        justifyContent:'center',
    },

    space:{
        height:'5%',
    },

    usefrom_con:{
        fontFamily:'amp',
        fontSize:18,
        color:'white',
        display:'inline',
        height:'5%',
        width:'20%',
    },

    text:{
        fontFamily:'amp',
        fontSize:18,
        color:'white',
        display:'inline'
    }

}
 
export default SpendCredit;