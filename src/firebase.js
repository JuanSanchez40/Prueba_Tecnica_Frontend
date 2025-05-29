// Inicialización de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import store from './store/store';
import { setUser, clearUser } from './redux/authSlice';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Mantiene el usuario actualizado en Redux
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }));
  } else {
    store.dispatch(clearUser());
  }
});
