/* @flow */
import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { encrypt } from './utils/index'
import Shift from './Shift';
import PlainText from './PlainText';
import EncryptedText from './EncryptedText';

const { useState, useEffect } = React;

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
    const [text: string, setText] = useState('');
    const [encrypted: string, setEncrypted] = useState('');
    const [delta: number, setDelta] = useState(0);

    const handleDeltaChange = (e: SyntheticInputEvent<HTMLSelectElement>) : void => {
        const value = Number.parseInt(e.target.value, 10);
        setDelta(value);
    }

    const handleTextChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        setText(value);
        setEncrypted(encrypt(value, delta));
    }

    const handleEncryptedChange = (e: SyntheticInputEvent<HTMLInputElement>) : void => {
        const { value } = e.target;
        setEncrypted(value);
        setText(encrypt(value, delta));
    }

    // Reset Text and Encrypted if we change the delta
    useEffect(() => {
        setText('')
        setEncrypted('')
    }, [delta])

    return (
        <Container size="sm">
            <Typography align="center" component="h1" variant="h2" gutterBottom>
                Caesar Cipher
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.delta} elevation={0}>
                        <Shift value={delta} onChange={handleDeltaChange}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <PlainText value={text} onChange={handleTextChange}/> 
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <EncryptedText value={encrypted} onChange={handleEncryptedChange}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  );
}

export default App;
