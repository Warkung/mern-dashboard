import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { PropertyCardProps } from "../../interfaces/common";
import { Link } from "react-router";
import { Place } from "@mui/icons-material";

export default function PropertyCardV2({
  id,
  title,
  description,
  propertyType,
  price,
  location,
  photo,
}: PropertyCardProps) {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "30px",
        textDecoration: "none",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
      elevation={0}
    >
      <CardMedia
        component={"img"}
        width={"100%"}
        height={210}
        image={photo}
        alt={title}
        sx={{ borderRadius: "10px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          padding: "5px",
        }}
      >
        <Stack direction={"column"} gap={1}>
          <Typography fontSize={16} fontWeight={500}>
            {title}
          </Typography>
          <Stack direction={"row"} gap={0.5} alignItems={"flex-start"}>
            <Place
              sx={{
                fontSize: "18",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={16} fontWeight={500}>
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} height={"100%"} bgcolor="gray">
          <Typography fontSize={12} fontWeight={600} color="#d6d7deff">
            ${price.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
