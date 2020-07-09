import React from 'react';
import {
  StatusBar,
  Easing,
  Dimensions,
} from 'react-native';
import RNExitApp from "react-native-exit-app";
import {AnimatedBackgroundColorView} from 'react-native-animated-background-color-view';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Pie';
import {getRandomDog} from "./src/API";

const deathTimeout = 2000;

class App extends React.Component {

  state = {
    uri: ''
  }

  componentDidMount() {
    this.setRandomImage();
  }

  setRandomImage = async () => {
    const uri = await getRandomDog();
    if (!uri) {
      this.setState({uri: 'https://i.imgur.com/l8sdECy.jpg'});
    } else
      this.setState({uri});
  }

  die = () => {
    setTimeout(() => RNExitApp.exitApp(), deathTimeout);
  }

  renderImage = () => {
    if (!!this.state.uri)
      return (
        <Image
          source={{uri: this.state.uri}}
          indicator={Progress}
          indicatorProps={{
            size: 100,
            borderWidth: 0,
            color: '#ffbcbc',
            unfilledColor: '#fc9d9d'
          }}
          onLoad={this.die}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height+60,
          }}/>
      )
    return null;
  }

  render() {
    return (
      <AnimatedBackgroundColorView
        color='#f6bed6'
        initialColor='#05dfd7'
        duration={5000}
        easing={Easing.bounce}
        style={{flex: 1}}
      >
        <StatusBar backgroundColor='#e79cc2' hidden={true}/>
        {this.renderImage()}
      </AnimatedBackgroundColorView>
    );
  }
}

export default App;
