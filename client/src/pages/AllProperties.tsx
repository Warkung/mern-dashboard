import { Box, Typography } from "@mui/material";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router";
import { PropertyCard } from "../components";

export default function AllProperties() {
  const navigate = useNavigate();
  const {
    tableQuery: { data, isLoading, isError },
    currentPage,
    setCurrentPage,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable();

  const currentPrice = sorters.find((item) => item.field === "price")?.order;

  const allProperties = data?.data ?? [];
  isLoading && <Typography>Loading...</Typography>;
  isError && <Typography>Error!!!</Typography>;

  return (
    <Box>
      <Box mt={"20px"} display={"flex"} flexWrap={"wrap"} gap={3}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            price={property.price}
            photo={property.photo}
          ></PropertyCard>
        ))}
      </Box>
      
    </Box>
  );
}
