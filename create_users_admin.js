import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Place your downloaded service account JSON at ./serviceAccountKey.json
// Download from Firebase Console → Project settings → Service accounts
const serviceAccountPath = new URL('./serviceAccountKey.json', import.meta.url);
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath));
} catch (err) {
  console.error('Missing or unreadable serviceAccountKey.json. See README.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

async function createAccount(email, password, role, companyName) {
  try {
    const userRecord = await auth.createUser({ email, password });
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName: companyName,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Created', email);
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      console.log(`User ${email} already exists, skipping create.`);
    } else {
      console.error('Error creating user', email, err);
    }
  }
}

async function run() {
  await createAccount('admin@flux-ehub.com', 'Pratik123@', 'admin', 'Flux-Ehub Admin');
  await createAccount('sonagra123pratik@gmail.com', 'Pratik123@', 'user', 'Meesho User');
  console.log('Done');
  process.exit();
}

run();
