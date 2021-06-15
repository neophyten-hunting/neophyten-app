import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button, Text, Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const AuthenticateUserB2C = ({ login, tenantId, clientId, scope, iosRedirect, androidRedirect }) => {
  // Endpoint
  const discovery = useAutoDiscovery(`https://login.microsoftonline.com/${tenantId}/v2.0`);

  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: [scope],
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: Platform.OS === 'android' ? androidRedirect : iosRedirect, // probably ios works also on mac
      }),
      responseType: 'token',
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

export default AuthenticateUserB2C;