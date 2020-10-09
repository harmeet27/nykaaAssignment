import React from 'react';
import { connect } from 'redux-zero/react';
import actions from '../store/actions';

class Homepage extends React.Component {
  constructor(props){
      super(props);
  }

  componentDidMount(){
    const{ getProducts } = this.props;
    getProducts();
  }

  render(){
  const { data, hasData, loading } = this.props;
  console.log(this.props);
  return (
    <div className="App">
      { loading && <div> Loading ...</div>}
      { hasData && <div>{JSON.stringify(data)}</div>}
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