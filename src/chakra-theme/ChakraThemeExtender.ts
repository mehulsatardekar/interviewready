// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/inter/400.css";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        color: mode("gray.800", "white")(props),
        bg: mode("#F3F3F3", "#282525")(props),
      },
    }),
  },

  colors: {
    logo: {
      100: "#F846C6",
      200: "#3E64EC",
      300: "#6C54FF",
    },

    text: {
      100: "#3E64EC",
    },

    textgray: {
      100: "#807D7D",
    },
  },

  fonts: {
    body: "Inter, sans-serif",
    text: "Inter, sans-serif",
  },

  Components: {
    // all component stylings
  },
});

export { theme };
