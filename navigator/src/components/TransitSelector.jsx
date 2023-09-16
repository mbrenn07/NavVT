import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TransitInfo from './TransitInfo';

const options = ['ABC', 'DEF', 'FGH'];  // Example options
// We will want to pass in options as a prop?, and from there filter them by name.

function TransitSelector() {

    // We will need state variable(s) to determine the currently selected TransitLine
    // We will need useEffect?

    const [selectedTransitLines, setselectedTransitLines] = useState(options[0])

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
                    setselectedTransitLines(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Select Transit Line" />}
            />
            <TransitInfo options={options} accordionsToOpen={selectedTransitLines}></TransitInfo>
        </Box>
    );
}

export default TransitSelector;
