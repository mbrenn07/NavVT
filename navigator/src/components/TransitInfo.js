import React, { useState } from 'react';
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
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


function TransitInfo({ selectedTransitLines, busToColor, busToStop, tripToTimes, busToTrips, buses }) {

    return (
        <Box sx={{ overflow: "auto", height: "100%", width: 350 }}>
            {selectedTransitLines.map((option, index) => {
                const bus = buses.filter((bus) => bus.routeId === option);
                return (
                    <Accordion key={index} disableGutters sx={{ backgroundColor: "#861F41" }} TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <DirectionsBusIcon sx={{ color: busToColor[option], filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))", outlineWidth: "1px" }}></DirectionsBusIcon>
                            <Typography sx={{ ml: 1 }} >{" " + option + " Schedule"}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ margin: 0 }}>
                            {busToTrips[option] && busToTrips[option].map((trip, index) => { //NOSONAR
                            const startTime = new Date(tripToTimes[trip]?.[0].CalculatedDepartureTime[0]["_text"]);
                            const endTime = new Date(tripToTimes[trip]?.[tripToTimes[trip].length - 1].CalculatedDepartureTime[0]["_text"]);
                            const currentTime = new Date();
                                if (endTime.getTime() > currentTime.getTime()) {
                                    return (
                                        <Accordion disableGutters sx={{ backgroundColor: "#861F41" }} TransitionProps={{ unmountOnExit: true }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${index}-content`}
                                                id={`panel${index}-header`}
                                            >
                                                <Typography sx={{ ml: 1 }} >{(startTime.getHours() % 12 === 0 ? "12" : startTime.getHours() % 12) + ":" + (startTime.getMinutes() < 10 ? "0" : "") + startTime.getMinutes() + (startTime.getHours() >= 12 ? " PM" : " AM") + " - " + (endTime.getHours() % 12 === 0 ? "12" : endTime.getHours() % 12) + ":" + (endTime.getMinutes() < 10 ? "0" : "") + endTime.getMinutes() + (endTime.getHours() >= 12 ? " PM" : " AM")}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ margin: 0 }}>
                                                {busToStop[option] && (
                                                    <Timeline position="alternate-reverse">
                                                        {Array.from(busToStop[option]).map((stop, index) => {
                                                            if (tripToTimes[trip]?.[index]?.CalculatedDepartureTime) {
                                                                const time = new Date(tripToTimes[trip][index].CalculatedDepartureTime[0]["_text"]);
                                                                const adjustedTime = new Date(time.getTime() + (0 * 60 * 60 * 1000));
                                                                let busWasAtStop = false;
                                                                if ((bus[0].stopId == stop.stopCode && bus[0].gtfsTripId == trip)
                                                                    || (bus[1]?.stopId == stop.stopCode && bus[1]?.gtfsTripId == trip)) {
                                                                    busWasAtStop = true
                                                                }
                                                                return (
                                                                    <TimelineItem>
                                                                        <TimelineOppositeContent color="text.secondary">
                                                                            {(adjustedTime.getHours() % 12 === 0 ? "12" : adjustedTime.getHours() % 12) + ":" + (adjustedTime.getMinutes() < 10 ? "0" : "") + adjustedTime.getMinutes() + (adjustedTime.getHours() >= 12 ? " PM" : " AM")}
                                                                        </TimelineOppositeContent>
                                                                        <TimelineSeparator>
                                                                            {busWasAtStop && stop.isTimePoint === "N" && (
                                                                                <TimelineDot color='primary' />

                                                                            )}
                                                                            {!busWasAtStop && stop.isTimePoint === "N" && (
                                                                                <TimelineDot variant="outlined" />

                                                                            )}
                                                                            {busWasAtStop && stop.isTimePoint === "Y" && (
                                                                                <TimelineDot>
                                                                                    <AccessTimeIcon color='secondary' />
                                                                                </TimelineDot>
                                                                            )}
                                                                            {!busWasAtStop && stop.isTimePoint === "Y" && (
                                                                                <TimelineDot>
                                                                                    <AccessTimeIcon />
                                                                                </TimelineDot>
                                                                            )}

                                                                            <TimelineConnector />
                                                                        </TimelineSeparator>
                                                                        <TimelineContent sx={{ overflowWrap: "anywhere" }}>{stop.patternPointName}</TimelineContent>
                                                                    </TimelineItem>
                                                                );
                                                            }
                                                        })}
                                                    </Timeline>)}
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                            })}
                        </AccordionDetails>
                    </Accordion>
                )
            }
            )}
        </Box>
    )

}


export default TransitInfo;