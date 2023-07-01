import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

const FilterComponent = forwardRef(({ onFilterChange, handleSearch }, ref) => {
  const theme = useTheme();
  const [currency, setCurrency] = useState("INR");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [liftingDays, setLiftingDays] = useState("");
  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    setCurrency(value);
    onFilterChange({ currency: value, paymentMethod, liftingDays });
  };

  const handlePaymentMethodChange = (event) => {
    const value = event.target.value;
    setPaymentMethod(value);
    onFilterChange({ currency, paymentMethod: value, liftingDays });
  };

  const handleLiftingDaysChange = (event) => {
    const value = event.target.value;
    setLiftingDays(value);
    onFilterChange({ currency, paymentMethod, liftingDays: value });
  };

  const handleClearAll = () => {
    setCurrency("");
    setPaymentMethod("");
    setLiftingDays("");
    onFilterChange({ currency: "", paymentMethod: "", liftingDays: "" });
  };
  useImperativeHandle(ref, () => ({
    clearFilters() {
      handleClearAll();
    },
  }));

  return (
    <Box
      sx={{
        padding: 2,
        justifyContent: "space-between",
        display: "flex",
        [theme.breakpoints.up("md")]: {
          flexDirection: "row",
        },
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          marginBottom: "16px",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Currency
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              labelId="currency-label"
              value={currency}
              onChange={handleCurrencyChange}
              size="small"
            >
              <MenuItem value="INR">INR</MenuItem>

              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="caption"
            sx={{ color: "gray", whiteSpace: "nowrap" }}
          >
            Payment Methods
          </Typography>
          <FormControl>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              size="small"
            >
              <MenuItem value="cash">Cash & Carry</MenuItem>
              <MenuItem value="advance">Advance (100%)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="caption"
            sx={{ color: "gray", whiteSpace: "nowrap" }}
          >
            Lifting Days
          </Typography>
          <TextField
            label="Lifting Days"
            type="number"
            value={liftingDays}
            onChange={handleLiftingDaysChange}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box>
          <Button
            variant="text"
            onClick={handleClearAll}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Search By Vessel, Type, etc"
          variant="outlined"
          size="small"
          onChange={(event) => {
            const value = event.target.value;
            handleSearch(value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
});

export default FilterComponent;
