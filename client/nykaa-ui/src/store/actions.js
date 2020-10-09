import axios from 'axios';

const actions = (store) => {
    const getProducts = (state, id) => {
        console.log(id);
        store.setState({
            products:{
                ...store.getState().products,
                loading: true,
                hasData: false,
                error: false
            }
        })
        axios.get(`/products/?id=${id}`).then((response) => {
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