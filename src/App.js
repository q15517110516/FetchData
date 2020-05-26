import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import axios from 'axios';
import "./App.css"


export class App extends Component {


  constructor(){
    super();
    this.state = {
      data: [],
    }
  }

  loadData(){

    
    //NOTE
    //Method 1: Use jQuery 
    $.ajaxPrefilter(function(options) {
      if (options.crossDomain && $.support.cors) {
          options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });

    $.get('http://aimtell.com/files/sites.json')
    .then(res => {
      const { sites } = res;
      this.setState({
        data: sites,
      })
    })

    //NOTE
    // Method 2: Use Axios call to load data
    //Use Cors-Anywhere proxy
    // (function() {
    //   var cors_api_host = 'cors-anywhere.herokuapp.com';
    //   var cors_api_url = 'https://' + cors_api_host + '/';
    //   var slice = [].slice;
    //   var origin = window.location.protocol + '//' + window.location.host;
    //   var open = XMLHttpRequest.prototype.open;
    //   XMLHttpRequest.prototype.open = function() {
    //       var args = slice.call(arguments);
    //       var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    //       if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
    //           targetOrigin[1] !== cors_api_host) {
    //           args[1] = cors_api_url + args[1];
    //       }
    //       return open.apply(this, args);
    //   };
    // })();

    // axios.get("http://aimtell.com/files/sites.json")
    //       .then(res => {
    //         this.setState({
    //           data: res.data.sites,
    //         })
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });

  }



  render() {
    return (
      <div className="main">
        <div className="load-button">
          <button type="button" className="btn btn-primary" onClick={() => this.loadData()}>Load Data</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(({id, name, url}) => {
                return(
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{url}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
