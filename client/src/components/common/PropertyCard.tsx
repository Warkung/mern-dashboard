import {
  Box,
  alpha,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";
import { Link } from "react-router";
import { PropertyCardProps } from "../../interfaces/common";

export default function PropertyCard({
  id,
  title,

  price,
  propertyType,
  location,
  photo,
}: PropertyCardProps) {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      sx={(theme: {
        transitions: { create: (arg0: string[]) => any };
        shadows: any[];
      }) => ({
        maxWidth: 330,
        borderRadius: "12px", // Slightly larger border-radius for the card itself
        padding: "12px", // Increased padding inside the card
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none", // remove underline from Link
        transition: theme.transitions.create([
          "transform",
          "box-shadow",
          "background-color",
        ]), // Add background-color to transition
        "&:hover": {
          boxShadow: theme.shadows[6],
          transform: "scale(1.02)",
        },
      })}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: 210,
          borderRadius: "8px", // Slightly smaller border-radius for the image to fit within card
          objectFit: "cover",
        }}
        image={photo || "https://via.placeholder.com/330x210?text=No+Image"}
        alt={title || "No Title"}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          padding: "15px 5px 5px 5px", // More balanced padding
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography
            fontSize={16}
            fontWeight={600} // Make title bolder
            color="text.primary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title || "No Title"}
          </Typography>
          <Typography
            fontSize={12}
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {propertyType || "No Type"}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <PlaceOutlined
              sx={{
                fontSize: 18,
                color: "text.primary",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="text.secondary">
              {location || "No Location"}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.8} // Increased vertical padding
          borderRadius="6px" // Slightly larger border-radius for the price tag
          bgcolor={(theme) => alpha(theme.palette.primary.main, 0.1)}
          height="fit-content"
        >
          <Typography fontSize={13} fontWeight={700} color="primary.main">
            {" "}
            {/* Make price slightly larger and bolder */}$
            {typeof price === "number" ? price.toLocaleString() : "No Price"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
