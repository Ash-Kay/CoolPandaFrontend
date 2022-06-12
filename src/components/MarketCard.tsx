import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  LinearProgress,
  Modal,
  TextField,
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
  const [amount, setAmount] = useState<Array<Number>>();

  useEffect(() => {
    const getData = async () => {
      if (web3Provider) {
        const contract = getMarketStorageContract(web3Provider);
        let arr: Array<Number> = [];

        console.log("forEach", props.market.marketId, props.market.options);

        props.market.options.forEach(async (option, index) => {
          const res = await contract.biddersTotalBalanceByOption(
            props.market.marketId,
            index
          );
          arr.push(parseFloat(ethers.utils.formatEther(res)));
        });
        setAmount(arr);
      } else {
        console.log("null in use effect market card");
      }
    };
    getData();
  }, [web3Provider]);

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

        {amount?.length > 1 && (
          <LinearProgress
            variant="determinate"
            value={Math.floor((amount[0] / (amount[0] + amount[1])) * 100)}
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
