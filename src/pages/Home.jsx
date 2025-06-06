import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import './Home.css';
import { Encabezado } from '../components/Encabezado/Encabezado';
import SlideMenu from '../components/SlideMenu';


function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();




  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const handleReset = () => {
    dispatch({ type: 'carrito/clearCart' });
  };

  // Marcar en localStorage si el login fue reciente
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('justLoggedIn', 'true');
      navigate('/tienda');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      localStorage.setItem('justLoggedIn', 'true');
      navigate('/tienda');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Encabezado onReset={handleReset} />
      <SlideMenu />
      <div className="home-container">
        <h1>Bienvenido a la Tienda</h1>
        <p>Descubre los mejores productos al mejor precio.</p>
        {user && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, fontWeight: 700 }}
            onClick={() => navigate('/tienda')}
          >
            Ir a la tienda
          </Button>
        )}
        {!user && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Paper elevation={6} sx={{ p: 4, maxWidth: 360, width: '100%' }}>
              <Typography variant="h5" align="center" gutterBottom fontWeight={700}>
                Iniciar Sesión
              </Typography>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  fullWidth
                  autoComplete="email"
                  margin="dense"
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  fullWidth
                  autoComplete="current-password"
                  margin="dense"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ mt: 2, fontWeight: 700 }}
                  fullWidth
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>
                <Divider sx={{ my: 2 }}>o</Divider>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  fullWidth
                  sx={{ fontWeight: 700 }}
                >
                  Iniciar sesión con Google
                </Button>
                {error && (
                  <Typography color="error" align="center" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </form>
            </Paper>
          </Box>
        )}

      </div>
    </>
  );
}

export default Home;
