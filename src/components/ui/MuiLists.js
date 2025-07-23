import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Box,
  Checkbox,
  IconButton,
  Switch,
  ListSubheader,
  Collapse,
  Badge,
  Chip
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ExpandLess,
  ExpandMore,
  People as PeopleIcon,
  Work as WorkIcon,
  BeachAccess as BeachAccessIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Feedback as FeedbackIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

const MuiLists = () => {
  const [checked, setChecked] = React.useState([0]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(true);
  const [switchChecked, setSwitchChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSwitchToggle = (value) => () => {
    const currentIndex = switchChecked.indexOf(value);
    const newChecked = [...switchChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSwitchChecked(newChecked);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Lists Collection
      </Typography>

      {/* Basic List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic List
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* List with Avatars */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          List with Avatars
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="John Doe" secondary="Software Engineer" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Jane Smith" secondary="UI/UX Designer" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Mike Johnson" secondary="Project Manager" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interactive List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Interactive List
        </Typography>
        <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            <Badge badgeContent={4} color="primary">
              <EmailIcon />
            </Badge>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItemButton>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Checkbox List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Checkbox List
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <FavoriteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`Task ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Nested List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Nested List
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Settings
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Important" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Switch List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Switch List
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
            <Switch
              edge="end"
              onChange={handleSwitchToggle('notifications')}
              checked={switchChecked.indexOf('notifications') !== -1}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Security" />
            <Switch
              edge="end"
              onChange={handleSwitchToggle('security')}
              checked={switchChecked.indexOf('security') !== -1}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Auto-sync" />
            <Switch
              edge="end"
              onChange={handleSwitchToggle('sync')}
              checked={switchChecked.indexOf('sync') !== -1}
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Contact List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Contact List
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="John Doe" 
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    john.doe@email.com
                  </Typography>
                  <br />
                  +1 (555) 123-4567
                </React.Fragment>
              }
            />
            <IconButton edge="end" aria-label="phone">
              <PhoneIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Jane Smith" 
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    jane.smith@email.com
                  </Typography>
                  <br />
                  +1 (555) 987-6543
                </React.Fragment>
              }
            />
            <IconButton edge="end" aria-label="phone">
              <PhoneIcon />
            </IconButton>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Menu List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Menu List
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
            <Chip label="New" color="primary" size="small" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            <Badge badgeContent={12} color="error">
              <Box />
            </Badge>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default MuiLists;