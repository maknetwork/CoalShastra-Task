import { useState } from "react";
import {
  Typography,
  IconButton,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";

import { Share, GetApp, Star } from "@mui/icons-material";
import PlaceIcon from "@mui/icons-material/Place";
import ReactCountryFlag from "react-country-flag";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
const MarketCard = ({ onSelect, selected, details }) => {
  return (
    <Card
      elevation={selected ? 4 : 1}
      sx={{
        marginBottom: 2,
        cursor: "pointer",
        borderLeft: selected ? "2px solid #2959BA" : "none",
        borderRadius: 0,
      }}
      onClick={onSelect}
    >
      <CardHeader
        action={
          <div>
            <IconButton color="gray" size="small">
              <Share />
            </IconButton>
            <IconButton color="primary" size="small">
              <GetApp />
            </IconButton>
            <IconButton
              sx={{
                color: "#FFD700",
              }}
              size="small"
            >
              <Star />
            </IconButton>
          </div>
        }
        title={
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "purple",
            }}
          >
            {details.vessel_name}
          </Typography>
        }
      />

      <CardContent
        sx={{
          marginTop: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <Typography variant="subtitle2">
            {details?.origin_vessel?.name}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
          <PlaceIcon fontSize="2" />
          <Typography variant="subtitle2">
            {" "}
            {details?.vessel_attributes[0].port?.port_name}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
          <Typography variant="subtitle2">
            {details?.quality} NAR(Kcal/kg)
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <DirectionsBoatIcon
            sx={{
              color: "gray",
              marginRight: 2,
            }}
            fontSize="2"
          />

          <Typography variant="body2" fontWeight={500}>
            {details.vessel_attributes.map((item, id) => (
              <span>
                {item.vessel_name}
                {id == details.vessel_attributes.length - 1 ? "" : ","}{" "}
              </span>
            ))}
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Best Buyer /MT
            <span style={{ fontWeight: "bold", color: "rgba(0,0,0,1)" }}>
              {details?.currency}{" "}
              {details?.find_prices?.best_buyer_price ?? "****"}
            </span>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Best Seller /MT
            <span style={{ fontWeight: "bold", color: "rgba(0,0,0,1)" }}>
              INR {details?.find_prices?.best_seller_price ?? "****"}
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Last Match
            <span style={{ fontWeight: "bold", color: "rgba(0,0,0,1)" }}>
              {details?.currency}{" "}
              {details?.find_prices?.last_trade_price ?? "****"}
            </span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
