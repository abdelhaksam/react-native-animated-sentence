import * as React from 'react';
import { Alert, StatusBar, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AnimatedText from './components/AnimatedText';

export default function App() {
  const _onFinish = () => {
    // Alert.alert('Animation', 'It is done!');
    console.log('animation done')
  };

  React.useEffect(()=>{
    console.log('did mount')
  },[])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AnimatedText
        textStyle={styles.textStyle}
        style={styles.containerStyle}
        duration={500}
        onFinish={_onFinish}>
          For the things we have to learn before we can do them, we learn by doing them. ️️️️️️REACT NATIVE ❤️️️️
      </AnimatedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  containerStyle: {},
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 14
  }
});
