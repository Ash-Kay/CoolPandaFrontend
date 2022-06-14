import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Button, Chip } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useWeb3Context } from "../context";
import { getMaskAddress } from "../utils/addressUtils";

interface Props {
  onConnectWalletClicked: () => void;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const { address } = useWeb3Context();

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
          {address ? (
            <Chip
              icon={<AccountBalanceWalletIcon fontSize="small" />}
              label={getMaskAddress(address)}
              onClick={() => {}}
            />
          ) : (
            <Button variant="contained" onClick={props.onConnectWalletClicked}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
