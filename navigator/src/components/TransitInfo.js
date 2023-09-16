import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function TransitInfo({ selectedTransitLines }) {

    return (
        <Box sx={{ overflow: "auto", height: "100%" }}>
            {selectedTransitLines.map((option, index) => (
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