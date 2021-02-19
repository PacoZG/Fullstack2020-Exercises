import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text style={styles.button}>{'Sign in'}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(1)
    .max(30)
    .required('Username is a required'),
  password: yup.string()
    .min(5)
    .max(50)
    .required('Password is a required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password don\'t match')
    .required('Password confirmation is required'),
});


export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      { ({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const onSubmit = async (values) => {
    //console.log(values);
    const { username, password } = values;
    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;