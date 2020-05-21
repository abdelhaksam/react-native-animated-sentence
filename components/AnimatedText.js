import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default class AnimatedText extends React.Component {
  animatedValues = [];

  constructor(props) {
    super(props);

    const textArr = props.children.trim().split(' ');
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }
  

  componentDidMount() {
    this.initAnimation();
    this.animate()
  }

  initAnimation = () => {
    //A big stagger factor makes the text fade, a small one makes each word display alone.
    const staggerFactor = this.props.staggerFactor || this.textArr.length * 0.1

    //The prop wordDuration ovverides the total duration
    const singleAnimationDuration = this.props.wordDuration || this.props.duration * (staggerFactor/(this.textArr.length+staggerFactor))
    const staggerAnimationDuration = singleAnimationDuration/staggerFactor
    

    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue: 1,
        duration: singleAnimationDuration,
        useNativeDriver: true
      });
    });

    this.staggeredAnim = Animated.stagger(
      staggerAnimationDuration, 
      animations
    )
  };

  animate = () => {
    this.staggeredAnim.start(() => {
      this.initAnimation()
      if (this.props.onFinish) {
        this.props.onFinish();
      }
    });
  }

  render() {
    const {style, rtl, textStyle} = this.props 
    const textWraperStyle=[
      style, 
      styles.textWrapper, 
      {flexDirection: rtl  ? 'row-reverse' : 'row'}
    ]
    return (
      <View style={textWraperStyle}>
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                textStyle,
                {
                  opacity: this.animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[index],
                        new Animated.Value(-1)
                      )
                    }
                  ]
                }
              ]}
            >
              {rtl && index < this.textArr.length ? ' ' : ''}
              {word}
              {rtl || index < this.textArr.length ? ' ' : ''}
            </Animated.Text>
          );
        })}
      </View>
    );
  }

}


const styles = StyleSheet.create({
  textWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});
