import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const AuthenticateUser = ({ login }) => {
  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/17a8b964-0247-444e-b254-3207da0363e3/v2.0');
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'fa0e3034-49e2-49da-aa70-0b2f4c6d5bb9',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: 'msauth.ch.neophyten.app://auth',
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response !== null) {
      login(response);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}


export default AuthenticateUser;
