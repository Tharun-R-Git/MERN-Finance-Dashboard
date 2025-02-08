import React, { useMemo, useEffect } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  Legend,
  LineChart, Bar, BarChart
} from "recharts";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";

// type Props = {};

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data, refetch, isFetching, isError } = useGetKpisQuery(undefined, {
    refetchOnMountOrArgChange: true, // Force re-fetch on mount
    refetchOnReconnect: true, // Re-fetch when reconnected
  });

  useEffect(() => {
    refetch(); // Ensure data reloads when component mounts
  }, [refetch]);

  console.log("Fetched Data:", data);
  console.log("Fetching:", isFetching, "Error:", isError);

  const revenue = useMemo(() => {
    if (!data || !data[0]?.monthlyData) return [];
    return data[0].monthlyData.map(({ month, revenue}) => ({
      name: month.substring(0, 3),
      revenue,

    }));
  }, [data]);


  const revenueExpenses = useMemo(() => {
    if (!data || !data[0]?.monthlyData) return [];
    return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue,
      expenses,
    }));
  }, [data]);

  const revenueProfit = useMemo(() => {
    if (!data || !data[0]?.monthlyData) return [];
    return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue:revenue,
      profit: (revenue-expenses).toFixed(2),
    }));
  }, [data]);
  

  return (
    <>
      <DashboardBox gridArea="a">


        {/* Handle loading and error states */}
        {/* {isFetching ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : ( */}
          <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents Revenue, bottom line represents Expenses"
          sideText="+4%"/>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={revenueExpenses}
              margin={{ top: 0, right: 5, left: -20, bottom: 15 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                tickLine={false}
                style={{ fontSize: "10px" }}
                axisLine={{ strokeWidth: "0" }}
                domain={[8000, 23000]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dot={true}
                dataKey="revenue"
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dot={true}
                dataKey="expenses"
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        {/* )} */}
      </DashboardBox>

      

      <DashboardBox gridArea="b">
                  <BoxHeader
          title="Revenue and Profit"
          sideText="+4%"/>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart

              data={revenueProfit}
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
              <Legend height={20} wrapperStyle={{
                margin: "0 0 10px 0"
              }}/>
              <Line
                type="monotone"
                yAxisId="left"
                dataKey="profit"
                stroke={palette.tertiary[500]}

              />
              <Line
                type="monotone"
                yAxisId="right"
                dataKey="revenue"
                stroke={palette.primary.main}

              />
            </LineChart>
          </ResponsiveContainer>

      </DashboardBox>
      <DashboardBox gridArea="c">
      <BoxHeader
          title="Monthly Revenue"
          subtitle="Graph representing the revenue month by month"
          sideText="+4%"/>
      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 10,
            right: 20,
            left: -5,
            bottom: 0,
          }}
        >

          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="name" axisLine={false} tickLine={false} style={{fontSize:"10px"}}/>
          <YAxis axisLine={false} tickLine={false} style={{fontSize:"10px"}}/>
          <Tooltip />

          <Bar dataKey="revenue" fill="url(#colorRevenue)" />

        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
