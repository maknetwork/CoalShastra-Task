import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Box,
  IconButton,
  Tab,
  Tabs,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarIcon from "@mui/icons-material/Star";
import { makeStyles } from "@mui/styles";

import FilterComponent from "../components/FilterComponent";
import MarketCard from "../components/MarketCard";

import StoreIcon from "@mui/icons-material/Store";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ContractDetails from "./ContractDetails";
import { useTheme } from "@mui/material/styles";

import { marketData } from "../data";
import BuyingComponent from "../components/BuyingComponent";
import SellingComponent from "../components/SelllingComponent";
const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectMButton: {
    marginLeft: "auto",
  },
}));

function MarketDetails(props) {
  const theme = useTheme();
  const childRef = useRef();

  const classes = useStyles();
  const [tabValue, setTabValue] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSData, setCurrentSData] = useState([]);
  const [activeTabs, setActiveTabs] = useState("buy");
  const [filteredData, setFilteredData] = useState([]);
  const [selContractDetails, setSelContractDetails] = useState(null);

  const [filterList, setFilterList] = useState({
    currency: "",
    paymentMethod: "",
    loadingDays: "",
  });
  const handleCardSelect = (cardId) => {
    console.log(cardId);
    setSelectedCard(cardId);
  };

  const onActiveTabChng = (event, newValue) => {
    setActiveTabs(newValue);
  };
  const tabItems = [
    { id: 1, name: "USAGUJ", fullName: "USA-GUJARAT" },
    { id: 2, name: "WCL", fullName: "Western Coalfields" },
    { id: 3, name: "MCL", fullName: "Mahanadi Coalfield " },
    { id: 4, name: "VIZAGPT", fullName: "Vizag - Gangavaram" },
    { id: 5, name: "INDOGUJ", fullName: "Kandla - Mundra - Navlakhi" },
    { id: 6, name: "NMANGPT", fullName: "USA-GUJARAT" },
    { id: 7, name: "USAUN", fullName: "USA-GUJARAT" },
    { id: 8, name: "USAM", fullName: "USA-GUJARAT" },
    { id: 9, name: "ECL", fullName: "USA-GUJARAT" },
    { id: 10, name: "ENNKAPT", fullName: "USA-GUJARAT" },
  ];
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCurrentTabName = () => {
    if (tabValue == 0) {
      return "FAV";
    }

    const tabName = tabItems.find((item) => item.id === tabValue).name;
    return tabName;
  };

  const getCurrentTabFullName = (tValue) => {
    if (tValue == 0) {
      return "FAV";
    }

    const tabName = tabItems.find((item) => item.id === tValue).fullName;
    return tabName;
  };

  const getContractDetails = () => {
    if (filteredData.length == 0) {
      return;
    }
    const contractDetail = filteredData.find(
      (item) => item.id === selectedCard
    );
    console.log("cc", contractDetail);
    setSelContractDetails(contractDetail);
  };

  const filterItems = (filters) => {
    const { currency, paymentMethod, liftingDays } = filters;

    const filteredItems = currentSData.filter((item) => {
      return (
        (currency
          ? item.currency.toLowerCase().includes(currency.toLowerCase())
          : true) &&
        (paymentMethod ? item.paymentMethod === paymentMethod : true) &&
        (liftingDays ? item.liftingDays >= liftingDays : true)
      );
    });

    return filteredItems;
  };
  useEffect(() => {
    if (filteredData.length > 0) {
      setSelectedCard(filteredData[0].id);
    }
  }, [filteredData]);
  const onFilterChange = (filters) => {
    setFilterList(filters);
    setFilteredData(filterItems(filters));
  };

  const handleSearch = (searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (lowerSearchTerm.trim() === "") {
      setFilteredData(filterItems(filterList));
      return;
    }
    const searchResults = filteredData.filter((item) => {
      const { vessel_name, vessel_attributes } = item;

      if (vessel_name.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }

      for (const attr of vessel_attributes) {
        if (attr.vessel_name.toLowerCase().includes(lowerSearchTerm)) {
          return true;
        }
      }

      return false;
    });

    setFilteredData([...searchResults]);
  };

  useEffect(() => {
    const tabN = getCurrentTabName();

    const dataM = marketData[tabN];
    console.log(dataM);
    childRef.current.clearFilters();
    setCurrentSData(dataM);

    setFilteredData(dataM);
  }, [tabValue]);
  useEffect(() => {
    getContractDetails();
  }, [selectedCard]);

  return (
    <Box
      sx={{
        paddingInline: 5,
        paddingBlock: 2,
        [theme.breakpoints.up("md")]: {
          paddingInline: 10,
        },
      }}
    >
      <Grid container>
        <Grid item xs={12} className={classes.heading}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Market Details</Typography>
            <IconButton
              color="inherit"
              className={classes.refreshIcon}
              onClick={() => {}}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            startIcon={<StoreIcon />}
            className={classes.selectMButton}
          >
            SELECT MARKET
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab
              label="FAV"
              value={0}
              icon={<StarIcon />}
              iconPosition="start"
            />

            {tabItems.map((item) => (
              <Tab key={item.id} label={item.name} value={item.id} />
            ))}
          </Tabs>
        </Grid>

        {/* Rest of the content for each tab goes here */}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FilterComponent
            ref={childRef}
            onFilterChange={onFilterChange}
            handleSearch={handleSearch}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{}}>
            <Box
              sx={{
                marginBottom: 2,
                padding: 2,
              }}
            >
              <Typography variant="caption">
                <span style={{ fontWeight: "bold" }}>
                  {getCurrentTabFullName(tabValue)}
                </span>{" "}
                market
              </Typography>
            </Box>

            <Box
              sx={{
                maxHeight: "600px",
                overflowY: "scroll",
              }}
            >
              {filteredData.map((item) => (
                <MarketCard
                  key={item.id}
                  details={item}
                  onSelect={() => handleCardSelect(item.id)}
                  selected={selectedCard === item.id}
                />
              ))}
            </Box>

            {filteredData.length == 0 && (
              <Box
                sx={{
                  paddingLeft: 2,
                }}
              >
                <Typography variant="body1">No market found</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper
            elevation={1}
            sx={{
              padding: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                marginBottom: 2,
                backgroundColor: "#F2F5FB",
                display: "flex",
                justifyContent: "center",
                padding: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "blue",
                }}
              >
                All prices are including CESS
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                marginBottom: 2,
                backgroundColor: "#F7DEC5",
                display: "flex",

                padding: 2,
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <WhatshotIcon
                  sx={{
                    color: "#E64842",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                  fontSize={8}
                  fontWeight={"bold"}
                >
                  HOT LISTING
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#E64842",
                }}
              >
                Accepting terms, without any modifications, of a "HOT listing"
                will lead to compulsory bid/offer acceptance
              </Typography>
            </Paper>
            <ContractDetails
              contractDetail={selContractDetails}
            ></ContractDetails>
          </Paper>
          <Paper
            elevation={1}
            sx={{
              padding: 2,
              marginTop: 2,
            }}
          >
            <Box>
              <Tabs
                value={activeTabs}
                onChange={onActiveTabChng}
                indicatorColor="primary"
                variant="scrollable"
                allowScrollButtonsMobile
              >
                <Tab label="Buy" value={"buy"} />

                <Tab label="Sell" value={"sell"} />
              </Tabs>
            </Box>

            <Box
              sx={{
                padding: 2,
              }}
            >
              {activeTabs == "buy" ? (
                <BuyingComponent
                  selContractDetails={selContractDetails}
                ></BuyingComponent>
              ) : (
                <SellingComponent
                  selContractDetails={selContractDetails}
                ></SellingComponent>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MarketDetails;
