import { Button } from "@mui/material";
import { CustomButtonProps } from "../../interfaces/common";

export default function CustomButton({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  disabled,
  handleClick,
}: CustomButtonProps) {
  return (
    <Button
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : 0,
        padding: "10px 15px",
        width: fullWidth ? "10px" : "unset",
        backgroundColor,
        color,
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
}
