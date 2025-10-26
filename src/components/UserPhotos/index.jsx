import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink, // Đổi tên để tránh xung đột với React Router Link
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

// Import model data
import models from '../../modelData/models';

// Hàm định dạng ngày/giờ thân thiện với người dùng
const formatDateTime = (isoDateString) => {
  if (!isoDateString) return 'N/A';
  // Tạo đối tượng Date và sau đó định dạng
  const date = new Date(isoDateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

/**
 * Define UserPhotos, a React component.
 */
function UserPhotos () {

  // Lấy userId từ tham số URL (React Router)
  const { userId } = useParams();

  // Lấy dữ liệu người dùng (cần cho tiêu đề hoặc kiểm tra)
  const user = models.userModel(userId);
  // Lấy danh sách ảnh của người dùng
  const photos = models.photoOfUserModel(userId);

  // Xử lý trường hợp không tìm thấy người dùng hoặc ảnh
  if (!user) {
    return (
      <Typography variant="h5" color="error" style={{ padding: '20px' }}>
        User with ID {userId} not found.
      </Typography>
    );
  }
  
  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h5" style={{ padding: '20px' }}>
        No photos found for {user.first_name} {user.last_name}.
      </Typography>
    );
  }


  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>
      
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: '30px' }}>
          
          {/* 1. Hiển thị Ảnh */}
          <CardMedia
            component="img"
            // Đường dẫn tới ảnh: images/tên_file (giả sử thư mục /images nằm ở gốc)
            image={`/images/${photo.file_name}`} 
            alt={`Photo by ${user.first_name}`}
            style={{ maxHeight: 600, objectFit: 'contain' }} 
          />
          
          <CardContent>
            {/* 2. Ngày/giờ tạo ảnh */}
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Created At: **{formatDateTime(photo.date_time)}**
            </Typography>
            
            <Divider style={{ margin: '15px 0' }} />
            
            {/* 3. Hiển thị Bình luận */}
            <Typography variant="h6" gutterBottom>
              Comments ({photo.comments ? photo.comments.length : 0})
            </Typography>

            {photo.comments && photo.comments.length > 0 ? (
              <List disablePadding>
                {photo.comments.map((comment) => (
                  <React.Fragment key={comment._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography variant="body1">
                            {/* Tên người bình luận là link tới UserDetail */}
                            <MuiLink 
                              component={Link} // Sử dụng React Router Link
                              to={`/users/${comment.user._id}`} // Link đến UserDetail
                              variant="subtitle2"
                              color="primary"
                              style={{ marginRight: '8px' }}
                            >
                              {`${comment.user.first_name} ${comment.user.last_name}`}
                            </MuiLink>
                            {/* Ngày/giờ bình luận */}
                            <Typography component="span" variant="caption" color="textSecondary">
                              ({formatDateTime(comment.date_time)})
                            </Typography>
                          </Typography>
                        }
                        secondary={
                          // Văn bản bình luận
                          <Typography variant="body2" color="textPrimary">
                            {comment.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;