import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { TotalRevenueSeries, TotalRevenueOptions } from "./ChartConfig";

export default function TotalReverue() {
  return (
    <Box
      display={"flex"}
      flex={1}
      flexDirection={"column"}
      p={4}
      bgcolor={"#fcfcfc"}
      borderRadius={"15px"}
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Revernue
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} my={"20px"} gap={4}>
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          $235,700
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: "25px", color: "#475be8" }} />
          <Stack>
            <Typography fontSize={15} color="#475be8">
              0.8%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        options={TotalRevenueOptions}
        type="bar"
        height={310}
      />
    </Box>
  );
}
