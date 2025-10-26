import React from 'react';
import {
  Typography,
  Card, // Dùng để hiển thị chi tiết người dùng một cách đẹp mắt
  CardContent,
  CardHeader,
  Button, // Dùng cho liên kết đến trang ảnh
  Divider,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom'; // Thêm Link
import './styles.css';

// Import model data
import models from '../../modelData/models';

/**
 * Define UserDetail, a React component.
 */
function UserDetail() {

  // Lấy userId từ tham số URL (React Router)
  const { userId } = useParams();

  // Lấy dữ liệu người dùng từ model
  const user = models.userModel(userId);

  // Xử lý trường hợp không tìm thấy người dùng
  if (!user) {
    return (
      <Typography variant="h5" color="error" style={{ padding: '20px' }}>
        User with ID {userId} not found.
      </Typography>
    );
  }

  // Lấy tên đầy đủ
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div style={{ padding: '20px' }}>
      <Card raised>
        {/* Tiêu đề Card: Tên đầy đủ của người dùng */}
        <CardHeader 
          title={<Typography variant="h4">{fullName}</Typography>}
          subheader={<Typography variant="subtitle1">{user.occupation}</Typography>}
          style={{ backgroundColor: '#f5f5f5' }}
        />
        <Divider />
        <CardContent>
          
          {/* Thông tin chi tiết người dùng */}
          <Typography variant="h6" gutterBottom>
            Location:
          </Typography>
          <Typography variant="body1" paragraph>
            {user.location || "N/A"}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body1" paragraph>
            {user.description || "No description provided."}
          </Typography>
          
          <Divider style={{ margin: '20px 0' }} />

          {/* Liên kết đến trang ảnh của người dùng */}
          <Button
            variant="contained"
            color="primary"
            component={Link} // Sử dụng React Router Link
            to={`/photos/${user._id}`} // Đường dẫn tới UserPhotos
          >
            View Photos of {user.first_name}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;