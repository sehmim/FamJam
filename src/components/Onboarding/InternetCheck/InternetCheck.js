import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import LOGO from '../../../assets/music01.svg'

export default function InternetCheck(props) {

  return (
      <Grid display="flex"  container spacing={3} direction="column" style={{margin: "auto"}}>
        <Typography  alightContent="center" variant="h6" style={{margin: "auto"}}>
            Internet Check
        </Typography>
        {/* <Grid container spacing={3}> */}
        <Button>
            <a href="https://fast.com/" target="https://fast.com/">
                <img width="350" src={LOGO} />
            </a>
        </Button>
            {/* <Grid  justify="center" alignItems="center" alignContent="center" style={{margin: "auto"}}> */}
                {/* <Typography mt="20" pt="20" alignItems="center" alightContent="center" variant="p" gutterBottom>
                    Is your Speed more than 20Mbps?
                    <Grid>
                        <Button>Yes</Button>
                        <Button>NO</Button>
                    </Grid>
                </Typography> */}
            {/* </Grid> */}
        {/* </Grid> */}
      </Grid>
  );
}
