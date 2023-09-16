import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function TransitInfo({ selectedTransitLines }) {

    return (
        <Box sx={{ overflow: "auto", height: "100%" }}>
            {selectedTransitLines.map((option, index) => (
                <Accordion key={index} disableGutters sx={{ backgroundColor: "darkgrey" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <DirectionsBusIcon></DirectionsBusIcon>
                        <Typography sx={{ color: "white" }}>{option + " Info"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ margin: 0 }}>
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