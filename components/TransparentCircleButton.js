import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TransparentCircleButton({name, color, hasMarginRight, onPress}) {
    return (
        <View
            style={[styles.iconButtonWrapper, hasMarginRight && styles.rightMargin]}
        >
            <Pressable
                style={({pressed}) => [
                    styles.iconButton,
                    Platform.OS === 'ios' &&
                        pressed && {
                            backgroundColor : '#efefef',
                        },
                ]}
                onPress={onPress}
                android_ripple={{color : '#ededed'}}
            >
                <Icon name={name} color={color} size={20} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    iconButtonWrapper: {
      width: 32,
      height: 32,
      borderRadius: 16,
      overflow: 'hidden',
    },
    iconButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 16,
    },
  
    rightMargin: {
      marginRight: 8,
    },
  });
  
  export default TransparentCircleButton;