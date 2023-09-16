import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TransitInfo from './TransitInfo';
import { Grid } from '@mui/material';

function TransitSelector({ options, busToColor, busToStop }) {

    const [selectedTransitLines, setSelectedTransitLines] = useState([])

    return (
        <Grid container item xs={"auto"} columns={10} direction={"column"} wrap='nowrap' sx={{ mx: 1, zIndex: 100 }}>
            <Grid item xs={1}>
                <Autocomplete
                    multiple
                    id="transit-selector"
                    sx={{ mt: 1, mb: .5 }}
                    limitTags={1}
                    options={options}
                    onChange={(event, newValue) => {
                        setSelectedTransitLines(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Filter Transit Line(s)" />}
                />
            </Grid>
            <Grid item sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ backgroundColor: "#75787b", width: "100%", maxWidth: 350, height: "calc(100%)", mt: -.5, zIndex: 99, position: "relative" }}>
                    <TransitInfo selectedTransitLines={selectedTransitLines.length ? selectedTransitLines : options} busToColor={busToColor} busToStop={busToStop} />
                    <Box
                        component="img"
                        src="/NavVTLogo.png"
                        alt="NavVT Logo"
                        sx={{
                            position: 'absolute',
                            zIndex: -1,
                            bottom: 0,
                            right: 0,
                            width: "100%",
                            maxHeight: '100%'
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default TransitSelector;
