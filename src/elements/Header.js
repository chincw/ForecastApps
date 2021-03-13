import React, { Component } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { THEME } from '@stylesheet/styles';
import { Space } from '@element';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: 'Welcome',
};

class Header extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <SafeAreaView>
        <View>
          <Text style={[THEME.textAlignCenter, THEME.fontXlarge]}>{title}</Text>
          {children && <View style={THEME.padding10}>{children}</View>}
          <Space />
        </View>
      </SafeAreaView>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
