import { initializeApp } from 'firebase/app';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';
import { categories, products } from '../../shared-backend/data/seed.js';

const required = (name) => {
  if (!process.env[name]) throw new Error(`Missing environment variable: ${name}`);
  return process.env[name];
};

const firebaseConfig = {
  apiKey: required('FIREBASE_API_KEY'),
  authDomain: required('FIREBASE_AUTH_DOMAIN'),
  projectId: required('FIREBASE_PROJECT_ID'),
  storageBucket: required('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: required('FIREBASE_MESSAGING_SENDER_ID'),
  appId: required('FIREBASE_APP_ID'),
};

const db = getFirestore(initializeApp(firebaseConfig));
const batch = writeBatch(db);

for (const category of categories) {
  batch.set(doc(db, 'categories', category.id), category, { merge: true });
}

for (const product of products) {
  batch.set(doc(db, 'products', product.id), product, { merge: true });
}

try {
  await batch.commit();
  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
} catch (error) {
  console.error(`Could not seed Firestore: ${error.message}`);
  console.error('Authenticate with Firebase and allow writes to the categories and products collections, then run this command again.');
  process.exitCode = 1;
}