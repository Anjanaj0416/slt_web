import { components } from "./components";
import { typography } from "./typography";
import { blue, marron, paste, primary, themeColors } from "./theme-colors";

const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  FURNITURE: "FURNITURE",
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/
const themesOptionList = {
  [THEMES.DEFAULT]: {
    typography,
    breakpoints,
    components,
    palette: { primary: { ...primary, light: primary[100] }, ...themeColors },
  },
  [THEMES.GROCERY]: {
    typography,
    breakpoints,
    components,
    palette: { primary: { ...primary, light: primary[100] }, ...themeColors },
  },
  [THEMES.FURNITURE]: {
    typography,
    breakpoints,
    components,
    palette: { primary: { ...paste, light: paste[100] }, ...themeColors },
  },
  [THEMES.HEALTH]: {
    typography,
    breakpoints,
    components,
    palette: { primary: { ...blue, light: blue[100] }, ...themeColors },
  },
  [THEMES.GIFT]: {
    typography,
    breakpoints,
    components,
    palette: { primary: { ...marron, light: marron[100] }, ...themeColors },
  },
};

const themeOptions = (publicRuntimeConfig: any, pathname: string) => {
  let themeOption;

  /*
    YOU CAN ALSO REMOVE updateTheme function
    AND FOLLOWING ENTIRE switch case BLOCK.
  */
  const updateTheme = (themeName: string) => {
    // publicRuntimeConfig.theme = themeName;
    themeOption = themesOptionList[themeName];
  };

  switch (pathname) {
    case "/":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/grocery1":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/grocery2":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/grocery3":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/gadget-shop":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/fashion-shop-1":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/market-1":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/furniture-shop":
      updateTheme(THEMES.FURNITURE);
      break;

    case "/healthbeauty-shop":
      updateTheme(THEMES.HEALTH);
      break;

    case "/gift-shop":
      updateTheme(THEMES.GIFT);
      break;

    default:
      themeOption = themesOptionList[THEMES.DEFAULT];
      break;
  }
  /*
        IF YOU REMOVE THE switch case, YOU NEED TO ASSIGN VALUE TO themeOptions
        E.G. themeOption = themesOptions[THEMES.DEFAULT];
    */
  // themeOption = themesOptions[THEMES.DEFAULT];

  return themeOption;
};

export default themeOptions;
