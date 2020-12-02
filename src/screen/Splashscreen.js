import React from 'react'
import { View, Image } from 'react-native';

function Splashscreen({navigation}) {

    setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'HomeApp',
            },
          ],
        });
      }, 2000);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e93f1e'}}>
            <Image
                source={require('../assets/images/logo-sakoo.png')}
                style={{height: 100, width: 200}}
            />
        </View>
    )
}

export default Splashscreen
