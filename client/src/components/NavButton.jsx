import React, { Component } from 'react';


class NavButton extends Component {
    state = {backgroundColor:'transparent'}
    render() {
        
        if(this.props.active){
            this.state.backgroundColor="rgb(220,96,36)";
        }else{
            this.state.backgroundColor="transparent";
        }
        
        return ( 
            <button style={{
                height:'100%',
                width: this.props.width || '9%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:this.state.backgroundColor,
            }}
            onClick={this.goTo}>

                <p style={s.text}>{this.props.text}</p>

            </button>
        );
    }

    goTo = ()=>{

        if(this.props.navTo == ""){
            this.props.activeButton('studentList');
            this.props.history.push('/admin');
        }else{
            this.props.activeButton(this.props.navTo);
            this.props.history.push('/admin/'+this.props.navTo);
        }
    }
}

const s = {

    text:{

        cursor:'pointer',
        fontFamily:'amp',
        fontSize:18,
        color:'white',
        textAlign:'center',
    }
}
 
export default NavButton;