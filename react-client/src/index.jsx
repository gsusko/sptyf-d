import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Voice from './components/Voice.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  //search function


  render () {
    return (<div>
      <h1>Spotify Player</h1>
      <div><Search/></div>
      <div><Voice/></div>
      <div><List items={this.state.items}/></div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
