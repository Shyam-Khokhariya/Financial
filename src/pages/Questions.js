import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {questions} from '../assets/data.json';
import Layout from '../components/Layout';
import email from 'react-native-email';

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [touched, setTouched] = useState(false);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    if (!answers[currentIndex]) {
      setShowError(true);
      return;
    }
    if (newIndex <= questions.length) {
      setShowError(false);
      setCurrentIndex(newIndex);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex - 1;
    setShowError(false);
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  const handleSelectOption = option => {
    setAnswers({...answers, [currentIndex]: option});
    setShowError(false);
  };

  const getScore = () => {
    if (reg.test(userEmail)) {
      const score = Object.values(answers).reduce((acc, curr) => {
        return acc + curr.score;
      }, 0);
      const to = [userEmail];
      email(to, {
        bcc: 'contact@financial.com',
        subject: 'Financial Score',
        body: `Hello,

        I hope this message finds you well. I wanted to share with you the latest score from our Financial application. Your score is: ${score}.
        
        Thank you for your participation!
        
        Best regards,
        Financial App Team`,
      }).catch(console.error);
    } else {
      setTouched(true);
      setShowError(true);
    }
  };

  const handleEmailChange = text => {
    if (touched) {
      setShowError(!reg.test(text));
    }
    setUserEmail(text);
  };

  return (
    <Layout>
      {currentIndex < questions.length ? (
        <View style={styles.questionContainer}>
          <View style={styles.questionWrapper}>
            <Text style={styles.questionTitleText}>
              {questions[currentIndex].question}
            </Text>
            <Text style={styles.questionText}>
              Question {currentIndex + 1} of {questions.length}
              <Text style={styles.questionTextRed}>
                {showError ? ' (Please select an option)' : ''}
              </Text>
            </Text>

            <View style={styles.divider}>
              <View
                style={[
                  styles.filledDivider,
                  {width: `${(currentIndex * 100) / questions.length}%`},
                ]}
              />
            </View>
            {questions[currentIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  showError && styles.errorOptionButton,
                  answers[currentIndex]?.value === option.value &&
                    styles.selectedOptionButton,
                ]}
                onPress={() => handleSelectOption(option)}>
                <Text
                  style={[
                    styles.optionText,
                    answers[currentIndex]?.value === option.value &&
                      styles.selectedOptionText,
                  ]}>
                  {option.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            {currentIndex > 0 ? (
              <TouchableOpacity style={styles.button} onPress={handlePrev}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>
                {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitleText}>
            Thank you for taking the time to answer our questions!
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter your email address"
              style={[styles.textInput, showError && styles.errorInput]}
              value={userEmail}
              onChangeText={handleEmailChange}
            />
            {showError && (
              <Text style={styles.errorText}>Please enter a valid email</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={getScore}>
            <Text style={styles.buttonText}>Get Your Score</Text>
          </TouchableOpacity>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
  },
  questionWrapper: {
    width: Dimensions.get('window').width - 40,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ffffff',
  },
  questionTextRed: {
    color: '#e57373',
  },
  errorInput: {
    borderColor: '#e57373',
  },
  questionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  textInputContainer: {
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,

    borderWidth: 3,
    borderColor: '#ffffff',
  },
  errorText: {
    color: '#e57373',
    fontSize: 16,
    marginTop: 5,
  },
  divider: {
    height: 5,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  filledDivider: {
    height: 5,
    backgroundColor: '#43b02a',
  },
  optionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorOptionButton: {
    backgroundColor: '#e57373',
  },
  selectedOptionButton: {
    backgroundColor: '#43b02a',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#43b02a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Questions;
