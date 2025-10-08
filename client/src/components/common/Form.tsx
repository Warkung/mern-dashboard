import {
  Box,
  Button,
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
import CustomButton from "./CustomButton";

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
  onFinish,
  formLoading,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  PropertyImages,
}: FormProps) {
  return (
    <Box
      border={"1px solid #524c4cff"}
      margin={"auto"}
      width={{ lg: "70%", md: "80%", xs: "90%" }}
      padding={{ lg: "20px", md: "10px", xs: "10px" }}
      boxShadow={"0 0 10px rgba(0,0,0,0.1)"}
      borderRadius={2}
    >
      <Typography
        fontSize={25}
        fontWeight={700}
        sx={{ textTransform: "capitalize" }}
      >
        {type} a property
      </Typography>

      <Box mt={2.5} borderRadius={"15px"}>
        <form
          action=""
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          // onSubmit={handleSubmit(onFinishHandler)}
        >
          <TextField
            fullWidth
            required
            color="info"
            label="Property name"
            // {...register("title", { required: true })}
          />
          <TextField
            fullWidth
            required
            color="info"
            label="Property description"
            multiline
            rows={5}
            // {...register("description", { required: true })}
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
                // {...register("propertyType", { required: true })}
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
                // {...register("price", { required: true })}
              />
            </Stack>
          </Stack>
          <TextField
            fullWidth
            required
            color="info"
            label="Location"
            // {...register("location", { required: true })}
          />

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography fontSize={16} fontWeight={500} my="10px">
                Property Photo
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                <PhotoCamera sx={{ marginRight: "8px" }} />
                Upload
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
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {PropertyImages?.name || "No file selected"}
            </Typography>
          </Stack>

          <Stack direction={"column"} gap={1} justifyContent={"center"}>
            <Stack>
              <CustomButton
                type={type}
                title={formLoading ? "Submitting..." : "Submit"}
                backgroundColor="#475be8"
                color="white"
              />
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
