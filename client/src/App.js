import React, {Component} from 'react';
import './App.css';
import TopCharts from './Clusters/TopCharts/TopCharts.js';
import StandardCluster from './Clusters/StandardCluster/standard_cluster.js';
import RecommendedCategories from './Clusters/RecommendedCategories/recommended_categories.js';
import AppOfTheWeek from './Clusters/AppOfTheWeek/AppOfTheWeek.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { streamData: null };
  }

  componentDidMount() {
    fetch('/api/v1/stream')
        .then((response) => response.json())
        .then((streamData) => {this.setState({streamData})})
  }

  render() {
    if (this.state.streamData == null) {
        return null;
    }
    return (
      <div className='App'>
        <StandardCluster />
        <AppOfTheWeek />
        <RecommendedCategories />
        {this.state.streamData.clusters.map((cluster) => {
            switch(cluster.type) {
            case "TopCharts":
            return <TopCharts data={cluster} key={cluster.id} />
            default:
            return null;
        }
        })}
      </div>
    );
  }
}

export default App;
