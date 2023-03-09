import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Platform, Pressable, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function FloatingWriteButton({hidden}) {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Write');
    };

    const animation = useRef(new Animated.Value(0)).current;


    useEffect(() => {
      Animated.spring(animation, {
        toValue: hidden ? 1 : 0,
        useNativeDriver: true,
        tension : 45, // 강도
        friction : 5, // 감속
        // speed : 속도
        // bounciness : 탄력성
      }).start();
    }, [animation, hidden]);

    return (
        <Animated.View
          style={[
            styles.wrapper,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 88],
                  }),
                },
              ],
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          {/*
          이 컴포넌트의 경우 iOS 환경에서는 버튼을 눌렀을 때 투명도를 가지게 설정했고, 안드로이드에서는 물결 효과가 나타나게 만들었습니다.
          */}
          <Pressable
            style={({pressed}) => [
              styles.button,
              Platform.OS === 'ios' && {
                opacity : pressed ? 0.6 : 1,
              },
            ]}
            android_ripple={{color : 'white'}}
            onPress={onPress}
          >
            <Icon name="add" size={24} style={styles.icon} />
          </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    // iOS 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 안드로이드 전용 그림자 설정
    elevation: 5,
    // 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
    // iOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWriteButton;