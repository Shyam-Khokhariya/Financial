import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Layout from '../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '../constants';

const Home = () => {
  const navigation = useNavigation();
  return (
    <Layout showHeader={false}>
      <View style={styles.content}>
        <Text style={styles.introText}>
          Take control of your finances today!
        </Text>
        <Text style={styles.descriptionText}>
          Our questionnaire will help you understand your financial situation
          better and guide you towards financial wellness.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate(ROUTE_NAME.QUESTIONS);
          }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  introText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffffff',
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginHorizontal: 15,
  },
  logo: {
    height: 200,
    width: Dimensions.get('window').width,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#43b02a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: Dimensions.get('window').width - 40,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
