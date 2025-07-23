import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  Chip,
  Grid,
  Stack,
  Divider,
  Avatar,
  Rating,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Slider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  LinearProgress,
  CircularProgress,
  Tooltip,
  Breadcrumbs,
  Link,
  Skeleton,
  Alert,
  AlertTitle,
  Collapse
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingBag as ShoppingBagIcon,
  Compare as CompareIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationOnIcon,
  Store as StoreIcon,
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  Shield as ShieldIcon,
  Assignment as AssignmentIcon,
  Help as HelpIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  PhotoCamera as PhotoCameraIcon,
  Videocam as VideocamIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Battery as BatteryIcon,
  Bluetooth as BluetoothIcon,
  Wifi as WifiIcon,
  Usb as UsbIcon,
  Headphones as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Monitor as MonitorIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Cloud as CloudIcon,
  Backup as BackupIcon,
  Sync as SyncIcon,
  Update as UpdateIcon,
  Build as BuildIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  Brush as BrushIcon,
  Category as CategoryIcon,
  Label as LabelIcon,
  LocalOffer as LocalOfferIcon,
  Discount as DiscountIcon,
  MonetizationOn as MonetizationOnIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  SupervisorAccount as SupervisorAccountIcon,
  AccountCircle as AccountCircleIcon,
  ContactMail as ContactMailIcon,
  ContactPhone as ContactPhoneIcon,
  ContactSupport as ContactSupportIcon,
  Forum as ForumIcon,
  Comment as CommentIcon,
  Message as MessageIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Send as SendIcon,
  Drafts as DraftsIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  MarkEmailRead as MarkEmailReadIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
  Restore as RestoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIconAlt,
  Check as CheckIcon,
  Close as CloseIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Sync as SyncIconAlt,
  Loop as LoopIcon,
  Autorenew as AutorenewIcon,
  Cached as CachedIcon,
  History as HistoryIcon,
  Restore as RestoreFromTrashIcon,
  RestoreFromTrash as RestoreFromTrashIconAlt,
  Undo as UndoIcon,
  Redo as RedoIcon,
  FlipToBack as FlipToBackIcon,
  FlipToFront as FlipToFrontIcon,
  Layers as LayersIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Search as SearchIcon,
  FindInPage as FindInPageIcon,
  FindReplace as FindReplaceIcon,
  Spellcheck as SpellcheckIcon,
  Translate as TranslateIcon,
  Language as LanguageIcon,
  Public as PublicIcon,
  Explore as ExploreIcon,
  TravelExplore as TravelExploreIcon,
  Room as RoomIcon,
  Place as PlaceIcon,
  PinDrop as PinDropIcon,
  MyLocation as MyLocationIcon,
  GpsFixed as GpsFixedIcon,
  GpsNotFixed as GpsNotFixedIcon,
  GpsOff as GpsOffIcon,
  Satellite as SatelliteIcon,
  Terrain as TerrainIcon,
  Map as MapIcon,
  Directions as DirectionsIcon,
  DirectionsCar as DirectionsCarIcon,
  DirectionsBike as DirectionsBikeIcon,
  DirectionsWalk as DirectionsWalkIcon,
  DirectionsTransit as DirectionsTransitIcon,
  DirectionsRun as DirectionsRunIcon,
  Flight as FlightIcon,
  Train as TrainIcon,
  Subway as SubwayIcon,
  Tram as TramIcon,
  Bus as BusIcon,
  Taxi as TaxiIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  LocalCafe as LocalCafeIcon,
  LocalBar as LocalBarIcon,
  LocalPizza as LocalPizzaIcon,
  LocalDining as LocalDiningIcon,
  Fastfood as FastfoodIcon,
  KebabDining as KebabDiningIcon,
  RamenDining as RamenDiningIcon,
  BakeryDining as BakeryDiningIcon,
  IceCream as IceCreamIcon,
  Cake as CakeIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Receipt as ReceiptIcon,
  ReceiptLong as ReceiptLongIcon,
  Loyalty as LoyaltyIcon,
  CardGiftcard as CardGiftcardIcon,
  Redeem as RedeemIcon,
  LocalAtm as LocalAtmIcon,
  AccountBalance as AccountBalanceIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Wallet as WalletIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Savings as SavingsIcon,
  TrendingFlat as TrendingFlatIcon,
  CallMade as CallMadeIcon,
  CallReceived as CallReceivedIcon,
  SwapHoriz as SwapHorizIcon,
  SwapVert as SwapVertIcon,
  SwapHorizontalCircle as SwapHorizontalCircleIcon,
  SwapVerticalCircle as SwapVerticalCircleIcon,
  CompareArrows as CompareArrowsIcon,
  ImportExport as ImportExportIcon,
  Input as InputIcon,
  Output as OutputIcon,
  OpenInBrowser as OpenInBrowserIcon,
  OpenInNew as OpenInNewIcon,
  OpenWith as OpenWithIcon,
  Launch as LaunchIcon,
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  Attachment as AttachmentIcon,
  AttachFile as AttachFileIcon,
  AttachEmail as AttachEmailIcon,
  InsertLink as InsertLinkIcon,
  AddLink as AddLinkIcon,
  ContentCopy as ContentCopyIcon,
  ContentCut as ContentCutIcon,
  ContentPaste as ContentPasteIcon,
  ContentPasteOff as ContentPasteOffIcon,
  ContentPasteGo as ContentPasteGoIcon,
  ContentPasteSearch as ContentPasteSearchIcon,
  FileCopy as FileCopyIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  CreateNewFolder as CreateNewFolderIcon,
  FolderShared as FolderSharedIcon,
  FolderSpecial as FolderSpecialIcon,
  DriveFileMove as DriveFileMoveIcon,
  DriveFileMoveOutline as DriveFileMoveOutlineIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  DriveFolderUpload as DriveFolderUploadIcon,
  FilePresent as FilePresentIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  NoteAdd as NoteAddIcon,
  PostAdd as PostAddIcon,
  PlaylistAdd as PlaylistAddIcon,
  PlaylistPlay as PlaylistPlayIcon,
  QueueMusic as QueueMusicIcon,
  LibraryMusic as LibraryMusicIcon,
  MusicNote as MusicNoteIcon,
  MusicOff as MusicOffIcon,
  Radio as RadioIcon,
  GraphicEq as GraphicEqIcon,
  Equalizer as EqualizerIcon,
  VolumeDown as VolumeDownIcon,
  VolumeMute as VolumeMuteIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  MicNone as MicNoneIcon,
  MicExternalOn as MicExternalOnIcon,
  MicExternalOff as MicExternalOffIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  VoiceOverOff as VoiceOverOffIcon,
  Hearing as HearingIcon,
  HearingDisabled as HearingDisabledIcon,
  SignLanguage as SignLanguageIcon,
  Translate as TranslateIconAlt,
  Interpreter as InterpreterIcon,
  Subtitles as SubtitlesIcon,
  SubtitlesOff as SubtitlesOffIcon,
  ClosedCaption as ClosedCaptionIcon,
  ClosedCaptionOff as ClosedCaptionOffIcon,
  ClosedCaptionDisabled as ClosedCaptionDisabledIcon,
  Surround as SurroundIcon,
  SurroundSound as SurroundSoundIcon,
  TheaterComedy as TheaterComedyIcon,
  Theaters as TheatersIcon,
  Movie as MovieIcon,
  MovieCreation as MovieCreationIcon,
  MovieFilter as MovieFilterIcon,
  LocalMovies as LocalMoviesIcon,
  VideoLibrary as VideoLibraryIcon,
  VideoCall as VideoCallIcon,
  VideoSettings as VideoSettingsIcon,
  Videocam as VideocamIconAlt,
  VideocamOff as VideocamOffIcon,
  VideoLabel as VideoLabelIcon,
  SlowMotionVideo as SlowMotionVideoIcon,
  HighQuality as HighQualityIcon,
  Hd as HdIcon,
  Sd as SdIcon,
  FourK as FourKIcon,
  FiveK as FiveKIcon,
  SixK as SixKIcon,
  SevenK as SevenKIcon,
  EightK as EightKIcon,
  NineK as NineKIcon,
  TenK as TenKIcon,
  EightKPlus as EightKPlusIcon,
  NineKPlus as NineKPlusIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MuiProductDescription = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [favorite, setFavorite] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState('black');
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [zoomOpen, setZoomOpen] = React.useState(false);
  const [compareOpen, setCompareOpen] = React.useState(false);
  const [reviewsExpanded, setReviewsExpanded] = React.useState(false);
  const [specsExpanded, setSpecsExpanded] = React.useState(false);
  const [shippingExpanded, setShippingExpanded] = React.useState(false);
  const [warrantyExpanded, setWarrantyExpanded] = React.useState(false);
  const [helpExpanded, setHelpExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addedToCart, setAddedToCart] = React.useState(false);

  const productData = {
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    model: 'AT-WH1000XM5',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 1234,
    availability: 'In Stock',
    sku: 'AT-WH-001',
    category: 'Electronics > Audio > Headphones',
    tags: ['Wireless', 'Noise Cancelling', 'Bluetooth', 'Premium'],
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    colors: [
      { name: 'Black', value: 'black', hex: '#000000' },
      { name: 'White', value: 'white', hex: '#FFFFFF' },
      { name: 'Silver', value: 'silver', hex: '#C0C0C0' },
      { name: 'Blue', value: 'blue', hex: '#0066CC' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Experience superior sound quality with our premium wireless headphones featuring advanced noise cancellation technology and exceptional comfort for all-day wear.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (3 hours in 10 minutes)',
      'Bluetooth 5.0 connectivity',
      'Voice assistant compatible',
      'Foldable design',
      'Touch controls',
      'Multi-device pairing'
    ],
    specifications: {
      'Audio': {
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 20kHz',
        'Impedance': '32 ohms',
        'Sound Pressure Level': '100 dB'
      },
      'Connectivity': {
        'Bluetooth Version': '5.0',
        'Codec Support': 'AAC, SBC, LDAC',
        'Range': '30 feet',
        'Multi-point Connection': 'Yes'
      },
      'Battery': {
        'Battery Life': '30 hours',
        'Charging Time': '3 hours',
        'Quick Charge': '10 min for 3 hours',
        'Battery Type': 'Lithium-ion'
      },
      'Physical': {
        'Weight': '250g',
        'Dimensions': '7.3 x 6.7 x 3.0 inches',
        'Foldable': 'Yes',
        'Cable Length': '1.2m'
      }
    },
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        date: '2024-01-15',
        title: 'Excellent sound quality!',
        comment: 'These headphones exceeded my expectations. The sound quality is crystal clear and the noise cancellation works perfectly.',
        helpful: 45,
        verified: true
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        date: '2024-01-12',
        title: 'Great for travel',
        comment: 'Perfect for long flights. The battery life is impressive and they are very comfortable to wear for hours.',
        helpful: 32,
        verified: true
      },
      {
        id: 3,
        user: 'Mike R.',
        rating: 5,
        date: '2024-01-10',
        title: 'Worth every penny',
        comment: 'Premium build quality and exceptional sound. The noise cancellation is top-notch.',
        helpful: 28,
        verified: false
      }
    ],
    shipping: {
      standard: { price: 5.99, days: '5-7 business days' },
      express: { price: 12.99, days: '2-3 business days' },
      overnight: { price: 24.99, days: '1 business day' },
      free: { threshold: 50, days: '5-7 business days' }
    },
    warranty: {
      manufacturer: '2 years',
      extended: '3 years ($29.99)',
      coverage: 'Defects in materials and workmanship'
    },
    seller: {
      name: 'AudioTech Official Store',
      rating: 4.8,
      reviews: 15678,
      verified: true,
      location: 'California, USA'
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }, 1000);
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const ratingDistribution = [
    { stars: 5, count: 856, percentage: 69 },
    { stars: 4, count: 247, percentage: 20 },
    { stars: 3, count: 86, percentage: 7 },
    { stars: 2, count: 31, percentage: 3 },
    { stars: 1, count: 14, percentage: 1 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Product Description Collection
      </Typography>

      {/* Complete Product Page */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Complete Product Page
        </Typography>
        
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="#">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Electronics
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Audio
          </Link>
          <Typography color="text.primary">Headphones</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 3 }}>
          <Grid container spacing={4}>
            {/* Product Images */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="400"
                    image={productData.images[selectedImage]}
                    alt={productData.name}
                    sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
                  />
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <IconButton onClick={() => setZoomOpen(true)}>
                      <ZoomInIcon />
                    </IconButton>
                    <IconButton>
                      <FullscreenIcon />
                    </IconButton>
                  </CardActions>
                </Card>

                {/* Product badges */}
                <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
                  {productData.discount > 0 && (
                    <Chip
                      label={`${productData.discount}% OFF`}
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  )}
                  <Chip
                    label="Best Seller"
                    color="warning"
                    size="small"
                    icon={<StarIcon />}
                  />
                </Box>

                {/* Thumbnail Images */}
                <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
                  {productData.images.map((image, index) => (
                    <Card
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        cursor: 'pointer',
                        border: selectedImage === index ? '2px solid' : '1px solid #e0e0e0',
                        borderColor: selectedImage === index ? 'primary.main' : 'grey.300'
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <CardMedia
                        component="img"
                        height="80"
                        image={image}
                        alt={`${productData.name} ${index + 1}`}
                        sx={{ objectFit: 'contain' }}
                      />
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                  {productData.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    by {productData.brand}
                  </Typography>
                  <Chip label={productData.category.split(' > ').pop()} size="small" />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Rating value={productData.rating} readOnly precision={0.5} />
                  <Typography variant="body2">
                    {productData.rating} ({productData.reviewCount} reviews)
                  </Typography>
                  <Chip
                    label={productData.availability}
                    color={productData.availability === 'In Stock' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Typography variant="h4" color="primary">
                    ${productData.price}
                  </Typography>
                  {productData.originalPrice && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${productData.originalPrice}
                    </Typography>
                  )}
                  {productData.discount > 0 && (
                    <Typography variant="h6" color="success.main">
                      Save ${(productData.originalPrice - productData.price).toFixed(2)}
                    </Typography>
                  )}
                </Box>

                <Typography variant="body1" paragraph>
                  {productData.description}
                </Typography>

                {/* Color Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Color: {productData.colors.find(c => c.value === selectedColor)?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {productData.colors.map((color) => (
                      <Tooltip key={color.value} title={color.name}>
                        <IconButton
                          onClick={() => setSelectedColor(color.value)}
                          sx={{
                            bgcolor: color.hex,
                            border: selectedColor === color.value ? '2px solid' : '1px solid #ccc',
                            borderColor: selectedColor === color.value ? 'primary.main' : 'grey.300',
                            width: 40,
                            height: 40,
                            '&:hover': { bgcolor: color.hex, opacity: 0.8 }
                          }}
                        >
                          {selectedColor === color.value && (
                            <CheckIcon sx={{ color: color.hex === '#FFFFFF' ? '#000' : '#fff' }} />
                          )}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>

                {/* Size Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Size: {selectedSize}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {productData.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'contained' : 'outlined'}
                        onClick={() => setSelectedSize(size)}
                        sx={{ minWidth: 50 }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Quantity and Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                    <IconButton onClick={() => handleQuantityChange(-1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ px: 2 }}>{quantity}</Typography>
                    <IconButton onClick={() => handleQuantityChange(1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CircularProgress size={16} /> : <ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={loading}
                    sx={{ flex: 1 }}
                  >
                    {loading ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  <IconButton
                    onClick={() => setFavorite(!favorite)}
                    color={favorite ? 'error' : 'default'}
                  >
                    {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button variant="outlined" startIcon={<ShoppingBagIcon />}>
                    Buy Now
                  </Button>
                  <Button variant="outlined" startIcon={<CompareIcon />}>
                    Compare
                  </Button>
                  <Button variant="outlined" startIcon={<ShareIcon />}>
                    Share
                  </Button>
                </Stack>

                {/* Quick Info */}
                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocalShippingIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Free Shipping"
                        secondary="On orders over $50"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Secure Payment"
                        secondary="SSL encrypted checkout"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <VerifiedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="2-Year Warranty"
                        secondary="Manufacturer guarantee"
                      />
                    </ListItem>
                  </List>
                </Box>

                {/* Seller Information */}
                <Box sx={{ mt: 3, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Sold by
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <StoreIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {productData.seller.name}
                        {productData.seller.verified && (
                          <VerifiedIcon fontSize="small" sx={{ ml: 1, color: 'success.main' }} />
                        )}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={productData.seller.rating} readOnly size="small" />
                        <Typography variant="body2">
                          {productData.seller.rating} ({productData.seller.reviews} reviews)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Product Information Tabs */}
          <Box sx={{ mt: 4 }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="product tabs">
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Reviews" />
              <Tab label="Shipping" />
              <Tab label="Warranty" />
            </Tabs>

            <TabPanel value={selectedTab} index={0}>
              <Typography variant="h6" gutterBottom>
                Product Description
              </Typography>
              <Typography paragraph>
                {productData.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Key Features
              </Typography>
              <List>
                {productData.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" gutterBottom>
                What's in the Box
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HeadphonesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Premium Wireless Headphones" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <UsbIcon />
                  </ListItemIcon>
                  <ListItemText primary="USB-C Charging Cable" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HeadphonesIcon />
                  </ListItemIcon>
                  <ListItemText primary="3.5mm Audio Cable" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Quick Start Guide" />
                </ListItem>
              </List>
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
              <Typography variant="h6" gutterBottom>
                Technical Specifications
              </Typography>
              {Object.entries(productData.specifications).map(([category, specs]) => (
                <Accordion key={category} expanded={specsExpanded === category} onChange={() => setSpecsExpanded(specsExpanded === category ? '' : category)}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {Object.entries(specs).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell>{key}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>

            <TabPanel value={selectedTab} index={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Customer Reviews ({productData.reviewCount})
                </Typography>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  Write a Review
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" textAlign="center" gutterBottom>
                        {productData.rating}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Rating value={productData.rating} readOnly precision={0.5} />
                      </Box>
                      <Typography variant="body2" textAlign="center" color="text.secondary">
                        Based on {productData.reviewCount} reviews
                      </Typography>

                      <Box sx={{ mt: 3 }}>
                        {ratingDistribution.map((rating) => (
                          <Box key={rating.stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: 20 }}>
                              {rating.stars}
                            </Typography>
                            <StarIcon fontSize="small" sx={{ mx: 1 }} />
                            <LinearProgress
                              variant="determinate"
                              value={rating.percentage}
                              sx={{ flex: 1, mx: 1 }}
                            />
                            <Typography variant="body2" sx={{ minWidth: 40 }}>
                              {rating.count}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Stack spacing={2}>
                    {productData.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar>{review.user.charAt(0)}</Avatar>
                              <Box>
                                <Typography variant="subtitle2">
                                  {review.user}
                                  {review.verified && (
                                    <Chip label="Verified" size="small" sx={{ ml: 1 }} />
                                  )}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {review.date}
                                </Typography>
                              </Box>
                            </Box>
                            <Rating value={review.rating} readOnly size="small" />
                          </Box>
                          
                          <Typography variant="subtitle1" gutterBottom>
                            {review.title}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {review.comment}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                              size="small"
                              startIcon={<ThumbUpIcon />}
                              sx={{ textTransform: 'none' }}
                            >
                              Helpful ({review.helpful})
                            </Button>
                            <Button
                              size="small"
                              startIcon={<ReplyIcon />}
                              sx={{ textTransform: 'none' }}
                            >
                              Reply
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={selectedTab} index={3}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Shipping Options
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <LocalShippingIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Standard Shipping"
                            secondary={`$${productData.shipping.standard.price} - ${productData.shipping.standard.days}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocalShippingIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Express Shipping"
                            secondary={`$${productData.shipping.express.price} - ${productData.shipping.express.days}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocalShippingIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Overnight Shipping"
                            secondary={`$${productData.shipping.overnight.price} - ${productData.shipping.overnight.days}`}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Delivery Information
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Free Shipping"
                            secondary={`On orders over $${productData.shipping.free.threshold}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocationOnIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Worldwide Shipping"
                            secondary="Available to most countries"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ScheduleIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Order Processing"
                            secondary="1-2 business days"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={selectedTab} index={4}>
              <Typography variant="h6" gutterBottom>
                Warranty Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Manufacturer Warranty
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <ShieldIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Coverage Period"
                            secondary={productData.warranty.manufacturer}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Coverage"
                            secondary={productData.warranty.coverage}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ContactSupportIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Support"
                            secondary="24/7 customer support"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Extended Warranty
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <SecurityIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Extended Coverage"
                            secondary={productData.warranty.extended}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Additional Benefits"
                            secondary="Accident protection included"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PhoneIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Priority Support"
                            secondary="Dedicated support line"
                          />
                        </ListItem>
                      </List>
                      <Button variant="outlined" sx={{ mt: 2 }}>
                        Add Extended Warranty
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Simple Product Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Simple Product Card
        </Typography>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            height="200"
            image="/api/placeholder/400/200"
            alt="Product"
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wireless Bluetooth Speaker
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={4.5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                (128 reviews)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              $79.99
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Premium quality wireless speaker with exceptional sound quality and 20-hour battery life.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth>
              Add to Cart
            </Button>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Product Comparison Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Product Comparison Card
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Compare Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Feature</TableCell>
                    <TableCell>Product A</TableCell>
                    <TableCell>Product B</TableCell>
                    <TableCell>Product C</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>$299</TableCell>
                    <TableCell>$249</TableCell>
                    <TableCell>$399</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>
                      <Rating value={4.5} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Rating value={4.2} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Rating value={4.8} readOnly size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Battery Life</TableCell>
                    <TableCell>30 hours</TableCell>
                    <TableCell>25 hours</TableCell>
                    <TableCell>35 hours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Warranty</TableCell>
                    <TableCell>2 years</TableCell>
                    <TableCell>1 year</TableCell>
                    <TableCell>3 years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Success Alert */}
      <Collapse in={addedToCart}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setAddedToCart(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Success!</AlertTitle>
          Product added to cart successfully!
        </Alert>
      </Collapse>
    </Box>
  );
};

export default MuiProductDescription;