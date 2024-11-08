import React, { useContext } from "react";
import { Grid, ResponsiveContext } from "grommet";
import { data, StyledButton } from "./data";
import { DashboardCard } from "./DashboardCard";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";
import { useWallet } from "./WalletContext";

export const DashboardGrid = ({ ...rest }) => {
  const {
    connected,
    setConnected,
    walletClient,
    setWalletClient,
    userAddress,
    setUserAddress,
  } = useWallet();

  async function login(e) {
    e.preventDefault();
    console.log("login clicked");
    try {
      // @ts-ignore
      await window.silk.login();
      const newWalletClient = createWalletClient({
        chain: mainnet,
        // @ts-ignore
        transport: custom(window.silk),
      });
      setWalletClient(newWalletClient);
      setConnected(true);
      const [address] = await newWalletClient.requestAddresses();
      setUserAddress(address);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout(e) {
    e.preventDefault();
    setConnected(false);
    setWalletClient(undefined);
    setUserAddress("");
  }

  data[0].cta = <StyledButton label="Register here" onClick={login} />;

  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={!["xsmall", "small"].includes(size) ? "medium" : "100%"}
      rows={[["auto", "full"]]}
      gap="medium"
      fill
      {...rest}
    >
      <DashboardCard card={data[0]} />
      <DashboardCard card={data[1]} />
      <DashboardCard card={data[2]} />
      {/* {data &&
        data.map((datum, index) => <DashboardCard key={index} card={datum} />)} */}
    </Grid>
  );
};
