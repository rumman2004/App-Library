// --- Antinode (local assets) ---
import antinodeIcon     from '../assets/app-icons/Antinode icon.png';
import antinodeMockup   from '../assets/app-Interfaces/Antinode/App-mockup.png';
import antinodeHome     from '../assets/app-Interfaces/Antinode/Antinode-home.png';
import antinodeFolders  from '../assets/app-Interfaces/Antinode/Antinode-folders.png';
import antinodeProfile  from '../assets/app-Interfaces/Antinode/Aninode-userprofile.png';

// --- Gaan (local assets) ---
import gaanIcon         from '../assets/app-icons/Gaan.png';
import gaanIconTrans    from '../assets/app-icons/Gaan-transparent.png';
import gaanQR           from '../assets/app-icons/Gaan-QR.png';
import gaanHome         from '../assets/app-Interfaces/Gaan/Home.png';
import gaanLibrary      from '../assets/app-Interfaces/Gaan/Library.png';
import gaanNowPlaying   from '../assets/app-Interfaces/Gaan/Now Playing.png';
import gaanRecognize    from '../assets/app-Interfaces/Gaan/Recognize.png';
import gaanSearch       from '../assets/app-Interfaces/Gaan/Search page.png';
import gaanLyrics       from '../assets/app-Interfaces/Gaan/lyrics.png';
import gaandesktop      from '../assets/app-Interfaces/Gaan/Desktop-2.png';

// --- Planix ---
const planixLogo = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440321/Planix_icon_fmjrxh.png';
const planixHomePage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440359/Plainx_Home_Page_b06gre.jpg';
const planixCalendarPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440361/Planix_Calendar_psoh3s.jpg';
const planixAddEventPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440361/Planix_Add_Event_yymqov.jpg';
const planixAppMockup = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440360/app-mockup_mxy5ht.png';
const planixProfilePage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440361/Plainx_User_Profile_ije0za.jpg';
const planixAlertPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440360/Planix_Alert_Page_hvbvid.jpg';

// --- Calculator ---
const calcDarkTheme = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440049/Calculator_Dark_theme_vzdvyo.jpg';
const calcLightTheme = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440049/Calculator_Light_theme_v4zkrb.jpg';
const calcHistoryImg = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440049/Calculator_history_k0ggpy.jpg';
const calcMockupImg = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440051/App-mockup_guw12j.png';
const calcAppIcon = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440291/Calculator_icon_dh5q6e.png';

// --- Dr Crop ---
const drCropAppMockup = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440447/app_mockup_frycko.png';
const drCropHomePage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440445/Dr_Crop_Home_Page_im7bbn.jpg';
const drCropHistoryPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440445/Dr_Crop_History_Page_oxz89x.jpg';
const drCropJournalPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440445/Dr_Crop_Jurnal_Page_zwwwca.jpg';
const drCropSplashPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440446/dr_crop_opening_splash_fjl7sa.jpg';
const drCropScanPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440446/Scan_Page_tbqmr0.jpg';
const drCropGalleryPage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440446/Select_image_from_galary_sjajm5.jpg';
const drCropProfilePage = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440447/User_Profile_Dr_Crop_ip4dw6.jpg';
const drCropAppIcon = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440319/Dr_Crop_icon_rmifob.png';

// --- General / Layout ---
const heroIphoneMockup = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440543/iphone-mockup_gesj7v.png';
const avatarImg = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440541/avatar_wpwyba.jpg';
const portfolioImg = 'https://res.cloudinary.com/dtbytfxzs/image/upload/v1778440543/portfolio_c5q2hh.png';

export const Images = {
  planix: {
    logo: planixLogo,
    home: planixHomePage,
    calendar: planixCalendarPage,
    addEvent: planixAddEventPage,
    mockup: planixAppMockup,
    profile: planixProfilePage,
    alert: planixAlertPage,
  },
  calculator: {
    icon: calcAppIcon,
    dark: calcDarkTheme,
    light: calcLightTheme,
    history: calcHistoryImg,
    mockup: calcMockupImg,
  },
  drCrop: {
    icon: drCropAppIcon,
    mockup: drCropAppMockup,
    home: drCropHomePage,
    history: drCropHistoryPage,
    journal: drCropJournalPage,
    splash: drCropSplashPage,
    scan: drCropScanPage,
    gallery: drCropGalleryPage,
    profile: drCropProfilePage,
  },
  antinode: {
    icon: antinodeIcon,
    mockup: antinodeMockup,
    home: antinodeHome,
    folders: antinodeFolders,
    profile: antinodeProfile,
  },
  gaan: {
    icon: gaanIcon,
    iconTrans: gaanIconTrans,
    qr: gaanQR,
    desktop: gaandesktop,
    home: gaanHome,
    library: gaanLibrary,
    nowPlaying: gaanNowPlaying,
    recognize: gaanRecognize,
    search: gaanSearch,
    lyrics: gaanLyrics,
  },
  general: {
    heroIphone: heroIphoneMockup,
    avatar: avatarImg,
    portfolio: portfolioImg,
  }
};
