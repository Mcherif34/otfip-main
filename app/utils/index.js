import { Platform, UIManager, LayoutAnimation, PixelRatio, Dimensions, I18nManager } from 'react-native';
import { Languages } from '@/config';
import { TRANSPARENCIES } from './transparencies';

const scaleValue = PixelRatio.get() / 2;

export const setupLayoutAnimation = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
};

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const landscape = width > height;

  if (Platform.OS === 'android') return 45;
  if (Platform.isPad) return 65;
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const heightTabView = () => {
  const height = Dimensions.get('window').height;
  let size = height - heightHeader();
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      size -= 30;
      break;
    default:
      break;
  }

  return size;
};

export const getWidthDevice = () => {
  return Dimensions.get('window').width;
};

export const getHeightDevice = () => {
  return Dimensions.get('window').height;
};

export const scrollEnabled = (contentWidth, contentHeight) => {
  return contentHeight > Dimensions.get('window').height - heightHeader();
};

export const languageFromCode = (code) => {
  return Languages?.[code]?.name || 'Unknown';
};

export const isLanguageRTL = (code) => {
  switch (code) {
    case 'ar':
    case 'he':
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage, newLanguage) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle !== newStyle) {
    I18nManager.forceRTL(newStyle);
  }
};

export const parseHexTransparency = (hexColor = '#ffffff', transparency = 0) => {
  return `${hexColor}${TRANSPARENCIES?.[transparency] ?? '00'}`;
};

export const haveChildren = (parent = '', children = '') => {
  const parentNew = parent?.toLowerCase?.();
  const childrenNew = children?.toLowerCase?.();
  return parentNew?.includes(childrenNew);
};

export const getLatestByDate = (data) => {
  data.forEach((item) => {
    item.createdDate = new Date(item.createdDate);
    item.updatedDate = new Date(item.updatedDate);
  });

  // Trier la liste par date de création
  data.sort((a, b) => b.createdDate - a.createdDate);

  const lastObjectByCreadtedDate = data[0];
  return lastObjectByCreadtedDate;
};

export const parseDate = (dateStr) => {
  const [day, month, year, time] = dateStr.split(' ');
  const [hours, minutes, seconds] = time.split(':');
  const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds).toLocaleString();
  return formattedDate;
};

export const formatAmount = (amount) => {
  if (amount === undefined || isNaN(parseFloat(amount))) {
    return 'N/A';
  }

  if (amount === '0.00') {
    return '0';
  }

  let amountParsed = parseFloat(amount);
  var suffixes = ['', 'K', 'M', 'MM', 'T', 'P', 'E', 'Z', 'Y'];
  var index = 0;
  while (amountParsed >= 1000 && index < suffixes.length - 1) {
    amountParsed /= 1000;
    index++;
  }
  return amountParsed.toFixed(2) + suffixes[index];
};

export const abbreviateString = (inputString) => {
  const conjunctions = ['et', 'ou', 'ni', 'car', 'donc', 'or', 'mais', 'où'];

  const articles = ['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'au', 'aux'];

  const words = inputString.split(' ');

  let abbreviatedString = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isFirstWord = i === 0;
    const isConjunction = conjunctions.includes(word.toLowerCase());
    const isArticle = articles.includes(word.toLowerCase());

    if (!isFirstWord && !isConjunction && !isArticle) {
      abbreviatedString += word.charAt(0).toUpperCase();
    } else {
      abbreviatedString += word.charAt(0);
    }
  }

  return abbreviatedString;
};

export const getRandomColor = (usedColors) => {
  const allColors = [
    '#1f77b4', // Bleu
    '#ff7f0e', // Orange
    '#2ca02c', // Vert
    '#d62728', // Rouge
    '#8c564b', // Marron
    '#bcbd22', // Jaune
    '#17becf', // Cyan
  ];

  // Filtrer les couleurs déjà utilisées
  const availableColors = allColors.filter((color) => !usedColors?.includes(color));

  // Si aucun paramètre n'est passé ou si tous les codes de couleur sont utilisés,
  // renvoyer une couleur aléatoire
  if (!usedColors || usedColors.length === 0 || availableColors.length === 0) {
    return allColors[Math.floor(Math.random() * allColors.length)];
  }

  // Sinon, renvoyer une couleur aléatoire parmi celles non utilisées
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};
