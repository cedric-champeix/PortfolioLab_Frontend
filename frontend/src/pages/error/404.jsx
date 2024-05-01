import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NotFoundPage() {
    return <Box sx={{margin: "50px 10%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h1" color="primary">404 - Not Found</Typography>
        <Typography variant="body1">The page you're looking for does not exist.</Typography>
    </Box>
};