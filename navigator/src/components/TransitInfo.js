import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBusTwoTone';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


function TransitInfo({ selectedTransitLines, busToColor, busToStop }) {

    return (
        <Box sx={{ overflow: "auto", height: "100%" }}>
            {selectedTransitLines.map((option, index) => (
                <Accordion key={index} disableGutters sx={{ backgroundColor: "#861F41" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <DirectionsBusIcon sx={{ color: busToColor[option], filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))", outlineWidth: "1px" }}></DirectionsBusIcon>
                        <Typography sx={{ ml: 1 }} >{" " + option + " Schedule"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ margin: 0 }}>
                        {busToStop[option] && (
                            <Timeline position="alternate-reverse">
                                {Array.from(busToStop[option]).map((stop) => {
                                    return (
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                {stop.isTimePoint === "Y" && (
                                                    <TimelineDot>
                                                        <AccessTimeIcon />
                                                    </TimelineDot>
                                                )}
                                                {stop.isTimePoint === "N" && (
                                                    <TimelineDot variant="outlined" />

                                                )}
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ overflowWrap: "anywhere" }}>{stop.patternPointName}</TimelineContent>
                                        </TimelineItem>
                                    );
                                })}
                            </Timeline>)}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )

}


export default TransitInfo;