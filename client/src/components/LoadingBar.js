import Stack from "@mui/material/Stack";
import {LinearProgress} from "@mui/material";
import * as React from 'react';

export default function LoadingBar() {
    return (
        <Stack sx={{width: '100%', color: '#DF7861'}}>
            <LinearProgress color="inherit"/>
        </Stack>
    )
}