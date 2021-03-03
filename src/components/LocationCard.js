import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActionArea, Typography, CardMedia, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions } from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import LandscapeIcon from '@material-ui/icons/Landscape';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '500px',
        margin: '0 auto',
        marginTop: 30
    },
    avatar: {
        backgroundColor: 'white'
    }
}));

const LocationCard = ( {data, saveToFavorites} ) => {
    const classes = useStyles();
    let ipAddressData = data;

    return (
        <>
            <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia>

                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                IP: <b>{ipAddressData.query}</b>
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PublicIcon style={{fill: 'blue'}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>{ipAddressData.country}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <LocationCityIcon color="secondary"/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>{ipAddressData.city}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <LandscapeIcon style={{fill: 'green'}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>{ipAddressData.regionName}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <ScheduleIcon style={{fill: 'orange'}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>{ipAddressData.timezone}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <BusinessCenterIcon style={{fill: 'purple'}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>{ipAddressData.org}</ListItemText>
                                </ListItem>
                            </List>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" startIcon={<StarBorderIcon />} onClick={saveToFavorites}>
                            Save to Favorites
                        </Button>
                    </CardActions>
                </Card>
        </>
    )
}

export default LocationCard;