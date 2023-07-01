import { Typography, Box, Paper, Divider, Avatar } from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
function BuyerListing(props) {
  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            color: "gray",
          }}
          variant="caption"
        >
          # 31886
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            marginX: 1,
          }}
        />
        <Typography
          sx={{
            color: "blue",
          }}
          variant="caption"
        >
          {"("} Views {")"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            fontWeight={"700"}
            sx={{
              color: "black",
            }}
            variant="caption"
          >
            1000 MT
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginX: 1,
            }}
          />
          <MessageIcon
            sx={{
              fontSize: 12,
              color: "gray",
            }}
          />
        </Box>
        <Box>
          <Typography
            fontWeight={"700"}
            sx={{
              color: "green",
              textDecoration: "underline",
            }}
            variant="caption"
          >
            INR 12505.00/MT
          </Typography>
        </Box>
      </Box>
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
          30 Lifting Days
        </Typography>
        <Typography
          sx={{
            color: "gray",
          }}
          variant="caption"
        >
          Credit {"("}30 days{")"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <DirectionsBoatIcon
          sx={{
            color: "gray",
            marginRight: 2,
          }}
          fontSize="2"
        />
        <Typography
          variant="body2"
          sx={{
            color: "gray",
          }}
        >
          Ship Name
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Avatar
          sx={{
            width: 16,
            height: 16,
          }}
        >
          <PersonIcon
            sx={{
              fontSize: 8,
            }}
          />
        </Avatar>

        <Typography variant="caption" fontWeight={700}>
          Buyer Info
        </Typography>
      </Box>
      <Box
        className="ratings"
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <Box>
          {[...Array(props.rating)].map((_, index) => (
            <StarIcon
              sx={{
                color: "gold",
                fontSize: 12,
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: "gray",
            marginTop: "auto",
          }}
          variant="caption"
        >
          4.9
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "gray",
          }}
        >
          10K+ Tons
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            marginX: 1,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "gray",
          }}
        >
          50+ Deals
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            marginX: 1,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "gray",
          }}
        >
          2+ Yr
        </Typography>
      </Box>
      <Divider
        sx={{
          marginTop: 1,
          marginBottom: 2,
        }}
      />
    </Paper>
  );
}

export default BuyerListing;
