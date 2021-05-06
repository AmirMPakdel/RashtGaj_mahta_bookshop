import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import PurchaseList from '../components/PurchaseList';

class PurchaseModal extends Component {
    state = {  }
    render() { 

        

        return ( 
            <Modal styles={{modal:s.con, closeButton:{...{cursor:"pointer"}}}} open={this.props.open} onClose={this.props.onClose} center>
                <div style={s.list_con}>
                    <PurchaseList list={this.props.list}/>
                </div>
            </Modal>
         );

    }
}

const s = {

    con:{
        display:'flex',
        height:'78vh',
        minHeight:440,
        width:'86vw',
        minWidth:900,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    list_con:{
        
        height:'89%',
        width:'95%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12,
        backgroundColor:'white'
    },
}
 
export default PurchaseModal;