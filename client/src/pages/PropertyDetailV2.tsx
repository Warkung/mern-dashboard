import { Box, Stack, Typography } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyType } from "../interfaces/property";
import {
  Place,
  Star,
  ChatBubble,
  Delete,
  Edit,
  Phone,
} from "@mui/icons-material";
import { CustomButton } from "../components";

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();

  console.log(user);

  const { query } = useShow();

  const { data, isLoading, isError } = query;
  const property = (data?.data as PropertyType) ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  const isCurrentUser = user.email === user.email;

  const handleDeleteProperty = () => {
    const response = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (response) {
      mutate({ resource: "properties", id: id as string });
      navigate("/properties");
    }
  };
  return (
    <Box
      borderRadius={"15px"}
      padding={"20px"}
      bgcolor={"#fcfcfc"}
      width={"fit-content"}
    >
      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
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
                fontSize={25}
                fontWeight={700}
                color="#11142D"
                textTransform="capitalize"
              >
                {property.title}
              </Typography>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt={0.5}
                  color="#11142D"
                >
                  ${property.price.toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
            <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
              <Place sx={{ color: "#808191" }} />
              <Typography fontSize={14} color="#808191">
                {property.location}
              </Typography>
            </Stack>
          </Box>

          <Stack mt="25px" direction="column" gap="10px">
            <Typography fontSize={18} color="#11142D">
              Description
            </Typography>
            <Typography fontSize={14} color="#808191">
              {property.description}
            </Typography>
          </Stack>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
          mt={2}
        >
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  user.avatar ??
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt={1.5}>
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                  {user.name}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>

              <Stack mt={1.5} direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: "#808191" }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">
                  North Carolina, USA
                </Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">
                {property.creator?.length} Properties
              </Typography>
            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/properties/edit/${property._id}`);
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/google-maps-search-optimization.jpg"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
