import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material';

const Dashboard = () => {
  const stats = [
    { title: 'Phòng trống', value: '8/10' },
    { title: 'Khách hàng', value: '24' },
    { title: 'Doanh thu', value: '2,500,000đ' },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bảng điều khiển
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ minWidth: 200 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography variant="h5">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Phòng đang hoạt động
        </Typography>
        {/* List phòng đơn giản */}
      </Paper>
    </Container>
  );
};

export default Dashboard;
