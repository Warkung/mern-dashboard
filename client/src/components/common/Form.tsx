import {
  Box,
  FormControl,
  TextField,
  Typography,
  Stack,
  autocompleteClasses,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { FormProps } from "../../interfaces/common";

const itemForSelect = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "farmhouse", label: "Farmhouse" },
  { value: "condos", label: "Condos" },
  { value: "townhouse", label: "Townhouse" },
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
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        sx={{ textTransform: "capitalize" }}
      >
        {type} a property
      </Typography>

      <Box mt={2.5} borderRadius={"15px"} padding={"20px"}>
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
            label="Enter property name"
            // {...register("title", { required: true })}
          />
          <TextField
            fullWidth
            required
            color="info"
            label="Enter property description"
            multiline
            rows={5}
            // {...register("description", { required: true })}
          />

          <Stack direction={"row"} gap={4}>
            <FormControl sx={{ flex: 1 }}>
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
                // {...register("propertyType", { required: true })}
              >
                <MenuItem value="" disabled>
                  <em>Select Property Type</em>
                </MenuItem>
                {itemForSelect.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
