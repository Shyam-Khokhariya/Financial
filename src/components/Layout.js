import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import BackGroundImage from '../assets/image.jpeg';
import {useNavigation} from '@react-navigation/native';

const Layout = ({children, showHeader = true}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={BackGroundImage} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {showHeader && (
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Financial Wellness</Text>
          </View>
        )}
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000090',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
  },
});
