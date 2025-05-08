import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';

const Rooms = () => {
  const [rooms] = useState([
    { id: 1, name: 'Phòng 101', status: 'Trống' },
    { id: 2, name: 'Phòng 102', status: 'Đang sử dụng' },
    { id: 3, name: 'VIP 201', status: 'Trống' },
    { id: 4, name: 'VIP 202', status: 'Bảo trì' },
  ]);

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        Danh sách phòng
      </Typography>

      <Grid container spacing={2}>
        {rooms.map(room => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {room.name}
                </Typography>
                <Typography color="textSecondary">
                  {room.status}
                </Typography>
                <Button size="small" sx={{ mt: 1 }}>
                  Đặt phòng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Rooms;