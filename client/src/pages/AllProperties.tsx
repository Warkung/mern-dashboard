import { Box, Typography } from "@mui/material";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router";
import { PropertyCard } from "../components";
import PropertyCardV2 from "../components/common/propertyCardV2";

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
        {allProperties.map(
          ({
            _id: id,
            title,
            description,
            price,
            propertyType,
            location,
            photo,
          }) => (
            // <PropertyCardV2
            //   key={id}
            //   id={id as string}
            //   title={title}
            //   description={description}
            //   propertyType={propertyType}
            //   price={price}
            //   location={location}
            //   photo={photo}
            // />
            <PropertyCard
              key={id}
              id={id as string}
              title={title}
              description={description}
              price={price}
              propertyType={propertyType}
              location={location}
              photo={photo}
            />
          )
        )}
      </Box>
    </Box>
  );
}
