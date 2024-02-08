import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LiveIcon = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const animation = new Animated.Value(1);

  const toggleBlink = () => {
    setIsBlinking(!isBlinking);
  };

  useEffect(() => {
    const blinkAnimation = Animated.sequence([
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(blinkAnimation).start();

    return () => {
      animation.stopAnimation();
    };
  }, [animation]);

  return (
    <TouchableOpacity onPress={toggleBlink}>
      <Animated.View
        /* eslint-disable-next-line react-native/no-inline-styles */
        style={{
          opacity: isBlinking ? animation : 1,
        }}
      >
        <Ionicons name={'radio-button-on'} color={'#4ade80'} size={20} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default LiveIcon;