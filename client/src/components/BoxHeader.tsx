import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  sideText: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const theme = useTheme(); // Get MUI theme
  const palette = theme.palette; // Access color palette

  return (
    <FlexBetween color={palette.grey[400]} margin="0.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="0.1rem">
            {title}
          </Typography>
          {subtitle && <Typography variant="h6">{subtitle}</Typography>}
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight={700} color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
