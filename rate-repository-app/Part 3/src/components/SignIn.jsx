import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#e1e4e8'
  },
  button: {
    flexGrow: 0,
    borderRadius: 3,
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 3,
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.button}>{'Sign in'}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});


const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    //console.log(values);
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log('DATA: ',data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      { ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;