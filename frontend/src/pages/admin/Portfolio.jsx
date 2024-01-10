import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MDEditor from '@uiw/react-md-editor';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {useState} from "react";


export default function Portfolio() {

    const [mdValue, setMdValue] = useState("**Hello, world**");

    return <Box gridAutoFlow='row' className={"Element-"}
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',

                }}
    >
        <Toolbar/>
        <MDEditor style={{marginBottom: 12}} height={460} value={mdValue} onChange={setMdValue}></MDEditor>

        <Container justifyContent={"flex-end"} spacing={3}>

            <Button variant="contained">Submit</Button>
            <Button variant="outlined" onClick={() => setMdValue("")}>Clear</Button>
        </Container>
    </Box>
}
Portfolio.componentName = "Portfolio"