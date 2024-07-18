import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ColorPaletteProp } from '@mui/joy/styles';

export default function SoftAlert({ items, onClose }) {
  React.useEffect(() => {
    if (items.length > 0) {
      const timer = setTimeout(() => {
        onClose(items[0].title);
      }, 5000);
      
      return () => clearTimeout(timer); 
    }
  }, [items, onClose]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px', // Adjust top position as per your layout
        right: '20px', // Adjust right position as per your layout
        zIndex: 1000, // Ensure alerts appear above other content
        width: '300px', // Adjust width as needed
      }}
    >
      {items.map(({ title, color, icon, message }) => (
        <Alert
          key={title}
          sx={{ alignItems: 'flex-start' }}
          startDecorator={icon}
          variant="soft"
          color={color}
          endDecorator={
            <IconButton variant="soft" color={color} onClick={() => onClose(title)}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{title}</div>
            <Typography level="body-sm" color={color}>
              {message}
            </Typography>
          </div>
        </Alert>
      ))}
    </Box>
  );
}
