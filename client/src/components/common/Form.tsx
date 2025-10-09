import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { FormProps } from "../../interfaces/common";

const itemForSelect = [
  { value: "apartment" },
  { value: "villa" },
  { value: "farmhouse" },
  { value: "condos" },
  { value: "studio" },
];

export default function Form({
  type,
  register,
  formLoading,
  handleSubmit,
  handleImageChange,
  propertyImage,
}: FormProps) {
  return (
    <Box
      margin={"auto"}
      width={{ lg: "70%", md: "80%", xs: "90%" }}
      paddingInline={{ lg: 10, md: 5, xs: 2 }}
    >
      <Typography
        fontSize={25}
        fontWeight={700}
        sx={{ textTransform: "capitalize" }}
      >
        {type} a property
      </Typography>

      <Box>
        <form
          action={""}
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            required
            color="info"
            label="Property name"
            {...register("title", { required: true })}
          />
          <TextField
            fullWidth
            required
            color="info"
            label="Property description"
            multiline
            rows={5}
            {...register("description", { required: true })}
          />

          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <FormControl sx={{ flex: 2 }}>
              <InputLabel shrink id="property-type-select-label">
                Select Property Type
              </InputLabel>
              <Select
                label="Select Property Type"
                labelId="property-type-select-label"
                variant="outlined"
                color="info"
                displayEmpty
                required
                defaultValue=""
                sx={{ textTransform: "capitalize" }}
                {...register("propertyType", { required: true })}
              >
                <MenuItem value="" disabled>
                  <em style={{ color: "#aca5a5ff" }}>Select Property Type</em>
                </MenuItem>
                {itemForSelect.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.value}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack flex={1}>
              <TextField
                fullWidth
                required
                color="info"
                label="Property price"
                type="number"
                {...register("price", { required: true })}
              />
            </Stack>
          </Stack>
          <TextField
            fullWidth
            required
            color="info"
            label="Location"
            {...register("location", { required: true })}
          />

          <Stack
            direction={{ lg: "row", xs: "column" }}
            gap={2}
            alignItems={{ lg: "center", xs: "flex-start" }}
            justifyContent={"space-between"}
            mb={2}
          >
            <Stack direction="row" gap={2}>
              <Button
                component="label"
                variant="outlined"
                color="info"
                sx={{
                  width: "fit-content",
                  textTransform: "capitalize",
                }}
              >
                <PhotoCamera sx={{ marginRight: "8px" }} />
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleImageChange(e.target.files![0])
                  }
                />
              </Button>
            </Stack>
            {propertyImage?.url && (
              <Typography
                border={1}
                borderColor={"#808191"}
                borderRadius={1}
                padding={"0.5rem 2rem"}
                maxWidth={"400px"}
                maxHeight={"34px"}
                overflow={"hidden"}
                textAlign={"center"}
                fontSize={14}
                color="#808191"
                sx={{ wordBreak: "break-all" }}
              >
                Image: {propertyImage?.name}
              </Typography>
            )}
          </Stack>

          <Stack direction={"column"} gap={1} justifyContent={"center"}>
            <Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formLoading}
                sx={{
                  fontFamily: "inherit",
                  backgroundColor: "#475be8",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  padding: "10px 20px",

                  "&:hover": {
                    opacity: 0.9,
                    backgroundColor: "#475be8",
                  },
                }}
              >
                {formLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create Property"
                )}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
