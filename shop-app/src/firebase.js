import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAFWZ2NBNonDeRaBjVIXnEtc8noyO43UgU',
  authDomain: 'geym-c9179.firebaseapp.com',
  projectId: 'geym-c9179',
  storageBucket: 'geym-c9179.firebasestorage.app',
  messagingSenderId: '641834253283',
  appId: '1:641834253283:web:ec2112ba4c16cc9a347ed6',
  measurementId: 'G-ZSGNXKPK10',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);