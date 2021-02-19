import React from 'react';
import { render, fireEvent, waitFor,act } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { debug, getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      debug();

      await act(async () => {
        fireEvent.changeText(getByTestId('username'), 'paco');
      });

      await act(async () => {
        fireEvent.changeText(getByTestId('password'), 'password');

      });

      await act(async () => {
        fireEvent.press(getByTestId('submitButton'));
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'paco',
          password: 'password',
        });
      });
    });
  });
});