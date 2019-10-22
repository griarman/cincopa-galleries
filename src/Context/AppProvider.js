import React, { Component } from 'react';

import { myApiImitation, urls } from '../Constants/index';
import MyContext from './MyContext';
import doRequest from '../libs/doRequest'


class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_getList: {
        items_data: {},
        calldata: {},
        folders: [],
        result: 'no',
        runtime: 0
      },
      changeSearchTags: this.changeSearchTags,
      getGalleriesFromServer: this.getGalleriesFromServer,
      searchTags: [],
      foldersWholeData: [],
      initialize: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.waitForElement().then(() => {
      this.state.api_getList && this.state.api_getList.folders && this.state.api_getList.folders.forEach(el => {
        this.getGalleriesFromServer({
          url: urls.getStatusUrl,
          method: "POST",
          cache: false,
          dataType: 'jsonp',
          data: {
            cmd: 'getstatus',
            fid: el.sysdata.fid
          },
        });
      });
      this.setState({
        initialize: true
      });
    })
  }

  render() {
    if(!this.state.initialize) return null;

    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }

  changeSearchTags = newSearchTags => {
    this.setState(prevState => ({
      ...prevState,
      searchTags: newSearchTags
    }));
  };

  changeGalleriesFolders = (foldersData, type = 'add') => {
    switch (type) {
      case 'add':
        this.setState(prevState => ({
            ...prevState,
            foldersWholeData: [
              ...prevState.foldersWholeData,
              foldersData
            ]
          }));
        break;
    }
  };

  getGalleriesFromServer = (params )=> {
    const requireKeys = ['url', 'method'];
    let searchCriterisKeys = {
      disable_editor: true,
      orderby: '',
      orderbylist: '',
      page: 1,
      per_page: 50,
      search: '',
      tags: '',
    };
    // if (requireKeys.every(el => Object.keys(params).includes(el))) {}

   doRequest(params.url, params.data).then(data => {
      this.changeGalleriesFolders(data);
    });
  };

  waitForElement = () => {
    return new Promise(resolve => {
      if (typeof window['api_getlist'] !== "undefined") {
       this.setState({
          api_getList: window['api_getlist'].response,
        }, () => resolve());
       return;
      }
      else if (window.location.host === 'localhost:3000') {
        this.setState({
          api_getList: myApiImitation.response,
        }, () => resolve());
        return;
      }
      setTimeout(this.waitForElement, 100);
    })
  }
}

export default AppProvider;
