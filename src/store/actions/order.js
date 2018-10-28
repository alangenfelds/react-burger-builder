import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";


export const purchaceBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaceBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaceBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaceBurger = ( orderData, token ) => {
    return dispatch => {
        dispatch( purchaceBurgerStart() );
        axios.post("/orders.json?auth=" + token, orderData)
        .then(response => {
          console.log(response.data);
          dispatch(purchaceBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
          console.log(error);
          dispatch(purchaceBurgerFail( error ) );
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders) => {
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

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart() );
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            // console.log(res.data);
            const fetchedOrders = [];

            for ( let key in res.data ) {
                fetchedOrders.push( {...res.data[key], id: key} );
            }
            dispatch(fetchOrdersSuccess (fetchedOrders));
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchOrdersFail(err));
        })
    }
}
