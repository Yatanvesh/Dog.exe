import React from 'react';
import {
  StatusBar,
  Easing,
  Dimensions,
  LogBox,
  View,
  Text
} from 'react-native';
import AnimateNumber from 'react-native-animate-number'
import RNExitApp from "react-native-exit-app";
import {AnimatedBackgroundColorView} from 'react-native-animated-background-color-view';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Pie';

import {getRandomDog} from "./src/API";
import {COUNT, infoText, smirkCatUrl} from "./src/constants";
import {readFromStorage, saveToStorage} from "./src/utils";

LogBox.ignoreLogs(["Animated"]);
const deathTimeout = 2000;

class App extends React.Component {

  state = {
    url: '',
    count: 1,
    loading: true
  }

  async componentDidMount() {
    this.setRandomImage();
    const count = await readFromStorage(COUNT);
    if (count)
      this.setState({count});
  }

  setRandomImage = async () => {
    const {url, count} = await getRandomDog();
    saveToStorage(COUNT, count);
    if (!url) {
      this.setState({url: smirkCatUrl});
    } else
      this.setState({url, count});
  }

  die = () => {
    this.setState({loading: false});
    setTimeout(() => RNExitApp.exitApp(), deathTimeout);
  }

  renderImage = () => {
    if (!!this.state.url)
      return (
        <Image
          source={{uri: this.state.url}}
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
            height: Dimensions.get('window').height + 60,
          }}/>
      )
    return null;
  }

  renderCount = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: Dimensions.get('window').height / 5
      }}>
        <AnimateNumber
          countBy={this.state.count / 20}
          style={{color: 'white', fontWeight: 'bold', fontSize: 50}}
          timing="easeOut"
          value={this.state.count}
          formatter={(val) => {
            return parseInt(val)
          }}/>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>{infoText}</Text>
      </View>
    )
  }

  render() {
    return (
      <AnimatedBackgroundColorView
        color='#f6bed6'
        initialColor='#05dfd7'
        duration={5000}
        easing={Easing.bounce}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <StatusBar backgroundColor='#e79cc2' hidden={true}/>
        {this.renderImage()}
        {this.state.loading && this.renderCount()}
      </AnimatedBackgroundColorView>
    );
  }
}

export default App;
