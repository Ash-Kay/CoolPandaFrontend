import { Box, Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import styles from "../styles/Home.module.css";
import { useWeb3Context } from "../src/context";
import { getMarketStorageContract } from "../src/hooks/MarketStorageContract";
import { useCallback, useEffect, useState } from "react";
import { Market } from "../src/interfaces";
import MarketCard from "../src/components/MarketCard";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const { web3Provider, connect, disconnect } = useWeb3Context();
  const [markets, setMarkets] = useState<Market[]>([]);

  const getMarkets = useCallback(async () => {
    if (web3Provider) {
      const contract = getMarketStorageContract(web3Provider);

      const totalMarkets = await contract.getTotalMarkets();
      const list: Market[] = [];

      console.log("totalMarkets", totalMarkets);

      for (let i = 1; i <= totalMarkets; i++) {
        const market = await contract.markets(i);
        // console.log("Market i:", market);

        const newMarket: Market = {
          marketId: parseInt(market.marketId, 8),
          question: market.question,
          description: market.description,
          marketType: market.marketType,
          options: [],
          resolverUrl: market.resolverUrl,
          creatorImageHash: market.creatorImageHash,
          endTimestamp: market.endTimestamp,
        };

        const marketOption = await contract.getMarketOptions(i);

        newMarket.options = marketOption;

        // console.log("marketOption", marketOption);
        // console.log(`market raw ${i}`, market);
        // console.log(`market ${i}`, newMarket);

        list.push(newMarket);
      }
      setMarkets(list);
    } else {
      console.log("web3 provider is null!");
    }
  }, [web3Provider]);

  const createMarket = async () => {
    if (web3Provider) {
      const marketHolder = {
        marketId: 1,
        question: "WAGMI?",
        description: "No one knows",
        marketType: 0,
        options: ["yes", "no"],
        resolverUrl: "https://ashishkumars.com/coolpanda/resolve/1",
        creatorImageHash: "https://ashishkumars.com/coolpanda/1/img.jpg",
        endTimestamp: Date.now() + 1000,
      };

      const contract = getMarketStorageContract(web3Provider);

      const createMarketTx = await contract.createMarket(
        marketHolder.question,
        marketHolder.description,
        marketHolder.marketType,
        marketHolder.options,
        marketHolder.resolverUrl,
        marketHolder.creatorImageHash,
        marketHolder.endTimestamp
      );

      console.log("createMarketTx", createMarketTx);
    }
  };

  useEffect(() => {
    if (web3Provider) {
      getMarkets();
    }
  }, [getMarkets, web3Provider]);

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
        <Button variant="contained" onClick={getMarkets}>
          Get Markets
        </Button>

        <Button variant="contained" onClick={createMarket}>
          Crate market
        </Button>
      </Box>

      <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
        {markets.map((market: Market, index) => (
          <MarketCard market={market} key={index} />
        ))}
      </Box>

      <footer>
        <p>Made by @AshKay</p>
      </footer>
    </div>
  );
};

export default Home;
