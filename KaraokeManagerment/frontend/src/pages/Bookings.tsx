import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
} from '@mui/material';

const rooms = ['Phòng 101', 'Phòng 102', 'Phòng VIP 201', 'Phòng VIP 202'];

const Bookings = () => {
  const [bookings] = useState([
    {
      id: '1',
      roomName: 'Phòng 101',
      customerName: 'Nguyễn Văn A',
      startTime: '19:00 08/05/2025',
      endTime: '21:00 08/05/2025',
      status: 'Đã đặt'
    },
    {
      id: '2',
      roomName: 'Phòng VIP 201', 
      customerName: 'Trần Thị B',
      startTime: '20:00 08/05/2025',
      endTime: '22:00 08/05/2025',
      status: 'Đang sử dụng'
    }
  ]);

  const [newBooking, setNewBooking] = useState({
    roomName: '',
    customerName: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e : any) => {
    setNewBooking({
      ...newBooking,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        Quản lý đặt phòng
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Đặt phòng mới
        </Typography>
        
        <TextField
          select
          label="Chọn phòng"
          name="roomName"
          value={newBooking.roomName}
          onChange={handleChange}
          sx={{ mr: 2, mb: 2, minWidth: 200 }}
        >
          {rooms.map(room => (
            <MenuItem key={room} value={room}>{room}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Tên khách hàng"
          name="customerName"
          value={newBooking.customerName}
          onChange={handleChange}
          sx={{ mr: 2, mb: 2 }}
        />

        <TextField
          label="Thời gian bắt đầu"
          name="startTime"
          type="datetime-local"
          value={newBooking.startTime}
          onChange={handleChange}
          sx={{ mr: 2, mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Thời gian kết thúc"
          name="endTime" 
          type="datetime-local"
          value={newBooking.endTime}
          onChange={handleChange}
          sx={{ mr: 2, mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained">
          Đặt phòng
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Phòng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Bắt đầu</TableCell>
              <TableCell>Kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell>{booking.roomName}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.startTime}</TableCell>
                <TableCell>{booking.endTime}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button size="small" sx={{ mr: 1 }}>
                    Check-in
                  </Button>
                  <Button size="small" color="error">
                    Hủy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Bookings;