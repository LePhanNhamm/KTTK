import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Link,
  Divider
} from '@mui/material';
import { AccountCircle, Lock, PersonAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'dummy-token');
      navigate('/');
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ 
          p: 4, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Typography 
            variant="h5" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 3
            }}
          >
            ĐĂNG NHẬP HỆ THỐNG
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={e => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              margin="normal"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
              sx={{ mb: 1 }}
            />

            {error && (
              <Typography color="error" align="center" sx={{ mt: 1, mb: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 2, 
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              ĐĂNG NHẬP
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="textSecondary">
                hoặc
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<PersonAdd />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
              onClick={() => navigate('/register')}
            >
              TẠO TÀI KHOẢN MỚI
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link 
                href="#" 
                variant="body2"
                onClick={() => navigate('/forgot-password')}
                sx={{ color: 'text.secondary' }}
              >
                Quên mật khẩu?
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;