import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
        price: 0
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            //to correct the decimal numbers
            price: this.props.price,
            customer: {
                name: 'Andre Silva',
                address: {
                    street: 'rua dsafdgre, 45',
                    zipCode: '3434344',
                    country: 'Portugal'    
                },
                email: 'teste@test.com'                
            },
            deliveryMethod: 'priority line'
        }
        //for firebase only we have to put .json at the end of the target
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    render() {
        let form = (
            <form action="">
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your e-mail"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;