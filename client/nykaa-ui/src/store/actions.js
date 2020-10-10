import axios from 'axios';

const actions = (store) => {
    const getProducts = (state, query) => {
        store.setState({
            products:{
                ...store.getState().products,
                loading: true,
                hasData: false,
                error: false
            }
        })
        const { prevQuery } = store.getState().products;
        if(query.value && query.value !== prevQuery){
            store.setState({
                products:{
                ...store.getState().products,
                data: {
                    records: []
                }
                }
            });
        }
        console.log(query);
        axios.get(`/products/?page=${query.page}&limit=${query.perPage}&id=${query.value}`).then((response) => {
            store.setState({
                products:{
                    ...store.getState().products,
                    loading: false,
                    hasData: true,
                    error: false,
                    totalPages: response.data.total_pages,
                    page: response.data.page,
                    data: {
                      ...store.getState().products.data,
                      records: [...store.getState().products.data.records, ...response.data.results]
                    },
                    prevQuery: response.data.filter,
                    hasMore: response.data.numOfRecordsLeft > 0
                }
            })
        })
    }

    return {
        getProducts
    };
}
export default actions;