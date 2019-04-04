import React, { Component } from 'react';
import Canvas from './Components/Canvas';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: "",
      getImage: false,
      image: null,
      selectedFile: null,
      loaded: 0,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleGetImage = this.handleGetImage.bind(this)
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const res = await axios.get('/api');
    const data = await res.data;
    this.setState({
      data: data.message
    });
    console.log(data.message)
  }

  handleGetImage(image) {
    this.setState({
      image: image
    })
  }

  handleButtonClick() {
    this.setState({
      getImage: true
    })
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios.post('/api/upload', data)
      .then(res => console.log(res))
      .catch(err => console.log(err)) 

  }

  render() {
    let image;
    if(this.state.getImage) {
      image = <img src={this.state.image} alt="Nothing"/>
    }else {
      image = <div></div>
    }
    return (
      <div className="app">
        <Header />
        <div className="canvas-container">
          <Canvas fetchImage={this.handleGetImage} />
        <button onClick={this.handleButtonClick} >Click Me</button><br />
        {image}
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded,2) } %</div>
        </div>
      </div>
    );
  }
}

export default App;
