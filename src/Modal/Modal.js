import React from "react";
import './Modal.css'


const styles = {
    button: {
        color:'red'
    }
};

export default class Modal extends React.Component{

    state ={
        isOpen: false
    };
    render() {
        return (
            <React.Fragment>
                <button onClick={()=> this.setState({ isOpen:true})}>Open modal</button>

                { this.state.isOpen && (<div className={'modal'}>
                    <div className={'modal-body'}>
                        <h1>Modal title</h1>
                        <p>I am awesome modal</p>
                        <button style={styles.button} onClick={()=> this.setState({ isOpen:false})}>&times;</button>
                    </div>
                </div>)}

            </React.Fragment>
        )
    }
}