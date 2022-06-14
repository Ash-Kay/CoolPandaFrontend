import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Modal,
} from "@mui/material";
import { useWeb3Context } from "../context";
import { Market } from "../interfaces";
import { getMarketStorageContract } from "../hooks/MarketStorageContract";
import { ethers } from "ethers";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  market: Market;
}

const MarketCard: React.FC<Props> = (props: Props) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [expandedCardContent, setExpandedCardContent] = useState({
    id: 0,
    amount: 0.01,
    option: 0,
  });
  const { web3Provider, connect, disconnect } = useWeb3Context();
  const [optionBalances, setOptionBalances] = useState<Array<Number>>([]);

  useEffect(() => {
    const getData = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = getMarketStorageContract(provider);

      const balanceList = await Promise.all(
        props.market.options.map(async (option, index) => {
          const hexBalance = await contract.biddersTotalBalanceByOption(
            props.market.marketId,
            index
          );
          return parseFloat(ethers.utils.formatEther(hexBalance));
        })
      );
      setOptionBalances(balanceList);
    };
    getData();
  }, []);

  const handleOptionClicked = (index: number) => {
    if (web3Provider) {
      setExpandedCardContent({ ...expandedCardContent, option: index });
      setIsCardExpanded(true);
    } else {
      console.log("web3Provider is null in market card");
    }
  };

  const handleTransactionSubmit = () => {
    if (web3Provider) {
      const contract = getMarketStorageContract(web3Provider);
      const amount = ethers.utils.parseEther(
        expandedCardContent.amount.toString()
      );

      console.log("addBet", props.market.marketId, expandedCardContent.option);

      contract.addBet(props.market.marketId, expandedCardContent.option, {
        value: amount,
      });
    } else {
      console.log("web3Provider is null in market card");
    }
  };
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpandedCardContent({
      ...expandedCardContent,
      amount: parseFloat(e.target.value),
    });
  };

  return (
    <Card variant="outlined" sx={{ margin: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {props.market.question}
        </Typography>
        <Typography variant="body2">{props.market.description}</Typography>

        {optionBalances?.length > 1 && (
          <LinearProgress
            variant="determinate"
            value={Math.floor(
              (optionBalances[0] / (optionBalances[0] + optionBalances[1])) *
                100
            )}
          />
        )}
        <Box
          sx={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "auto auto",
            marginTop: "1rem",
          }}
        >
          {props.market.options.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleOptionClicked(index)}
            >
              {option}
            </Button>
          ))}
        </Box>
      </CardContent>

      <Modal
        open={isCardExpanded}
        onClose={() => {
          setIsCardExpanded(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            position: "absolute",
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography paragraph>Option {expandedCardContent.option}</Typography>
          <Typography paragraph>Market ID {props.market.marketId}</Typography>
          <input
            type="number"
            step="0.01"
            min="0"
            max="20"
            value={expandedCardContent.amount}
            onChange={handleAmountChange}
          />
          <Button variant="contained" onClick={handleTransactionSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default MarketCard;
