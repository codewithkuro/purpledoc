// DashboardFooter.js
import React from "react";
import { Box, Button, Footer, Text } from "grommet";
import { Hpe } from "grommet-icons";

const footerButtons = [
  {
    label: "Terms",
    href: "//www.hpe.com/us/en/about/legal/terms-of-use.html",
  },
  {
    label: "Privacy",
    href: "//www.hpe.com/us/en/legal/privacy.html",
  },
  {
    label: "Do Not Sell My Personal Information",
    href: "//www.hpe.com/us/en/legal/privacy.html#datacollection",
  },
];

export const DashboardFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer
      background="background"
      direction="row-responsive"
      pad={{ horizontal: "medium", vertical: "small" }}
      wrap
    >
      <Box direction="row" gap="medium">
        <Hpe color="plain" />
        <Text size="small">© {year} Purpledoc Passport</Text>
      </Box>
      <Box align="center" direction="row" wrap>
        {footerButtons.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            href={button.href}
            rel="noopener"
            target="_blank"
            margin={{ horizontal: "small" }}
          />
        ))}
      </Box>
    </Footer>
  );
};
