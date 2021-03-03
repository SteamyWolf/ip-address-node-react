import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    button: {
        textDecoration: 'none',
        color: 'white'
    },
    colors: {
        color: 'green'
    }
}));



const Header = (props) => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.button}>IP Addresses</Link>
                    </Typography>
                    <Button>
                        <Link to="/favorites" className={classes.button}>Favorites</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;