import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from './../themes/themeContext';
import Animated, {
  Easing,
  timing,
  Value,
} from 'react-native-reanimated';

const SplashScreen = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const [themeSwitchAnim] = useState(new Value(0));

  useEffect(() => {
    // Trigger the animation when the theme changes
    timing(themeSwitchAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [currentTheme]);

  const interpolateBackgroundColor = themeSwitchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentTheme.backgroundColor, currentTheme.backgroundColor],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: interpolateBackgroundColor,
    },
    text: {
      color: currentTheme.textColor,
      fontSize: 24,
    },
    button: {
      backgroundColor: currentTheme.buttonColor,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: currentTheme.buttonTextColor,
      fontSize: 18,
    },
  });

  return (
    <Animated.View style={styles.container}>
      {children}
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SplashScreen;
