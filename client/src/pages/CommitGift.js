import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import CommitGiftHandler from '../handlers/CommitGiftHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from './Dashboard';



class CommitGift extends Component {
    state = { askModal:false, errorModal:false, successModal:false }

    errorMassage="خطا در شبکه"

    CommitGiftData = {

        code:0,
        price:0,
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

                <Input height={35} width="20%" placeholder="کد خانواده" type="number"
                ref={(ref=>this.codeInput = ref)}
                onChange={(event)=>{this.CommitGiftData.code = Number(event.target.value)}}/>

                <Input height={35} width="20%" placeholder="(مبلغ هدیه(تومان"  type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{this.CommitGiftData.price = Number(event.target.value)}}/>

                <PlainText height={90} width="24%" placeholder="توضیحات"
                ref={(ref=>this.infoPlainText = ref)} 
                onChange={(event)=>{this.CommitGiftData.info = event.target.value}}/>

                <Button height={50} width="15%" fontColor={"rgba(216,92,32,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose} onClose={this.askModalClose}>
                    ثبت هدیه؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.errorMassage}
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت هدیه با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    commit = ()=>{

        CommitGiftHandler(this.CommitGiftData,
            (res)=>{

                this.codeInput.clear();
                this.priceInput.clear();
                this.infoPlainText.clear();

                Dashboard.StudentInfoList = [];
                
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
        height:'5%',
    }
}
 
export default CommitGift;