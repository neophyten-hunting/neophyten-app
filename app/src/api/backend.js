import axios from 'axios';
import Constants from 'expo-constants';

export default axios.create({
  baseURL: Constants.manifest.extra.backendBaseUrl,
  headers: {
    'x-functions-clientid': 'neophyte-app',
    'x-functions-key': Constants.manifest.extra.backendApiKey,
  }
})