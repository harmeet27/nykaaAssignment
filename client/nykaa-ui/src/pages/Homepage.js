import React from 'react';
import axios from 'axios';

class Homepage extends React.Component {
  constructor(props){
      super(props);
      this.state= {
          hasDate: false,
          loading: false,
          error: false,
          data: {}
      }
  }

  componentDidMount(){
      axios.get('/products').then((res) => this.setState({ data: res}));
  }

  render(){
  return (
    <div className="App">
      <div>{JSON.stringify(this.state.data)}</div>
    </div>
  );
  }
}

export default Homepage;