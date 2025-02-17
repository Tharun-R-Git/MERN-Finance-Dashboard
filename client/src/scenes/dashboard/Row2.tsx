import React, { useMemo } from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import BoxHeader from '@/components/BoxHeader'
import { Cell, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, ZAxis } from 'recharts'
import { LineChart, CartesianGrid, XAxis,YAxis,Tooltip,Line,Legend } from 'recharts'
import { Box, Typography, useTheme } from '@mui/material'
import FlexBetween from '@/components/FlexBetween'


const pieData = [
  {
    name: "Group A", value:600
  },
  {
    name: "Group B", value:400
  }
]


const Row2 = () => {
  const {palette} = useTheme();
  const pieColors = [palette.primary[800],palette.primary[300]];
  const {data:productData} = useGetProductsQuery();
  const {data:operationalData} = useGetKpisQuery();
  const operationalExpenses = useMemo(() => {
    if (!operationalData|| !operationalData[0]?.monthlyData) return [];
    return operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => ({
      name: month.substring(0, 3),
      "Operational Expenses":operationalExpenses,
      "Non Operational Expenses":nonOperationalExpenses
    }));
  }, [operationalData]);



  const productExpenseData = useMemo(() => {
    
    return productData&&productData.map(({ _id, price, expense }) => ({
      id: _id,
      price:price,
      expense:expense
    }));
  }, [productData]);


  console.log("data:",operationalData);
  return (
<>       <DashboardBox  gridArea="d">
          <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"/>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart

              data={operationalExpenses}
              margin={{ top: 20, right: -5, left: -15, bottom: 5 }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                yAxisId={"left"}
                orientation='left'
                tickLine={false}
                style={{ fontSize: "10px" }}
                axisLine={false}
              />
              <YAxis
                yAxisId={"right"}
                orientation="right"
                tickLine={false}
                style={{ fontSize: "10px" }}
                axisLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                yAxisId="left"
                dataKey="Non Operational Expenses"
                stroke={palette.tertiary[500]}

              />
              <Line
                type="monotone"
                yAxisId="right"
                dataKey="Operational Expenses"
                stroke={palette.primary.main}

              />
            </LineChart>
          </ResponsiveContainer>

</DashboardBox>
        <DashboardBox  gridArea="e">
          <BoxHeader title="Campaigns and Targets" sideText="+4%"/>
          <FlexBetween mt="-0.4rem" gap="1.0rem" pr="1rem">
        <PieChart width={110} height={100} 
          margin={{ top: -30, right: -10, left: 5, bottom: 0 }}>
        <Pie
          stroke = "none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} 
            fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box mt="-0.4rem" ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5">Target Sales</Typography>
          <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
          <Typography variant="h6" style={{fontSize: "7px"}} >Finance goals of the campaign that is desired</Typography>
      </Box>
      <Box flexBasis="40%" >
          <Typography mt="-0.3rem" variant="h5">Losses in Revenue</Typography>
          <Typography variant="h6" style={{fontSize: "7px"}}>Losses are down 25%</Typography>
          <Typography mt="0.3rem" variant="h5" >Profit Margins</Typography>
          <Typography variant="h6" style={{fontSize: "7px"}}>Margins are up by 30% from last month</Typography>
      </Box>
      </FlexBetween>
        </DashboardBox>
        
        <DashboardBox  gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText='+4%'/>
        <ResponsiveContainer width="100%" height="100%">

        <ScatterChart
          margin={{
            top: 15,
            right:25,
            bottom: 0,
            left: -15,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]}/>
          <XAxis type="number" dataKey="price" name="price" axisLine={false} style={{fontSize:"10px"}} tickFormatter={(v)=>`$${v}`}/>
          <YAxis type="number" dataKey="expense" name="expense" axisLine={false} style={{fontSize:"10px"}} tickFormatter={(v)=>`$${v}`}/>
          <Tooltip formatter={(v)=>`$${v}`} />
            <ZAxis type="number" range={[20]}/>
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
        </ScatterChart>
      </ResponsiveContainer>
          
      </DashboardBox></>
  )
}

export default Row2