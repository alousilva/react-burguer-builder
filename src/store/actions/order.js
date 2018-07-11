import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurguerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData,
        purchased: true
    };
};

export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    };
};

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    };
};

export const purchaseBurguer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        //for firebase only we have to put .json at the end of the target
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response);
            dispatch(purchaseBurguerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            //console.log(error);
            dispatch(purchaseBurguerFail(error));
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fecthOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fecthOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log("fetchedOrders: ",fetchedOrders);
                dispatch(fecthOrdersSuccess(fetchedOrders));
                // this.setState({
                //     loading: false,
                //     orders: fetchedOrders
                // });
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
                // this.setState({
                //     loading: false
                // });
            })        
    }
}

