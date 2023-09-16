import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TransitInfo from './TransitInfo';

function TransitSelector({ options }) {

    // We will need state variable(s) to determine the currently selected TransitLine
    // We will need useEffect?

    const [selectedTransitLines, setSelectedTransitLines] = useState([])

    useEffect(() => {
        console.log(selectedTransitLines);
    }, [selectedTransitLines]
    ); // useEffect to test that autocompletes are set up and also to make sure I remember! 


    return (
        <Box>
            <Autocomplete
                multiple
                id="transit-selector"
                sx={{ width: 250, mt: .5, }}
                limitTags={1}
                options={options}
                onChange={(event, newValue) => {
                    setSelectedTransitLines(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Filter Transit Line(s)" />}
            />
            <TransitInfo selectedTransitLines={selectedTransitLines.length ? selectedTransitLines : options} >
            </TransitInfo>
        </Box>
    );
}

export default TransitSelector;
