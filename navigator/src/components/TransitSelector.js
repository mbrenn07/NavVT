import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TransitInfo from './TransitInfo';
import { Grid, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function TransitSelector({ options, buses, busToTimes, busToColor, busToStop, displayBuses, setDisplayBuses, createBusRoutes }) {

    const [selectedTransitLines, setSelectedTransitLines] = useState([]);
    const [menuHidden, setMenuHidden] = useState();

    return (
        <>
            {menuHidden && (
                <IconButton onClick={() => setMenuHidden(!menuHidden)} sx={{ mb: -1, mx: -1, left: "calc(100% - 32px)", position: "absolute", color: "black" }}>
                    <MenuIcon />
                </IconButton>
            )}
            {!menuHidden && (<Grid container item xs={"auto"} columns={10} direction={"column"} wrap='nowrap' sx={{ mx: 1, zIndex: 100 }}>
                <Grid item xs={1}>
                    <Stack direction="row" sx={{ my: 0.5, display: "flex", maxWidth: "100%" }} >
                        <IconButton onClick={() => setMenuHidden(!menuHidden)} sx={{ mt: 2, mx: -1, mr: 0, height: 40 }}>
                            <MenuIcon />
                        </IconButton>
                        <Autocomplete
                            multiple
                            id="transit-selector"
                            fullWidth
                            sx={{ my: 1 }}
                            limitTags={2}
                            options={options}
                            onChange={(event, newValue) => {
                                setSelectedTransitLines(newValue);
                                setDisplayBuses(newValue);
                                createBusRoutes(newValue.length === 0 ? buses : buses.filter(b => newValue.includes(b.routeId)));
                            }}
                            value={selectedTransitLines}
                            renderInput={(params) => <TextField {...params} label="Filter Transit Line(s)" />}
                        />
                    </Stack>
                </Grid>
                <Grid item sx={{ width: "100%", height: "100%" }}>
                    <Box sx={{ backgroundColor: "#75787b", width: "100%", maxWidth: 350, height: "calc(100%)", mt: -.5, zIndex: 99, position: "relative" }}>
                        <TransitInfo busToTimes={busToTimes} selectedTransitLines={selectedTransitLines.length ? selectedTransitLines : options} busToColor={busToColor} busToStop={busToStop} />
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
            )}
        </>
    );
}

export default TransitSelector;
