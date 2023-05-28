

/**
 * 
 import {
  HOST,
  DEFAULT_API_URL,
  APP_NAME,
  IEXCLOUD_PUBLIC_KEY,
  IEXCLOUD_API_URL,
  ALPHAVANTAGE_API_URL,
  ALPHAVANTAGE_PUBLIC_KEY,
} from 'react-native-dotenv';

 * Default App Configuration
 * @type {{apiUrl: (*|string), name: *, host: (*|string)}}

export const APP_CONFIG = {
  name: APP_NAME || 'React Native App',
  host: HOST || 'localhost',
  defaultApiUrl: DEFAULT_API_URL || 'http://localhost/api',
  iexcloudApiUrl: IEXCLOUD_API_URL,
  iexcloudPublicKey: IEXCLOUD_PUBLIC_KEY || null,
  alphavantageApiUrl: ALPHAVANTAGE_API_URL,
  alphavantagePublicKey: ALPHAVANTAGE_PUBLIC_KEY || null,
};
 */
export const APP_CONFIG = {
  name: 'React Native App',
  host: 'localhost',
  defaultApiUrl: 'http://localhost/api',
  iexcloudApiUrl: "https://sandbox.iexapis.com/stable",
  iexcloudPublicKey: "Tpk_c21bb52abef14e4f8d142109233c0216" || null,
  alphavantageApiUrl: "https://www.alphavantage.co/",
  alphavantagePublicKey: "GQUAE5LNZSCY3BWQ" || null,
};