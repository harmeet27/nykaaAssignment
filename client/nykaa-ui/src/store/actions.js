import axios from 'axios';

const actions = (store) => {
    const getProducts = (state) => {
        console.log(state);
        store.setState({
            products:{
                ...store.getState().products,
                loading: true,
                hasData: false,
                error: false
            }
        })
        axios.get('/products').then((response) => {
            store.setState({
                products:{
                    ...store.getState().products,
                    loading: false,
                    hasData: true,
                    error: false,
                    data: response.data
                }
            })
        })
    }

    return {
        getProducts
    };
}
export default actions;