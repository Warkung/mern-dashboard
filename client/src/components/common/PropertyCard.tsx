import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { PropertyCardProps } from "../../interfaces/common";
import { Link } from "react-router";

export default function PropertyCard({
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
      to={`/property/${id}`}
      elevation={0}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        cursor: "pointer",

        "&:hover": { boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)" },
      }}
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
          <Typography fontSize={16}></Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
