import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const MessageCard = ({ message, onDelete }) => {
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'message', message.id));
        onDelete(message.id);
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message');
      }
    }
  };

  const handleEmailOpen = () => {
    setEmailContent(`Dear ${message.name},\n\nThank you for your message.\n\nBest regards,\nMahmoud Badr`);
    setOpenEmailDialog(true);
  };

  const handleEmailClose = () => {
    setOpenEmailDialog(false);
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${message.email}?subject=Re: Your Message&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoLink);
    setOpenEmailDialog(false);
  };

  return (
    <>
      <Card sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h6" component="div">
                {message.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {message.email}
              </Typography>
              <Typography color="textSecondary" sx={{ fontSize: '0.8rem', mb: 2 }}>
                {formatDate(message.timestamp)}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {message.message}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleEmailOpen} color="primary" title="Reply">
                <EmailIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error" title="Delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openEmailDialog} onClose={handleEmailClose} maxWidth="md" fullWidth>
        <DialogTitle>Reply to {message.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailClose}>Cancel</Button>
          <Button onClick={handleSendEmail} variant="contained" color="primary">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageCard;