Firebase setup notes
====================

1) Enable Email/Password sign-in
- Go to Firebase Console → Authentication → Sign-in method → enable Email/Password.

2) Service account for server scripts
- Download a service account JSON from Firebase Console → Project settings → Service accounts → Generate new private key.
- Save the file as `serviceAccountKey.json` at the project root next to `create_users_admin.js`.

3) Install dependencies
```bash
npm install
```

4) Run the admin user creation script
```bash
node create_users_admin.js
```

Security note: Do NOT commit `serviceAccountKey.json` to version control.
