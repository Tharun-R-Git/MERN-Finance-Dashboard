import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "0.7rem",
    boxShadow: "0.15rem 0.15rem 0.2rem 0.1rem rgba(0,0,0,.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch", // Ensures full width
    justifyContent: "flex-start",
    padding: "0.5rem", // Reduce padding
    gap: "0.5rem", // Reduce space between children (header & graph)
}));


export default DashboardBox;

