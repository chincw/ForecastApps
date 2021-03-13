import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '@stylesheet/styles';

const propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
};

const defaultProps = {
  color: '#F5F5F5',
};

class Card extends Component {
  onPressButton = () => {
    const { onPress } = this.props;
    return onPress && onPress();
  };

  render() {
    const { color, onPress, style, noPadding, children, ...rest } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress && this.onPressButton}
        activeOpacity={onPress ? undefined : 1}
        style={[!noPadding && THEME.padding10, styles.card, { backgroundColor: color }, style]}
        {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
});

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
export default Card;
