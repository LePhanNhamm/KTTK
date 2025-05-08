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
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Delete, Edit, CheckCircle, Cancel } from '@mui/icons-material';

interface Booking {
  id: string;
  roomName: string;
  customerName: string;
  startTime: string;
  endTime: string;
  status: 'Đã đặt' | 'Đang sử dụng' | 'Đã hủy' | 'Hoàn thành';
  phoneNumber?: string;
}

const rooms = [
  { id: '101', name: 'Phòng 101', type: 'Thường', price: '200.000đ/giờ' },
  { id: '102', name: 'Phòng 102', type: 'Thường', price: '200.000đ/giờ' },
  { id: '201', name: 'Phòng VIP 201', type: 'VIP', price: '400.000đ/giờ' },
  { id: '202', name: 'Phòng VIP 202', type: 'VIP', price: '400.000đ/giờ' }
];

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      roomName: 'Phòng 101',
      customerName: 'Nguyễn Văn A',
      phoneNumber: '0123456789',
      startTime: '2025-05-08T19:00',
      endTime: '2025-05-08T21:00',
      status: 'Đã đặt'
    },
  ]);

  const [newBooking, setNewBooking] = useState({
    roomName: '',
    customerName: '',
    phoneNumber: '',
    startTime: '',
    endTime: ''
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBooking({
      ...newBooking,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: Booking = {
      id: Date.now().toString(),
      ...newBooking,
      status: 'Đã đặt'
    };
    setBookings([...bookings, booking]);
    setNewBooking({
      roomName: '',
      customerName: '',
      phoneNumber: '',
      startTime: '',
      endTime: ''
    });
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý đặt phòng
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Đặt phòng mới
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <TextField
              select
              required
              label="Chọn phòng"
              name="roomName"
              value={newBooking.roomName}
              onChange={handleChange}
            >
              {rooms.map(room => (
                <MenuItem key={room.id} value={room.name}>
                  {room.name} - {room.price}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              label="Tên khách hàng"
              name="customerName"
              value={newBooking.customerName}
              onChange={handleChange}
            />

            <TextField
              required
              label="Số điện thoại"
              name="phoneNumber"
              value={newBooking.phoneNumber}
              onChange={handleChange}
            />

            <TextField
              required
              label="Thời gian bắt đầu"
              name="startTime"
              type="datetime-local"
              value={newBooking.startTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              required
              label="Thời gian kết thúc"
              name="endTime"
              type="datetime-local"
              value={newBooking.endTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Đặt phòng
            </Button>
          </Box>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Phòng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Bắt đầu</TableCell>
              <TableCell>Kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell>{booking.roomName}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.phoneNumber}</TableCell>
                <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={
                      booking.status === 'Đã đặt' ? 'primary' :
                      booking.status === 'Đang sử dụng' ? 'success' :
                      booking.status === 'Đã hủy' ? 'error' : 
                      'default'
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleStatusChange(booking.id, 'Đang sử dụng')}
                    disabled={booking.status !== 'Đã đặt'}
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleStatusChange(booking.id, 'Đã hủy')}
                    disabled={booking.status === 'Hoàn thành' || booking.status === 'Đã hủy'}
                  >
                    <Cancel />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Chi tiết đặt phòng</DialogTitle>
        <DialogContent>
          {/* Add booking detail form here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings;