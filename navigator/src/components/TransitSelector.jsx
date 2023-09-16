import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const options = ['Option 1', 'Option 2', 'Option 3'];  // Example options
// We will want to pass in options as a prop?, and from there filter them by name.

function TransitSelector() {

    // We will need state variable(s) to determine the currently selected TransitLine
    // We will need useEffect?

    const [selectedTransitLine, setSelectedTransitLine] = useState(options[0])

    useEffect(() => {
        console.log(selectedTransitLine);
    }, [selectedTransitLine]
    ); // useEffect to test that autocompletes are set up and also to make sure I remember! 


    return (
        <Autocomplete
            id="transit-selector"
            sx={{width: 250, mt: .5}}
            options={options}
            onChange={(event, newValue) => {
                setSelectedTransitLine(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Select Transit Line" />}
        />
        // Once an option is selected, we will call our TransitInfo component.
    );
}

export default TransitSelector;
