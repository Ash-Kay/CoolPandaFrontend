import { Box, Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useCallback, useEffect, useState } from "react";
import useWeb3Store from "../src/state/web3.store";
import useGlobalStore from "../src/state/global.store";
import { useWeb3Context } from "../src/context";

const Home: NextPage = () => {
  const { web3Provider, connect, disconnect } = useWeb3Context();
  return (
    <div className={styles.container}>
      <Head>
        <title>Cool Panda</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        onConnectWalletClicked={() => {
          connect?.();
        }}
      />

      <Box sx={{ marginTop: "60px" }} component="main">
        <Button variant="contained">Hi</Button>
      </Box>

      <footer>
        <p>Made by @AshKay</p>
      </footer>
    </div>
  );
};

export default Home;
