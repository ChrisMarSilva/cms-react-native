import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation, DrawerActions, } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PT from 'prop-types';

const DrawerOpen = (props) => {
  return (
    <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => props.navigation.dispatch(DrawerActions.openDrawer()) }>
      <Ionicons name="md-menu" size={32} color='#fff' />
    </TouchableOpacity>
  );
};
 
DrawerOpen.propTypes = { navigation: PT.shape({ openDrawer: PT.func, }), };

export default withNavigation(DrawerOpen);