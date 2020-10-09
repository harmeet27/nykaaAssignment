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
        searchValue: ''
      };
      this.debouncedOnChange = debounce(this.debouncedOnChange, 1400);
  }

  componentDidMount(){
    const{ getProducts } = this.props;
    getProducts();
  }

  changeInputValue = (value) => {
     console.log(value);
     this.setState({
       searchValue: value
     }, () => this.debouncedOnChange(value));
  }

  debouncedOnChange = (value) => {
    console.log(value, 'de');
    const{ getProducts } = this.props;
    getProducts(value);
  }

  render(){
  const { data, hasData, loading } = this.props;
  const { searchValue } = this.state;

  return (
    <div className="root">
      <Header />
      <div className="body">
      <Search onChange={this.changeInputValue} value={searchValue} className="search"/>
      { loading && <div> Loading ...</div>}
      { hasData && data.length === 0 && <div>No Records Found</div>}
      { hasData && <div><Products products={data}/></div>}
      </div>
    </div>
  );
  }
}

const mapToProps = ({ products: { data, loading, error, hasData }}) => ({
    data,
    loading,
    error,
    hasData
})

export default connect(mapToProps, actions)(Homepage);