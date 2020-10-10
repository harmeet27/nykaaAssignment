import axios from "axios";

const actions = (store) => {
  const getProducts = (state, query) => {
    store.setState({
      products: {
        ...store.getState().products,
        loading: true,
        error: false,
      },
    });
    const { prevQuery } = store.getState().products;
    if (query.value && query.value !== prevQuery) {
      store.setState({
        products: {
          ...store.getState().products,
          data: {
            records: [],
          },
        },
      });
    }
    
    axios
      .get(
        `/products/?page=${query.page}&limit=${query.perPage}&id=${query.value}`
      )
      .then((response) => {
        store.setState({
          products: {
            ...store.getState().products,
            loading: false,
            error: false,
            totalPages: response.data.total_pages,
            page: response.data.page,
            data: {
              ...store.getState().products.data,
              records: [
                ...store.getState().products.data.records,
                ...response.data.results,
              ],
            },
            prevQuery: response.data.filter,
            hasMore: response.data.numOfRecordsLeft > 0,
          },
        });
      }).catch((error) => {
        store.setState({
            products: {
              ...store.getState().products,
              loading: false,
              error: true,
            },
          });
      })
  };

  return {
    getProducts,
  };
};
export default actions;
