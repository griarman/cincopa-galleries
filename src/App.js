import React, { Component } from 'react';

import LibrarySideMenu from "./Components/LibrarySideMenu";
import LibraryArea from "./Components/LibraryArea";
import AppProvider from './Context/AppProvider';
import './style.scss'

class App extends Component{
  componentDidMount() {
    let libraryArea = document.querySelector('.libraryArea.galleriesArea');
    if(libraryArea ) libraryArea.remove();
  }

  render() {
    return (
      <div className="myContainer">
        <AppProvider>
            <LibrarySideMenu/>
            <LibraryArea/>
        </AppProvider>
      </div>
    );
  }
}
export default App;
