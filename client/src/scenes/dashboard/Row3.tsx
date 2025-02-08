import React, { useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import BoxHeader from "@/components/BoxHeader";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Cell, Pie, PieChart } from "recharts";

const Row3: React.FC = () => {
  const pieColors = ["#fff", "#eee"];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const palette = useTheme();


  const pieChartData = useMemo(() => {
    if (!kpiData || kpiData.length === 0 || !kpiData[0]?.expensesByCategory) return [];

    const totalExpenses = kpiData[0].totalExpenses || 0;
    return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => [
      { name: key, value: value as number },
      { name: `${key} of Total`, value: Math.max(totalExpenses - (value as number), 0) },
    ]);
  }, [kpiData]);

  const productColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "expense", headerName: "Expense", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value || 0}` },
    { field: "price", headerName: "Price", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value || 0}` },
  ];

  const transactionColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "buyer", headerName: "Buyer", flex: 0.67 },
    { field: "amount", headerName: "Amount", flex: 0.35, renderCell: (params: GridCellParams) => `$${params.value || 0}` },
    { field: "productIds", headerName: "Count", flex: 0.35, renderCell: (params: GridCellParams) => (Array.isArray(params.value) ? params.value.length : 0) },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productData?.length || 0} products`} />
        <Box
          mt="0.2rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": { border: "none", color: "#c2c5ce" },
            "& .MuiDataGrid-cell": { borderBottom: "1px solid #48494e !important" },
            "& .MuiDataGrid-columnHeaders": { borderBottom: "1px solid #48494e !important" },
            "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={25}
            hideFooter
            rows={(productData || []).map((product) => ({
              ...product,
              id: product._id || crypto.randomUUID(),
            }))}
            columns={productColumns}
            style={{ fontSize: 10 }}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Orders" sideText={`${transactionData?.length || 0} latest transactions`} />
        <Box
          mt="0.2rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": { border: "none", color: "#c2c5ce" },
            "& .MuiDataGrid-cell": { borderBottom: "1px solid rgb(40, 40, 44) !important" },
            "& .MuiDataGrid-columnHeaders": { borderBottom: "1px solid rgb(43, 43, 46) !important" },
            "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={25}
            hideFooter
            rows={(transactionData || []).map((transaction) => ({
              ...transaction,
              id: transaction._id || crypto.randomUUID(),
            }))}
            columns={transactionColumns}
            style={{ fontSize: 10 }}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData.length > 0 ? (
            pieChartData.map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={110} height={100}>
                  <Pie
                    stroke="none"
                    data={data}
                    innerRadius={18}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5">{data[0].name}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="h6" color="error">No Data Available</Typography>
          )}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
      <BoxHeader title="Overall Summary and Explanation Data" sideText="+15%" />
      <Box height="15px" margin="0rem 1rem 0rem 1rem"
      bgcolor="#076050"
      borderRadius="1rem">
        <Box height="15px"
              bgcolor="#0ebfa0"
              borderRadius="1rem"
              width="40%">
      </Box>
      </Box>
      <Typography margin="0 1rem" variant="h6">
      This dashboard displays expense breakdown, product listings, and transactions with visualizations for better Marketing, Development, and Operations.
      </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;


