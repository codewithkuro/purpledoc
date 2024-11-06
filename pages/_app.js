import { Grommet, grommet as grommetTheme } from "grommet";
import { deepMerge } from "grommet/utils";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });

export default function App({ Component, pageProps }) {
  const theme = deepMerge(grommetTheme, {
    global: {
      colors: {
        brand: "#228be6",
        brand2: "#8e44ad",
      },
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px",
      },
    },
  });

  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <Grommet theme={theme}>
        <Component {...pageProps} />
      </Grommet>
    </>
  );
}
