import { Box, Stack, Typography } from "@mui/material";
import { PieChart, PropertyReferral, TotalReverue } from "../components";
import { piechartData } from "../utils/piechartData";

export default function HomePage() {
  return (
    <>
      <Typography fontSize={40} fontWeight={700} fontFamily={"Roboto"}>
        Dash Board
      </Typography>
      <Box mt={"20px"} display={"flex"} gap={4} flexWrap={"wrap"} >
        {piechartData.map((item, index) => (
          <PieChart
            key={index}
            title={item.title}
            value={item.value}
            series={item.series}
            colors={item.colors}
          />
        ))}
      </Box>
      <Stack
        mt={"25px"}
        width={"100%"}
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalReverue />
        <PropertyReferral />
      </Stack>
    </>
  );
}
