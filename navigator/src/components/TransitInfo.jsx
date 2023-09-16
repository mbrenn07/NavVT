import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function TransitInfo({ options, accordionsToOpen }) {
    // Take in all the options (buses)
    // the accordionsToOpen is the selectedTransitLines from the TransitSelector component
    // have a useEffect that checks when accordionsToOpen changes, and open the accordions as needed. 

    return (
        <Box>
            {options.map((option, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography>{option + " Info"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {option}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )

}


export default TransitInfo;