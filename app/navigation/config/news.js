import NFilter from '@/screens/NFilter';
import NPostDetail from '@/screens/NPostDetail';
import NSearch from '@/screens/NSearch';
import NSearchHistory from '@/screens/NSearchHistory';
import SliderIntro from '@/screens/SliderIntro';
/* Bottom News Screen */
import NHome from '@/screens/NHome';
import NPost from '@/screens/NPost';
import NCategory from '@/screens/NCategory';
import NFavourite from '@/screens/NFavourite';
import FCryptol02 from '@/screens/FCryptol02';
import { tabBarIcon, tabBarIconHaveNoty, BottomTabNavigatorMazi } from '@/navigation/components';
import Setting from '@/screens/Setting';
import ChangeLanguage from '@/screens/ChangeLanguage';
import SelectDarkOption from '@/screens/SelectDarkOption';
import PTask from '@/screens/PTask';
import PTaskView from '@/screens/PTaskView';
import PFilter from '@/screens/PFilter';
import Visualization from '@/screens/FCryptol02/Visualization';
import OfficialText from '@/screens/OfficialText';
import TicketOfficialText from '@/components/TicketOfficialText';
import ResourceView from '@/screens/ResourceView';
import ResourceFilter from '@/screens/ResourceFilter';
import { Images } from '@/config';

export const NewsTabScreens = {
  NHome: {
    component: NHome,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: Images.home }),
    },
  },
  NCategory: {
    component: NCategory,
    options: {
      title: 'collection',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: Images.collection }),
    },
  },
  Publication: {
    component: PTask,
    options: {
      title: 'publication',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: Images.publication }),
    },
  },
  OfficialText: {
    component: OfficialText,
    options: {
      title: 'official_text',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: Images.decree }),
    },
  },
  Profile: {
    component: Setting,
    options: {
      title: 'setting',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: Images.setting }),
    },
  },
};

const NewsMenu = () => <BottomTabNavigatorMazi tabScreens={NewsTabScreens} />;

export default {
  NewsMenu: {
    component: NewsMenu,
    options: {
      title: 'news',
    },
  },
  // NFeedback: {
  //   component: NFeedback,
  //   options: {
  //     title: 'feedback',
  //   },
  // },
  NFilter: {
    component: NFilter,
    options: {
      title: 'filtering',
    },
  },
  // NMessages: {
  //   component: NMessages,
  //   options: {
  //     title: 'message',
  //   },
  // },
  // NMessenger: {
  //   component: NMessenger,
  //   options: {
  //     title: 'messenger',
  //   },
  // },
  // NNotification: {
  //   component: NNotification,
  //   options: {
  //     title: 'notification',
  //   },
  // },
  NPostDetail: {
    component: NPostDetail,
    options: {
      title: 'post_detail',
    },
  },
  NSearch: {
    component: NSearch,
    options: {
      title: 'search',
    },
  },
  NSearchHistory: {
    component: NSearchHistory,
    options: {
      title: 'search_history',
    },
  },
  SliderIntro: {
    component: SliderIntro,
    options: {
      title: 'Slider Intro',
      gestureEnabled: false,
      animationEnabled: false,
    },
  },
  FCryptol02: {
    component: FCryptol02,
    options: {
      title: 'Dataset Details',
    },
  },
  NPost: {
    component: NPost,
    options: {
      title: 'detailed_information',
    },
  },
  NCategory: {
    component: NCategory,
    options: {
      title: 'collection',
    },
  },
  Visualization: {
    component: Visualization,
    options: {
      title: 'Visualization',
      presentation: 'modal',
    },
  },
  Setting: {
    component: Setting,
    options: {
      title: 'setting',
    },
  },
  // AboutUs: {
  //   component: AboutUs,
  //   options: {
  //     title: 'about_us',
  //   },
  // },
  ChangeLanguage: {
    component: ChangeLanguage,
    options: {
      title: 'change_language',
    },
  },
  // ThemeSetting: {
  //   component: ThemeSetting,
  //   options: {
  //     title: 'theme',
  //   },
  // },
  // SelectFontOption: {
  //   component: SelectFontOption,
  //   options: {
  //     title: 'select_font_option',
  //   },
  // },
  SelectDarkOption: {
    component: SelectDarkOption,
    options: {
      title: 'select_dark_option',
    },
  },
  Publication: {
    component: PTask,
    options: {
      title: 'publication',
    },
  },
  PublicationView: {
    component: PTaskView,
    options: {
      title: 'publication_view',
    },
  },
  ResourceView: {
    component: ResourceView,
    options: {
      title: 'resource_view',
    },
  },
  PublicationFilter: {
    component: PFilter,
    options: {
      title: 'publication_filtre',
    },
  },
  ResourceFilter: {
    component: ResourceFilter,
    options: {
      title: 'publication_filtre',
    },
  },
  OfficialText: {
    component: OfficialText,
    options: {
      title: 'official_text',
    },
  },
  TicketOfficialText: {
    component: TicketOfficialText,
    options: {
      title: 'official_text_ticket',
    },
  },
  NFavourite: {
    component: NFavourite,
    options: {
      title: 'setting',
    },
  },
};
