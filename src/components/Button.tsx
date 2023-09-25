import React from 'react';
import {Pressable, View, Text, StyleSheet, ViewStyle} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  theme?:
    | 'primary'
    | 'primary-alt'
    | 'primary-ghost'
    | 'secondary'
    | 'secondary-alt';
}
export default function Button(props: ButtonProps) {
  const {disabled = false, theme = 'primary', style: viewStyle} = props;
  return (
    <Pressable
      style={[
        style.pressable,
        style[`container-${theme}`],
        disabled && style.disabled,
        viewStyle,
      ]}
      onPress={props.onPress}
      disabled={disabled}
      android_ripple={!disabled ? {color: '#333', foreground: true} : {}}>
      <View style={[style.container]}>
        <Text style={[style.text, style[`text-${theme}`]]}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  pressable: {borderRadius: 8, overflow: 'hidden'},
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  ['container-primary']: {
    backgroundColor: '#495E57',
  },
  ['container-primary-ghost']: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#495E57',
  },
  ['container-primary-alt']: {
    backgroundColor: '#F4CE14',
  },
  ['container-secondary']: {
    backgroundColor: '#EE9972',
  },
  ['container-secondary-alt']: {
    backgroundColor: '#FBDABB',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ['text-primary']: {
    color: '#fff',
  },
  ['text-primary-ghost']: {
    color: '#495E57',
  },
  ['text-primary-alt']: {
    color: '#333',
  },
  ['text-secondary']: {
    color: '#333',
  },
  ['text-secondary-alt']: {
    color: '#333',
  },
  disabled: {
    opacity: 0.7,
  },
});
