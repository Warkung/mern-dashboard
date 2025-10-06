import {
  Box,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  TextField,
  styled,
  Typography,
} from "@mui/material";
import { FormProps } from "../../interfaces/common";

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
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px;
    color: ${theme.palette.text.primary};
    border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#E0E0E0"};
    
    &:focus, &:focus-visible {
      border-color: ${theme.palette.info.main};
      box-shadow: 0 0 0 2px ${theme.palette.info.light};
      outline: 0;
    }
  `
  );

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
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              // {...register("title", { required: true })}
            />
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
              }}
            >
              Enter property description
            </FormHelperText>
            <StyledTextarea
              minRows={5}
              required
              placeholder="Please insert description"
              // {...register("description", { required: true })}
            />
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}
