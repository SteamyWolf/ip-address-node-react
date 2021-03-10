import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActionArea, Typography, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions } from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import LandscapeIcon from '@material-ui/icons/Landscape';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    ipData: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    card: {
        width: '500px',
        margin: '0 auto',
        marginTop: 30
    },
    avatar: {
        backgroundColor: 'white'
    },
    form: {
        margin: '0 auto',
        width: '200px'
    },
    buttonDiv: {
        width: '100%',
        marginTop: 10,
        textAlign: 'center'
    },
    textField: {
        width: '100%'
    }
}));

const Favorites = () => {
    const classes = useStyles();
    const [ipAddressData, setIpAddressData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchFavorites = async () => {
        try {
            const fetchedFavorites = await axios.get('http://localhost:3000/location/favorites')
            console.log(fetchedFavorites)
            setIpAddressData(fetchedFavorites.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchFavorites();
    }, [])

    const deleteIP = async (ip) => {
        setLoading(true);
        let deletion = await axios.delete(`http://localhost:3000/location/delete/${ip}`);
        console.log(deletion)
        let index = ipAddressData.findIndex(address => address._id === deletion.data._id)
        console.log(index)
        if (ipAddressData.length === 1) {
            setIpAddressData([])
        } else {
            setIpAddressData(ipAddressData.splice(index, 1))
        }
        setLoading(false);
    }

    return (
        <>
        {loading ?
            <div className="test">
                <CircularProgress />
            </div>
        : null}
       
        <div className={classes.ipData}>
            {ipAddressData.map(ipAddress => {
                    return (
                        <Card className={classes.card} key={ipAddress._id}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            IP: <b>{ipAddress.ip}</b>
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <PublicIcon style={{fill: 'blue'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{ipAddress.country}</ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <LocationCityIcon color="secondary"/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{ipAddress.city}</ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <LandscapeIcon style={{fill: 'green'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{ipAddress.region}</ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <ScheduleIcon style={{fill: 'orange'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{ipAddress.timezone}</ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <BusinessCenterIcon style={{fill: 'purple'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{ipAddress.organization}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteIP(ipAddress._id)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                    )
                })} 
        </div>
            
        </>
    )
}

export default Favorites;