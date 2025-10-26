import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid, // Cần thêm Grid để dễ dàng căn chỉnh trái/phải
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom'; // Import hooks từ React Router

import './styles.css';
import models from '../../modelData/models'; // Import model data

// Tên của bạn
const MY_NAME = "Your Name"; // <--- Thay thế bằng tên của bạn

/**
 * Define TopBar, a React component.
 */
function TopBar () {
  
  // 1. Lấy thông tin về URL hiện tại và các tham số
  const location = useLocation();
  const { userId } = useParams(); // Lấy userId từ URL (nếu có)
  const path = location.pathname; // Đường dẫn hiện tại (ví dụ: /users/1, /photos/1)

  // 2. Xác định nội dung ngữ cảnh (App Context)
  let appContext = '';

  if (userId) {
    // Nếu có userId, truy vấn thông tin người dùng
    const user = models.userModel(userId);
    if (user) {
      const userName = `${user.first_name} ${user.last_name}`;

      // Kiểm tra xem đang ở trang UserDetail (/users/:userId) hay UserPhotos (/photos/:userId)
      if (path.startsWith(`/users/${userId}`)) {
        appContext = userName; // Chỉ hiển thị tên người dùng
      } else if (path.startsWith(`/photos/${userId}`)) {
        appContext = `Photos of ${userName}`; // Hiển thị "Photos of..."
      }
    }
  } else if (path === '/users') {
    // Nếu ở trang UserList (chỉ có /users), có thể hiển thị một tiêu đề chung
    appContext = 'User List';
  }

  // 3. Render TopBar
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          
          {/* PHÍA TRÁI: Tên của bạn */}
          <Grid item>
            <Typography variant="h5" color="inherit">
              {MY_NAME}
            </Typography>
          </Grid>

          {/* PHÍA PHẢI: Ngữ cảnh ứng dụng */}
          <Grid item>
            <Typography variant="h6" color="inherit">
              {appContext}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;