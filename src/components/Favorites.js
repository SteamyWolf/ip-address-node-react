import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, CardActionArea, Typography, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions, IconButton } from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import LandscapeIcon from '@material-ui/icons/Landscape';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const useStyles = makeStyles((theme) => ({
    ipData: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    card: {
        width: '500px',
        margin: '0 auto',
        marginTop: 30,
        position: 'relative'
    },
    editIcon: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0
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
    },
    textFieldCenter: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const Favorites = () => {
    const classes = useStyles();
    const [ipAddressData, setIpAddressData] = useState([])
    const [loading, setLoading] = useState(false);
    const [editingFavorite, setEditingFavorite] = useState(
        {
            ip: '',
            country: '',
            city: '',
            region: '',
            timezone: '',
            organization: ''
        }
    )

    const fetchFavorites = async () => {
        try {
            const fetchedFavorites = await axios.get('http://localhost:3000/location/favorites')
            console.log(fetchedFavorites)
            let mappedFavorites = fetchedFavorites.data.map(favorite => ({editing: false, ...favorite}))
            console.log(mappedFavorites)
            setIpAddressData(mappedFavorites)
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
            ipAddressData.splice(index, 1)
            setIpAddressData(ipAddressData)
        }
        setLoading(false);
    }

    const onEditClick = (id) => {
        let foundFavorite = ipAddressData.find(favorite => favorite._id === id)
        setEditingFavorite(foundFavorite)
        foundFavorite.editing = !foundFavorite.editing;
        let index = ipAddressData.findIndex(element => element._id === foundFavorite._id)
        let newAddressData = [...ipAddressData]
        newAddressData.splice(index, 1, foundFavorite)
        setIpAddressData(newAddressData)
    }

    const saveChanges = async (id) => {
        console.log(editingFavorite, id)
        let updated = await axios.put(`http://localhost:3000/location/put`, editingFavorite);
        console.log(updated)
    }

    const onChanges = (event, string, id) => {
        if (string === 'ip') {
            setEditingFavorite({...editingFavorite, ip: event.target.value})
            // console.log(editingFavorite)
        } else if (string === 'country') {
            setEditingFavorite({...editingFavorite, country: event.target.value})
            // console.log(editingFavorite)
        } else if (string === 'city') {
            setEditingFavorite({...editingFavorite, city: event.target.value})
            // console.log(editingFavorite)
        } else if (string === 'region') {
            setEditingFavorite({...editingFavorite, region: event.target.value})
            // console.log(editingFavorite)
        } else if (string === 'timezone') {
            setEditingFavorite({...editingFavorite, timezone: event.target.value})
            // console.log(editingFavorite)
        } else if (string === 'organization') {
            setEditingFavorite({...editingFavorite, organization: event.target.value})
            // console.log(editingFavorite)
        } else {
            console.log('ERROR!!!')
        }
        
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
                            <IconButton className={classes.editIcon} onClick={() => onEditClick(ipAddress._id)}>
                                <EditIcon  />
                            </IconButton>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {!ipAddress.editing ? <div>IP: <b>{ipAddress.ip}</b></div> :   
                                                <div className={classes.textFieldCenter}>
                                                    IP: <TextField type="text" defaultValue={ipAddress.ip} variant="outlined" onChange={(e) => onChanges(e, 'ip', ipAddress._id)} />
                                                </div>
                                            }
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <PublicIcon style={{fill: 'blue'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {!ipAddress.editing ? ipAddress.country : 
                                                        <div>
                                                            <TextField variant="outlined" defaultValue={ipAddress.country} onChange={(e) => onChanges(e, 'country', ipAddress._id)} />
                                                        </div>
                                                    }
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <LocationCityIcon color="secondary"/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {!ipAddress.editing ? ipAddress.city : 
                                                        <div>
                                                            <TextField variant="outlined" defaultValue={ipAddress.city} onChange={(e) => onChanges(e, 'city', ipAddress._id)} />
                                                        </div>
                                                    }
                                                    </ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <LandscapeIcon style={{fill: 'green'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {!ipAddress.editing ? ipAddress.region :
                                                        <div>
                                                            <TextField variant="outlined" defaultValue={ipAddress.region} onChange={(e) => onChanges(e, 'region', ipAddress._id)} />
                                                        </div>
                                                    }
                                                    </ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <ScheduleIcon style={{fill: 'orange'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {!ipAddress.editing ? ipAddress.timezone :
                                                        <div>
                                                            <TextField variant="outlined" defaultValue={ipAddress.timezone} onChange={(e) => onChanges(e, 'timezone', ipAddress._id)} />
                                                        </div>
                                                    }
                                                    </ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}>
                                                        <BusinessCenterIcon style={{fill: 'purple'}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {!ipAddress.editing ? ipAddress.organization :
                                                        <div>
                                                            <TextField variant="outlined" defaultValue={ipAddress.organization} onChange={(e) => onChanges(e, 'organization', ipAddress._id)} />
                                                        </div>
                                                    }
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {!ipAddress.editing ?
                                        <Button size="small" color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteIP(ipAddress._id)}>
                                            Delete
                                        </Button>
                                    : 
                                        <Button size="small" color="primary" variant="contained" startIcon={<SaveAltIcon />} onClick={() => saveChanges(ipAddress._id)}>Save Changes</Button>
                                    }
                                </CardActions>
                            </Card>
                    )
                })} 
        </div>
            
        </>
    )
}

export default Favorites;