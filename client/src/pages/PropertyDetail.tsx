import { Box, Stack, Typography } from "@mui/material";
import { BaseRecord, useGetIdentity, useShow } from "@refinedev/core";
import { useNavigate } from "react-router";
import { PropertyType } from "../interfaces/property";
import { Place, Star } from "@mui/icons-material";

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();

  const { query } = useShow();

  const { data, isLoading, isError } = query;
  const property = (data?.data as PropertyType) ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  return (
    <Box
      borderRadius={"15px"}
      padding={"20px"}
      bgcolor={"#fcfcfc"}
      width={"fit-content"}
    >
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", lg: "row" }}
        gap={10}
        marginTop={"10px"}
      >
        <Box flex={1} maxWidth={780}>
          <img
            src={property.photo}
            alt={property.title}
            width={780}
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <Box mt={"15px"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142d"
                textTransform={"capitalize"}
              >
                {property.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    sx={{
                      color: "#f2c94c",
                    }}
                  />
                ))}
              </Box>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Typography
                fontSize={22}
                fontWeight={600}
                color="#11142d"
                textTransform={"capitalize"}
              >
                {property.title}
              </Typography>
              <Stack mt={0.5} direction={"row"} alignItems={"center"} gap={0.5}>
                <Place sx={{ color: "#808191" }} />
                <Typography
                  fontSize={14}
                  color="#11142d"
                  textTransform={"capitalize"}
                >
                  {property.location}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
