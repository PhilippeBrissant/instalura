import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './logicas/TimelineStore'

const timelineStore = new TimelineStore([]);

class App extends Component {
  constructor(){
    super();
    console.log('PROPS DE APP ', this.props);
  }

  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <Timeline login={this.props.match.params.login} store={timelineStore}/>
          {/* <Timeline /> */}
        </div>
      </div>
    );
  }

}
export default App;
