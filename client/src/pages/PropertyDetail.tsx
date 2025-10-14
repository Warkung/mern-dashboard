import { Place, Star } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { BaseRecord, useGetIdentity, useShow } from "@refinedev/core";
import { useNavigate, useParams } from "react-router";
import { PropertyType } from "../interfaces/property";

const checkImage = (url: string) => {
  const image = new Image();
  image.src = url;
  return image.width !== 0 && image.height !== 0;
};

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();

  const { query } = useShow<any>();

  const { data, isLoading, isError } = query;
  const {
    description,
    location,
    photo,
    price,
    propertyType,
    title,
    creator,
    _id: id,
  } = data?.data ?? {};
  console.log(creator);
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  return (
    <Box
      borderRadius={"15px"}
      padding={"20px"}
      bgcolor={"#fcfcfc"}
      width={"fit-content"}
    >
      <Typography fontSize={25} fontWeight={500} color="#11142d">
        Details
      </Typography>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", lg: "row" }}
        gap={10}
        marginTop={"10px"}
      >
        <Box flex={1} maxWidth={780}>
          <img
            src={photo}
            alt={title}
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
                {propertyType}
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
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142d"
                  textTransform={"capitalize"}
                >
                  {title}
                </Typography>
                <Stack
                  mt={0.5}
                  direction={"row"}
                  alignItems={"center"}
                  gap={0.5}
                >
                  <Place sx={{ color: "#808191" }} />
                  <Typography
                    fontSize={14}
                    color="#11142d"
                    textTransform={"capitalize"}
                  >
                    {location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color="#11142d"
                  mt={"10px"}
                >
                  Price
                </Typography>
                <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
                  <Typography fontSize={25} fontWeight={600} color="#475be8">
                    ${price.toLocaleString()}
                  </Typography>
                  <Typography fontSize={14} color="#808191" mb={1}>
                    For one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction={"column"} alignItems={"flex-start"} gap={1}>
              <Typography
                fontSize={16}
                fontWeight={600}
                color="#11142d"
                mt={"10px"}
              >
                Description
              </Typography>
              <Typography fontSize={16} fontWeight={600} color="#808191">
                {description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          flex={1}
          maxWidth={326}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <Stack
            p={2}
            width={"100%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid #e4e4e4"}
          >
            <Stack
              mt={2}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <img
                src={
                  checkImage(creator.avatar)
                    ? creator.avatar
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={"avatar"}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
