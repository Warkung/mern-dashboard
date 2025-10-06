import { useNavigate } from "react-router";
import { CustomButton } from "../components";
import { Add } from "@mui/icons-material";

export default function AllProperty() {
  const navigate = useNavigate();
  return (
    <div>
      <CustomButton
        title="Add Property"
        handleClick={() => navigate("/properties/create")}
        backgroundColor="#475be8"
        color="white"
        icon={<Add />}
      />
    </div>
  );
}
