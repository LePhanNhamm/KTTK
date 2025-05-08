import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Box
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e : any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // Simple validation
    if (!formData.username || !formData.password || !formData.email) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Simulate API call
    console.log('Form submitted:', formData);
    navigate('/login');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Đăng ký tài khoản
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Họ tên"
              name="name"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />

            {error && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>

            <Typography align="center">
              Đã có tài khoản?{' '}
              <Link component={RouterLink} to="/login">
                Đăng nhập
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;