import React from 'react'
import { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function Page2Screen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }} />,
            // headerLeft: () => (
            //     <View>
            //         <Image style={{ resizeMode: 'contain', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={imglogoJD} />
            //     </View>
            // ),
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>PAGE 2</Text>
                </View>
            ),
            // headerRight: () => (
            //     <View>
            //         <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={_onPress}>
            //             <FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name="close" />
            //         </TouchableOpacity>
            //     </View>
            // ),
        })
    }, [navigation])

    const _onPress = () => router.navigate('/page1') // push // navigate

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ height: 50, width: 200, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7} onPress={_onPress}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ir para Pagina 1</Text>
            </TouchableOpacity>
        </View>
    )
}

/*

import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Modal from './Modal'

const App = () => {
  const [modal, setModal] = useState(false)

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Animated Modal RN</Text>
      <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      <Modal 
        show={modal}
        close={() => setModal(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b59b6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 22
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginTop: 20
  }
})

export default App


import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

const Modal = ({ show, close }) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300 }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300 }),
      Animated.timing(state.container, { toValue: height, duration: 100 })
    ]).start()
  }

  useEffect(() => {
    if(show){
      openModal()
    }else{
      closeModal()
    }
  }, [show])

  return( 
    <Animated.View 
      style={[styles.container, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      <Animated.View 
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
        <View style={styles.indicator} />

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae massa odio. Quisque ante sem, tempor eget massa vel, mollis tincidunt metus. Ut sed felis lectus. Nam semper molestie urna, quis ultricies quam semper ut. Maecenas aliquet id urna a convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas leo lectus, dictum vitae erat eget, luctus dapibus sapien. Integer at hendrerit quam. Vivamus tempor, arcu non fringilla laoreet, enim nibh porttitor enim, eget pellentesque eros nulla congue neque. Suspendisse et lobortis enim, nec fermentum est. Aliquam accumsan viverra vehicula. Proin tempus sagittis auctor. Vivamus quam ligula, laoreet eget eros et, hendrerit iaculis risus. Nam a nulla in purus fermentum rhoncus eu et erat. Aliquam tempus felis lorem, id hendrerit tortor vestibulum ac.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={close}>
          <Text style={{ color: '#fff' }}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '50%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
  },
  text: {
    marginTop: 50,
    textAlign: 'center'
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#9b59b6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
})

export default Modal

*/
