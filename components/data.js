// data.js
import { Button } from "grommet";
import styled from "styled-components";
import {
  DocumentUpdate,
  Group,
  Aruba,
  PhoneVertical,
  ShieldSecurity,
  Support,
  UserAdd,
  Certificate,
  UserExpert,
  Checkbox,
} from "grommet-icons";

// styled component to create custom orange button
export const StyledButton = styled(Button)`
  background: ${(props) => props.theme.global.colors["orange!"]};
  color: ${(props) => props.theme.global.colors["text-strong"].light};
  &:hover {
    background: ${(props) => props.theme.global.colors["orange!"]};
    color: ${(props) => props.theme.global.colors["text-strong"].light};
  }
`;

export const data = [
  {
    cta: (
      <StyledButton
        label="Register your Personhood"
        // href="https://silksecure.net/holonym/silk/gov-id/issuance/prereqs"
      />
    ),
    background: "yellow",
    title: "Individual or Displaced Person",
    description: `Use Silk wallet to securely create and store your identity`,
    descriptionColor: "text-strong",
    icon: <UserExpert color="plain" />,
  },
  {
    background: "#d2b4de",
    title: "NGOs and Refugee Representatives",
    description:
      "Issue an Attestation to identify a Refugee or IDP so they can access essential services.",
    icon: <Certificate color="black" size="medium" />,
  },
  {
    cta: "Verify an Individual",
    title: "Service Provider",
    description:
      "Provide essential services to verified persons by validating their identity and credentials.",
    icon: <Checkbox color="plain" />,
  },
  // {
  //   cta: "Assign roles",
  //   title: "Assign user access",
  //   description: "Assign a custom role or built-in roles to your account.",
  //   icon: <UserAdd color="yellow!" />,
  // },
  // {
  //   cta: "Set up SAML SSO",
  //   title: "Add a SSO/SAML connection",
  //   description: `Easily add extra protection to your HPE Account by connecting
  //   to your company's IDP.`,
  //   icon: <ShieldSecurity color="blue!" />,
  // },
  // {
  //   cta: "Enable MFA",
  //   title: "Set up multi-factor authentication  ",
  //   description:
  //     "Easily add extra protection by requiring access to your phone.",
  //   icon: <PhoneVertical color="purple!" />,
  // },
  // {
  //   cta: "Release notes",
  //   title: "Get release notes",
  //   description:
  //     "Stay up to date with the latest release notes from HPE Common Cloud.",
  //   icon: <DocumentUpdate color="brand2" />,
  // },
];
