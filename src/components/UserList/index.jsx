import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'; // Thêm các components cần thiết
import { Link } from 'react-router-dom'; // Thêm Link từ React Router để điều hướng

import './styles.css';
import models from '../../modelData/models'; // Đảm bảo đường dẫn này đúng

/**
 * Define UserList, a React component.
 */
function UserList () {

  // Lấy danh sách người dùng từ model
  const users = models.userListModel();

  return (
    <div>
      <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use a <a href="https://mui.com/components/lists/">Lists</a> and 
        a <a href="https://mui.com/components/dividers/">Dividers</a> to
        display your users.
      </Typography>

      {/* Sử dụng List để hiển thị danh sách người dùng */}
      <List component="nav">
        {users.map((item) => (
          // Mỗi ListItem cần là một Link điều hướng 
          <React.Fragment key={item._id}>
            <ListItem 
              button // Tạo hiệu ứng hover/click
              component={Link} // Sử dụng React Router Link
              to={`/users/${item._id}`} // Đường dẫn tới UserDetail
            >
              <ListItemText 
                // Hiển thị tên đầy đủ: First Name + Last Name
                primary={`${item.first_name} ${item.last_name}`} 
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;