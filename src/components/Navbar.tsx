import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import useWeb3Store from "../state/web3.store";
import { useEffect } from "react";

interface Props {
  onConnectWalletClicked: () => void;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const web3State = useWeb3Store((state) => state.data);
  useEffect(() => {
    console.log("nav state", web3State);
  }, [web3State]);

  return (
    <Box
      component="nav"
      sx={{
        px: { xs: 2, md: 4 },
        height: "56px",
        boxShadow: 1,
        zIndex: "appBar",
        position: "fixed",
        bgcolor: "background.default",
        top: 0,
        right: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" passHref>
          <Typography variant="h6" component="h1" fontWeight="700">
            CryptoBets
          </Typography>
        </Link>

        <Box>
          {/* {!web3State.isWallectConnected && ( */}
          <Button variant="contained" onClick={props.onConnectWalletClicked}>
            Connect Wallet
          </Button>
          {/* )} */}
          {web3State.isWallectConnected && web3State.address && (
            <h1>{web3State.address}</h1>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
