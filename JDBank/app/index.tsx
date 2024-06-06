import { View, Image, Text } from 'react-native'

import useSplash from '@/src/hooks/useSplash'
import imglogoJD from '@/src/assets/imgs/splash.png'

export default function IndexScreen() {
    const { txtStatusAtualizacao } = useSplash()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image source={imglogoJD} style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: 'red' }} />
            <Text style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>{txtStatusAtualizacao}</Text>
        </View>
    )
}

/*

import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Keep the splash screen visible while we fetch resources
// Mantenha a tela inicial visível enquanto buscamos recursos
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Pré-carregue as fontes, faça todas as chamadas de API que você precisa fazer aqui
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading experience. Please remove this if you copy and paste the code!
        // Atrasar artificialmente por dois segundos para simular um carregamento lento experiência. Remova isso se você copiar e colar o código!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        // Diga ao aplicativo para renderizar
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after `setAppIsReady`, then we may see a blank screen while the app is loading its initial state and rendering its first pixels.  So instead,we hide the splash screen once we know the root view has already performed layout
      // Isso diz àtela inicial para se ocultar imediatamente! Se chamarmos isso depois `setAppIsReady`, então poderemos ver uma tela em branco enquanto o aplicativo está carregando seu estado inicial e renderizando seus primeiros pixels.Então, em vez disso, ocultamos a tela inicial quando sabemos que a visualização raiz já foi layout realizado.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onLayout={onLayoutRootView}>
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}
  
*/
