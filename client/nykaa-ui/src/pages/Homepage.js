import React from 'react';
import { connect } from 'redux-zero/react';
import debounce from 'lodash.debounce';
import actions from '../store/actions';

import './Homepage.css';

import Products from '../components/Products/Products';
import Search from '../components/Search/Search';
import Header from '../components/Header/Header';

class Homepage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        searchValue: '',
        page: 1,
        perPage: 20
      };
      this.debouncedOnChange = debounce(this.debouncedOnChange, 1400);
  }


  componentDidMount(){
    this.getProductList();
  }

  setPageNumber = () =>{
    const { page } = this.state;
    this.setState({
      page: page + 1
    }, () => this.getProductList())
  }


  getProductList = () => {
    const{ getProducts } = this.props;
    const { page, perPage, searchValue} = this.state;
    console.log(searchValue);
    const params = {
      page,
      perPage,
      value: searchValue
    }
    getProducts(params) 
  } 

  changeInputValue = (value) => {
     this.setState({
       searchValue: value
     }, () => this.debouncedOnChange(value));
  }

  debouncedOnChange = (value) => {
    const { searchValue } = this.state;
    this.setState({
      page: 1,
      value: searchValue
    }, () => this.getProductList());
  }

  render(){
  const { hasData, data, loading, hasMore } = this.props;
  const { searchValue  } = this.state;

  return (
    <div className="root">
      <Header />
      <div className="body">
      <Search onChange={this.changeInputValue} value={searchValue} className="search"/>
      <Products products={data.records} setPageNumber={this.setPageNumber} hasMore={hasMore} />
      {loading && <div> Loading ...</div>}
      {/* { hasData && data.records.length === 0 && <div>No Records Found</div>} */}
      </div>
    </div>
  );
  }
}

const mapToProps = ({ products: { data, loading, error, hasData, hasMore }}) => ({
    data,
    loading,
    error,
    hasData,
    hasMore
})

export default connect(mapToProps, actions)(Homepage);