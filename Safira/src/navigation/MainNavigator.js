import React from 'react';
import { Text, View, } from 'react-native';
import { CommonActions, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { FontAwesome, Ionicons, } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

import { colors } from '../styles';
import { modificaLoginOKErro, desautenticarUsuario, } from '../store/ducks/login';
import LoginScreen from '../screens/Login';
import ConfigScreen from '../screens/Config';
import HomeScreen from '../screens/Home';
import HomePesquisaMocaScreen from '../screens/HomePesquisaMoca';
import HomePesquisaProdutoScreen from '../screens/HomePesquisaProduto';
import ConsumoScreen from '../screens/Consumo';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: colors.default,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 0,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    headerTintColor: colors.branco,
    headerTitleStyle: { flex: 1, fontWeight: 'bold', },
    headerBackTitle: "Back",
}

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="LoginStack"
        >
            <Stack.Screen
                name="LoginStack"
                component={LoginScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="Config"
                component={ConfigScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
        </Stack.Navigator>
    )
}

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeStack"
            screenOptions={screenOptionStyle}
        >
            <Stack.Screen
                name="HomeStack"
                component={HomeScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="HomePesquisaMoca"
                component={HomePesquisaMocaScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="HomePesquisaProduto"
                component={HomePesquisaProdutoScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="Consumo" component={ConsumoScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="Config"
                component={ConfigScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
        </Stack.Navigator>
    )
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView
            {...props}
            style={{ flex: 1, backgroundColor: colors.default, }}
        >

            <View style={{
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: colors.default,
                height: 120, borderBottomEndRadius: 70,
                paddingTop: 0, marginBottom: 20,
            }}>
                <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', marginBottom: 10, }}>
                    Safira Mobile
                </Text>
                <Text style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 10, marginLeft: 10, color: colors.branco, fontSize: 14, }}>
                    Garçom:
                    <Text style={{ fontWeight: 'bold', }}>
                        {props.txtCodigo}  {props.txtNome}
                    </Text>
                </Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                label="Sair"
                labelStyle={{ color: colors.branco, fontSize: 16, fontWeight: 'bold', }}
                icon={({ focused, color, size }) => (<FontAwesome name="power-off" size={size} color={colors.branco} />)}
                onPress={() => {
                    props.modificaLoginOKErro()
                    props.desautenticarUsuario()
                    props.navigation.closeDrawer()
                    props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AuthMainStack' }] }))
                }}
            />

            <View style={{ alignItems: 'center', marginTop: 20, }}>
                <Text style={{ color: colors.branco, fontSize: 12, fontWeight: 'bold', }}>
                    Versão: {Constants.manifest?.version}
                </Text>
            </View>

        </DrawerContentScrollView>
    )
}

const mapStateToProps = state => ({
    txtCodigo: state.login.txtCodigo,
    txtNome: state.login.txtNome
})

const mapDispatchToProps = {
    modificaLoginOKErro,
    desautenticarUsuario,
}

const CustomDrawerContentRedux = connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)

const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeDrawer"
            drawerContent={props => <CustomDrawerContentRedux {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#5cbbff',
                drawerActiveTintColor: colors.branco,
                drawerInactiveTintColor: colors.branco,
                drawerLabelStyle: { color: colors.branco, fontSize: 16, fontWeight: 'bold', },
                drawerItemStyle: { marginLeft: 0, paddingLeft: 10, borderBottomEndRadius: 25, borderTopEndRadius: 25, },
            }}
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={HomeStackNavigator}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    title: 'Pedido',
                    drawerIcon: ({ focused, size }) => (<Ionicons name={focused ? 'md-beer-outline' : 'md-beer-sharp'} size={size} color={colors.branco} />),
                }}
            />
            <Drawer.Screen
                name="Consumo"
                component={ConsumoScreen}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    title: 'Consulta de Cartão',
                    drawerIcon: ({ focused, size }) => (<Ionicons name={focused ? 'md-list-outline' : 'md-list'} size={size} color={colors.branco} />),
                }}
            />
        </Drawer.Navigator>
    )
}

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="AuthMainStack"
        >
            <Stack.Screen
                name="AuthMainStack"
                component={AuthStackNavigator}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="HomeMainStack"
                component={HomeDrawerNavigator}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
        </Stack.Navigator>
    )
}
