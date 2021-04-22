import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import LOGO from '../../../assets/music02.svg'

export default function InterfaceCheck(props) {


    const handleMicPermission = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          console.log('You let me use your mic!')
          console.log(navigator)

        })
        .catch(function(err) {
          console.log('No mic for you!')
        });
    }

  return (
    <Grid display="flex"  container spacing={3} direction="column" style={{margin: "auto"}}>
        <Typography  alightContent="center" variant="h6" style={{margin: "auto"}}>
            InterfaceCheck
        </Typography>
        <Button onClick={handleMicPermission}>
            <img width="350" src={LOGO} />
        </Button>   
        <Typography  alightContent="center" variant="h6" style={{margin: "auto"}}>
            <a href="chrome://settings/content/microphone?search=mic" target="chrome://settings/content/microphone?search=mic" >Add interface</a>
            <a href="chrome://settings/content/microphone?search=mic" target="chrome://settings/content/microphone?search=mic" >
                chrome://settings/content/microphone?search=mic
            </a>
        </Typography>
    </Grid>
  );
}
