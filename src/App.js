/* @flow */
import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Shift from './Shift';
import PlainText from './PlainText';
import EncryptedText from './EncryptedText';
import { StateProvider } from './context/app';

type ThemeObject = {
    spacing: (number) => string,
    palette: {
        text: {
            secondary: string
        }
    }
};

type useStylesObject = {
    paper: {
        padding: string,
        color: string,
    },
    delta: {
        padding: string,
        textAlign: string,
    }
};

type useStylesFunction = (void) => { delta: string, paper: string};

const makeStylesCb = (theme: ThemeObject) : useStylesObject => ({
    delta: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
})

const useStyles: useStylesFunction = makeStyles(makeStylesCb);

function App(): React.Node {
    const classes = useStyles();

    return (
        <StateProvider>
            <Container size="sm">
                <Typography align="center" component="h1" variant="h2" gutterBottom>
                    Caesar Cipher
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.delta} elevation={0}>
                            <Shift />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <PlainText /> 
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <EncryptedText />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </StateProvider>
  );
}

export default App;
