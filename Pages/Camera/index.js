import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Button , Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function Camera() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [url, setUrl] = useState(null)

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const tirarFoto = async () => {
        if(camera){
            let foto = await camera.takePictureAsync()
            setUrl(foto.uri)
            alert("Foto tirada");
        }
    }
    
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {imagemUri && <Image source={{uri : url}} style={{heigt : 300}} />}
        <Button title="Tirar foto" onPress={() => tirarFoto()} />
        </View>
      );
}export default Camera