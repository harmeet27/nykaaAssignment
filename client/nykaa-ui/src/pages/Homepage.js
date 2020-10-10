import React from "react";
import { connect } from "redux-zero/react";
import debounce from "lodash.debounce";
import actions from "../store/actions";

import "./Homepage.css";

import Products from "../components/Products/Products";
import Search from "../components/Search/Search";
import Header from "../components/Header/Header";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Error from '../components/Error/Error';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      page: 1,
      perPage: 10,
    };
    this.debouncedOnChange = debounce(this.debouncedOnChange, 1400);
  }

  componentDidMount() {
    this.getProductList();
  }

  setPageNumber = () => {
    const { page } = this.state;
    this.setState(
      {
        page: page + 1,
      },
      () => this.getProductList()
    );
  };

  getProductList = () => {
    const { getProducts } = this.props;
    const { page, perPage, searchValue } = this.state;
    console.log(searchValue);
    const params = {
      page,
      perPage,
      value: searchValue,
    };
    getProducts(params);
  };

  changeInputValue = (value) => {
    this.setState(
      {
        searchValue: value,
      },
      () => this.debouncedOnChange(value)
    );
  };

  debouncedOnChange = (value) => {
    const { searchValue } = this.state;
    this.setState(
      {
        page: 1,
        value: searchValue,
      },
      () => this.getProductList()
    );
  };

  render() {
    const { data, loading, hasMore, error } = this.props;
    const { searchValue } = this.state;

    return (
      <div className="root">
        <Header />
        <div className="body">
          <Search
            onChange={this.changeInputValue}
            value={searchValue}
            className="search"
          />
          {error && <Error/>}
          <Products
            products={data.records}
            setPageNumber={this.setPageNumber}
            hasMore={hasMore}
          />
          <ScrollToTop />
          {loading && <div> Fetching ...</div>}
        </div>
      </div>
    );
  }
}

const mapToProps = ({
  products: { data, loading, error, hasMore },
}) => ({
  data,
  loading,
  error,
  hasMore,
});

export default connect(mapToProps, actions)(Homepage);
