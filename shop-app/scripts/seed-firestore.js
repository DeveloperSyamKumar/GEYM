import { initializeApp } from 'firebase/app';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';
import { categories, products } from '../../shared-backend/data/seed.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAFWZ2NBNonDeRaBjVIXnEtc8noyO43UgU',
  authDomain: 'geym-c9179.firebaseapp.com',
  projectId: 'geym-c9179',
  storageBucket: 'geym-c9179.firebasestorage.app',
  messagingSenderId: '641834253283',
  appId: '1:641834253283:web:ec2112ba4c16cc9a347ed6',
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