import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        this.props.onFetchOrders();
        // axios.get('/orders.json')
        //     .then(res => {
        //         console.log(res.data);
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         console.log("fetchedOrders: ",fetchedOrders);
        //         this.setState({
        //             loading: false,
        //             orders: fetchedOrders
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({
        //             loading: false
        //         });
        //     })
    }
    
    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map((order) => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}/>    
                    ))}
                </div>
            );
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fecthOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));