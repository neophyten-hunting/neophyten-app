import 'dotenv/config';

export default ({ config }) => {
  const googleMapsApiKey = process.env['REACT_NATIVE_GOOGLE_MAPS_API_KEY']
  if (googleMapsApiKey != null) {
    config.android.config.googleMaps.apiKey = googleMapsApiKey;
  }
  return {
    extra: {
      backendBaseUrl: process.env['REACT_NATIVE_BASE_URL'] ?? '',
      backendApiKey: process.env['REACT_NATIVE_API_KEY'] ?? '',
      b2cTenantId: process.env['REACT_NATIVE_B2C_TENANTID'] ?? '',
      b2cClientId: process.env['REACT_NATIVE_B2C_CLIENTID'] ?? '',
      b2cScope: process.env['REACT_NATIVE_B2C_SCOPE'] ?? '',
      b2cIosRedirect: process.env['REACT_NATIVE_B2C_IOS_REDIRECT'] ?? '',
      b2cAndroidRedirect: process.env['REACT_NATIVE_B2C_ANDROID_REDIRECT'] ?? '',
    },
    ...config,
  };
};
