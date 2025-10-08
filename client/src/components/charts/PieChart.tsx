import { Box, Stack, Typography } from "@mui/material";
import { Piechart } from "../../interfaces/home";
import ReactApexChart from "react-apexcharts"; // This import is correct, the issue is likely with missing type declarations.

export default function PieChart({ title, value, colors, series }: Piechart) {
  return (
    <Box
      id="chart"
      flex={1}
      display={"flex"}
      bgcolor={"#fcfcfc"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={3.5}
      py={2}
      gap={2}
      borderRadius={"15px"}
      minHeight={"110px"}
      width={"fit-content"}
      boxShadow={"0 0 10px rgba(0,0,0,0.2)"}
    >
      <Stack direction={"column"}>
        <Typography
          fontSize={14}
          color="#808191"
          sx={{ textTransform: "capitalize" }}
        >
          {title}
        </Typography>
        <Typography fontSize={24} color="#11142d" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type={"donut"}
        width={"120px"}
      />
    </Box>
  );
}
