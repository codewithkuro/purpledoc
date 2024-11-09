// DashboardFooter.js
import React from "react";
import { Box, Button, Footer, Text } from "grommet";
import { DocumentPpt } from "grommet-icons";

const footerButtons = [
  {
    label: "Terms",
    href: "//www.hpe.com/us/en/about/legal/terms-of-use.html",
  },
  {
    label: "Privacy",
    href: "//www.hpe.com/us/en/legal/privacy.html",
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
        <DocumentPpt color="brand2" />
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
