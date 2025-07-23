import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  Badge,
  Fab,
  Button,
  Divider,
  Stack,
  Tooltip
} from '@mui/material';
import {
  // Navigation Icons
  Home as HomeIcon,
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Close as CloseIcon,
  
  // Action Icons
  Add as AddIcon,
  Remove as RemoveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  
  // Communication Icons
  Email as EmailIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  Chat as ChatIcon,
  VideoCall as VideoCallIcon,
  Call as CallIcon,
  
  // Social Icons
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Share as ShareIconSocial,
  
  // E-commerce Icons
  ShoppingCart as ShoppingCartIcon,
  ShoppingBag as ShoppingBagIcon,
  Store as StoreIcon,
  Payment as PaymentIcon,
  LocalShipping as LocalShippingIcon,
  Receipt as ReceiptIcon,
  
  // User Icons
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  
  // Status Icons
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  
  // Media Icons
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  
  // File Icons
  Folder as FolderIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Image as ImageIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Description as DescriptionIcon,
  
  // System Icons
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Feedback as FeedbackIcon,
  
  // Rating Icons
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  
  // Weather Icons
  WbSunny as WbSunnyIcon,
  Cloud as CloudIcon,
  
  // Location Icons
  LocationOn as LocationOnIcon,
  Map as MapIcon,
  
  // Time Icons
  AccessTime as AccessTimeIcon,
  Schedule as ScheduleIcon,
  
  // Visibility Icons
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  
  // Favorite Icons
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  
  // More Icons
  MoreVert as MoreVertIcon,
  MoreHoriz as MoreHorizIcon,
  
  // Directional Icons
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  
  // Business Icons
  Business as BusinessIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  
  // Technology Icons
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Watch as WatchIcon,
  Headphones as HeadphonesIcon,
  
  // Transportation Icons
  DirectionsCar as DirectionsCarIcon,
  Train as TrainIcon,
  Flight as FlightIcon,
  DirectionsBike as DirectionsBikeIcon,
  
  // Food Icons
  Restaurant as RestaurantIcon,
  LocalCafe as LocalCafeIcon,
  Cake as CakeIcon,
  LocalPizza as LocalPizzaIcon,
  
  // Health Icons
  LocalHospital as LocalHospitalIcon,
  FitnessCenter as FitnessCenterIcon,
  Healing as HealingIcon,
  
  // Entertainment Icons
  Movie as MovieIcon,
  MusicNote as MusicNoteIcon,
  SportsEsports as SportsEsportsIcon,
  
  // Educational Icons
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  
  // Utility Icons
  Build as BuildIcon,
  Construction as ConstructionIcon,
  
  // Nature Icons
  Eco as EcoIcon,
  Park as ParkIcon,
  
  // Sports Icons
  SportsBasketball as SportsBasketballIcon,
  SportsFootball as SportsFootballIcon,
  
  // Additional Icons
  Navigation as NavigationIcon
} from '@mui/icons-material';

const MuiIcons = () => {
  const iconCategories = [
    {
      title: 'Navigation Icons',
      icons: [
        { icon: <HomeIcon />, name: 'Home' },
        { icon: <MenuIcon />, name: 'Menu' },
        { icon: <ArrowBackIcon />, name: 'Back' },
        { icon: <ArrowForwardIcon />, name: 'Forward' },
        { icon: <ExpandMoreIcon />, name: 'Expand More' },
        { icon: <ExpandLessIcon />, name: 'Expand Less' },
        { icon: <CloseIcon />, name: 'Close' }
      ]
    },
    {
      title: 'Action Icons',
      icons: [
        { icon: <AddIcon />, name: 'Add' },
        { icon: <RemoveIcon />, name: 'Remove' },
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <DeleteIcon />, name: 'Delete' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <ShareIcon />, name: 'Share' },
        { icon: <DownloadIcon />, name: 'Download' },
        { icon: <UploadIcon />, name: 'Upload' },
        { icon: <SearchIcon />, name: 'Search' },
        { icon: <FilterListIcon />, name: 'Filter' }
      ]
    },
    {
      title: 'Communication Icons',
      icons: [
        { icon: <EmailIcon />, name: 'Email' },
        { icon: <PhoneIcon />, name: 'Phone' },
        { icon: <MessageIcon />, name: 'Message' },
        { icon: <ChatIcon />, name: 'Chat' },
        { icon: <VideoCallIcon />, name: 'Video Call' },
        { icon: <CallIcon />, name: 'Call' }
      ]
    },
    {
      title: 'E-commerce Icons',
      icons: [
        { icon: <ShoppingCartIcon />, name: 'Shopping Cart' },
        { icon: <ShoppingBagIcon />, name: 'Shopping Bag' },
        { icon: <StoreIcon />, name: 'Store' },
        { icon: <PaymentIcon />, name: 'Payment' },
        { icon: <LocalShippingIcon />, name: 'Shipping' },
        { icon: <ReceiptIcon />, name: 'Receipt' }
      ]
    },
    {
      title: 'User Icons',
      icons: [
        { icon: <PersonIcon />, name: 'Person' },
        { icon: <PersonAddIcon />, name: 'Add Person' },
        { icon: <GroupIcon />, name: 'Group' },
        { icon: <AccountCircleIcon />, name: 'Account' },
        { icon: <LoginIcon />, name: 'Login' },
        { icon: <LogoutIcon />, name: 'Logout' }
      ]
    },
    {
      title: 'Status Icons',
      icons: [
        { icon: <CheckCircleIcon />, name: 'Success' },
        { icon: <CancelIcon />, name: 'Cancel' },
        { icon: <WarningIcon />, name: 'Warning' },
        { icon: <ErrorIcon />, name: 'Error' },
        { icon: <InfoIcon />, name: 'Info' }
      ]
    },
    {
      title: 'Media Icons',
      icons: [
        { icon: <PlayArrowIcon />, name: 'Play' },
        { icon: <PauseIcon />, name: 'Pause' },
        { icon: <StopIcon />, name: 'Stop' },
        { icon: <VolumeUpIcon />, name: 'Volume Up' },
        { icon: <VolumeOffIcon />, name: 'Volume Off' }
      ]
    },
    {
      title: 'File Icons',
      icons: [
        { icon: <FolderIcon />, name: 'Folder' },
        { icon: <InsertDriveFileIcon />, name: 'File' },
        { icon: <ImageIcon />, name: 'Image' },
        { icon: <PictureAsPdfIcon />, name: 'PDF' },
        { icon: <DescriptionIcon />, name: 'Document' }
      ]
    },
    {
      title: 'System Icons',
      icons: [
        { icon: <SettingsIcon />, name: 'Settings' },
        { icon: <NotificationsIcon />, name: 'Notifications' },
        { icon: <SecurityIcon />, name: 'Security' },
        { icon: <HelpIcon />, name: 'Help' },
        { icon: <FeedbackIcon />, name: 'Feedback' }
      ]
    },
    {
      title: 'Rating Icons',
      icons: [
        { icon: <StarIcon />, name: 'Star' },
        { icon: <StarBorderIcon />, name: 'Star Border' },
        { icon: <StarHalfIcon />, name: 'Star Half' },
        { icon: <ThumbUpIcon />, name: 'Thumb Up' },
        { icon: <ThumbDownIcon />, name: 'Thumb Down' }
      ]
    },
    {
      title: 'Technology Icons',
      icons: [
        { icon: <ComputerIcon />, name: 'Computer' },
        { icon: <SmartphoneIcon />, name: 'Smartphone' },
        { icon: <TabletIcon />, name: 'Tablet' },
        { icon: <WatchIcon />, name: 'Watch' },
        { icon: <HeadphonesIcon />, name: 'Headphones' }
      ]
    },
    {
      title: 'Business Icons',
      icons: [
        { icon: <BusinessIcon />, name: 'Business' },
        { icon: <WorkIcon />, name: 'Work' },
        { icon: <AssessmentIcon />, name: 'Assessment' },
        { icon: <AttachMoneyIcon />, name: 'Money' },
        { icon: <TrendingUpIcon />, name: 'Trending Up' },
        { icon: <TrendingDownIcon />, name: 'Trending Down' }
      ]
    }
  ];

  const iconVariants = [
    { size: 'small', label: 'Small' },
    { size: 'medium', label: 'Medium' },
    { size: 'large', label: 'Large' }
  ];

  const iconColors = [
    { color: 'primary', label: 'Primary' },
    { color: 'secondary', label: 'Secondary' },
    { color: 'success', label: 'Success' },
    { color: 'error', label: 'Error' },
    { color: 'warning', label: 'Warning' },
    { color: 'info', label: 'Info' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Icons Collection
      </Typography>

      {/* Icon Sizes */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icon Sizes
        </Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          {iconVariants.map((variant) => (
            <Box key={variant.size} sx={{ textAlign: 'center' }}>
              <HomeIcon fontSize={variant.size} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {variant.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icon Colors */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icon Colors
        </Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          {iconColors.map((colorOption) => (
            <Box key={colorOption.color} sx={{ textAlign: 'center' }}>
              <HomeIcon color={colorOption.color} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {colorOption.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icon Buttons */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icon Buttons
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
          <Tooltip title="Add Item">
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Item">
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Item">
            <IconButton color="info">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton color="secondary">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton color="success">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icons with Badges */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icons with Badges
        </Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          <Badge badgeContent={4} color="primary">
            <EmailIcon />
          </Badge>
          <Badge badgeContent={12} color="error">
            <NotificationsIcon />
          </Badge>
          <Badge badgeContent={3} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          <Badge variant="dot" color="success">
            <MessageIcon />
          </Badge>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icons in Avatars */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icons in Avatars
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <ShoppingCartIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <CheckCircleIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'error.main' }}>
            <ErrorIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'warning.main' }}>
            <WarningIcon />
          </Avatar>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icons in Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icons in Chips
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
          <Chip icon={<PersonIcon />} label="Profile" />
          <Chip icon={<EmailIcon />} label="Email" color="primary" />
          <Chip icon={<PhoneIcon />} label="Phone" color="secondary" />
          <Chip icon={<LocationOnIcon />} label="Location" color="success" />
          <Chip icon={<ScheduleIcon />} label="Schedule" color="warning" />
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icons in Buttons */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icons in Buttons
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Item
          </Button>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="text" startIcon={<ShareIcon />}>
            Share
          </Button>
          <Button variant="contained" endIcon={<DownloadIcon />} color="success">
            Download
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Floating Action Buttons */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Floating Action Buttons
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
          <Fab color="success" aria-label="favorite">
            <FavoriteIcon />
          </Fab>
          <Fab variant="extended" color="info">
            <NavigationIcon sx={{ mr: 1 }} />
            Navigate
          </Fab>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Icon Categories */}
      {iconCategories.map((category, categoryIndex) => (
        <Box key={categoryIndex} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {category.title}
          </Typography>
          <Grid container spacing={2}>
            {category.icons.map((iconItem, iconIndex) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={iconIndex}>
                <Card sx={{ textAlign: 'center', p: 2, minHeight: 100 }}>
                  <Box sx={{ mb: 1 }}>
                    {iconItem.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {iconItem.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MuiIcons;