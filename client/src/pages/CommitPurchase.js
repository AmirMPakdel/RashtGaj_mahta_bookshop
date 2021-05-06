import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import {showNumber} from '../utils/NumberUtils';
import CommitPurchaseHandler from '../handlers/CommitPurchaseHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from '../pages/Dashboard';

class CommitPurchase extends Component {
    state = { usefrom:"credit", askModal:false, errorModal:false, successModal:false, pay:0}
    
    errorMassage="خطا در شبکه"

    CommitPurchaseData = {

        code:0,
        price:0,
        percent:0,
        info:""
    }

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

                <Input height={35} width={200} placeholder="کد خانواده" type="number"
                ref={(ref=>this.codeInput = ref)}
                onChange={(event)=>{this.CommitPurchaseData.code = Number(event.target.value)}}/>

                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="(مبلغ خرید(تومان"  type="number"
                    ref={(ref=>this.priceInput = ref)}
                    onChange={(event)=>{this.CommitPurchaseData.price = Number(event.target.value)}}/>

                    <Input height={35} width={200} placeholder="درصد خانواده" type="number" max={100}
                    ref={(ref=>this.percentInput = ref)}
                    onChange={(event)=>{this.CommitPurchaseData.percent = Number(event.target.value)}}/>
                    
                </div>

                <div style={s.sec2}>

                    <div style={s.sec3}>
                        <label style={s.usefrom_con}>
                        از اعتبار&emsp;
                            <input type="radio" value="credit" name="credit" 
                                checked={this.state.usefrom === "credit"}
                                onChange={this.onUseFromChanged} name="usefrom"/>
                        </label>
                    </div>

                    <div style={s.sec3}>
                        <label style={s.usefrom_con}>
                        از هدیه&emsp;
                            <input type="radio" value="gift" name="gift"
                                checked={this.state.usefrom === "gift"}
                                onChange={this.onUseFromChanged}name="usefrom"/>
                        </label>
                    </div>

                </div>

                <div style={s.text}>
                        {"("+showNumber(this.state.pay) +") : "+" مقدار مبلغ پرداختی به تومان"}
                </div>

                <PlainText height={90} width="24%" placeholder="توضیحات"
                ref={(ref=>this.infoPlainText = ref)} 
                onChange={(event)=>{this.CommitPurchaseData.info = event.target.value}}/>

                <Button height={50} width="15%" fontColor={"rgba(216,92,32,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose} onClose={this.askModalClose}>
                    ثبت اعتبار با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.errorMassage}
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت اعتبار با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    onUseFromChanged = (event)=>{

        this.setState({usefrom:event.currentTarget.value});
    }

    commit = ()=>{

        this.CommitPurchaseData.useFrom = this.state.usefrom;

        CommitPurchaseHandler(this.CommitPurchaseData,
            (res)=>{

                this.codeInput.clear();
                this.priceInput.clear();
                this.percentInput.clear();
                this.infoPlainText.clear();

                Dashboard.StudentInfoList = [];
                
                this.successModalOpen();
            },
            (err)=>{

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
        this.setState(newState);
    }

    setPay = ()=>{
        let newState = Object.assign({}, this.state);
        let gc = 0;
        if(newState.gift){gc+= Dashboard.selectedStudent.gift};
        if(newState.credit){gc+= Dashboard.selectedStudent.credit};

        if(this.CommitPurchaseData.price <= gc){

            newState.pay = 0;
        }else{
            newState.pay = this.CommitPurchaseData.price - gc;
        }
        
        
        this.setState(newState);
    }

    onUseFromChanged =(event)=>{
        let newState = Object.assign({},this.state);
        newState[event.currentTarget.value] = event.currentTarget.checked;
        let gc = 0;
        if(newState.gift){gc+= Dashboard.selectedStudent.gift};
        if(newState.credit){gc+= Dashboard.selectedStudent.credit};
        
        if(this.CommitPurchaseData.price <= gc){

            newState.pay = 0;
        }else{
            newState.pay = this.CommitPurchaseData.price - gc;
        }
        
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

    sec2:{
        height:'13%',
        width:'30%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"1px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
    },

    sec3:{

        height:'30%',
        width:'50%',
        display:'inline',
        alignItems:'center',
        justifyContent:'center',
    },

    text:{
        fontFamily:'amp',
        fontSize:18,
        color:'white',
        display:'inline'
    },

    usefrom_con:{
        fontFamily:'amp',
        fontSize:18,
        color:'white',
        display:'inline',
        height:'5%',
        width:'20%',
    },

    space:{
        height:'5%',
    }

}
 
export default CommitPurchase;