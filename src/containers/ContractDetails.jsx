import {
  Typography,
  Box,
  IconButton,
  Tab,
  Tabs,
  Grid,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ReactCountryFlag from "react-country-flag";

import DownloadIcon from "@mui/icons-material/Download";
import BuyerListing from "../components/BuyerListing";
import SellerListing from "../components/SellerListing";

function ContractDetails({ contractDetail: details }) {
  const rating = 5;
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                {details?.vessel_name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ReactCountryFlag
                  className="emojiFlag"
                  countryCode="US"
                  style={{
                    fontSize: "1em",
                    marginRight: 2,
                  }}
                  aria-label="United States"
                  svg
                />
                <Typography variant="caption">
                  {details?.origin_vessel?.name}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    marginX: 1,
                  }}
                />
                <PlaceIcon fontSize="2" />
                <Typography variant="caption">
                  {details?.vessel_attributes[0].port?.port_name}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    marginX: 1,
                  }}
                />
                <Typography variant="caption">
                  {details?.quality} NAR(Kcal/kg)
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  color: "gray",
                }}
              >
                <DownloadIcon fontSize="6" />
                <Typography
                  variant="caption"
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Download Report
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "rgba(0,0,0,0.5)",
              marginLeft: "auto",
            }}
          >
            Last Match
            <span
              style={{
                fontWeight: "bold",
                color: "#2959BA",
              }}
            >
              {details?.currency}{" "}
              {details?.find_prices?.last_trade_price ?? "****"} /MT
            </span>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle2">All Listings</Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "gray",
                  }}
                  variant="caption"
                >
                  Required Qty
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                  variant="caption"
                >
                  Buyers
                </Typography>
              </Box>
              <Divider
                sx={{
                  marginTop: 1,
                  marginBottom: 2,
                }}
              />

              <BuyerListing rating={rating}></BuyerListing>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "gray",
                  }}
                  variant="caption"
                >
                  Sellers
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                  variant="caption"
                >
                  Offer Qty
                </Typography>
              </Box>
              <Divider
                sx={{
                  marginTop: 1,
                  marginBottom: 2,
                }}
              />
              <SellerListing />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 2,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "gray",
              }}
              variant="caption"
            >
              2000
            </Typography>
            <Typography
              sx={{
                color: "gray",
              }}
              variant="caption"
            >
              Total Quantity
            </Typography>
            <Typography
              sx={{
                color: "gray",
              }}
              variant="caption"
            >
              2000
            </Typography>
          </Box>
          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 2,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#2959BA",
            }}
            variant={"subtitle2"}
          >
            No more listings
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ContractDetails;
