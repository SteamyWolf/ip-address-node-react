import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import LocationCard from './LocationCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
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
    },
}));

const Location = () => {
    const classes = useStyles();
    const [ipAddressData, setIpAddressData] = useState({});
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);

    const handleInputChange = (e) => setIp(e.target.value);

    const fetchIpAddressData = async () => {
        setLoading(true);
        setFavorited(false);
        try {
            const fetchedIpAddressData = await axios.get(`http://localhost:3000/location/${ip}`);
            console.log(fetchedIpAddressData.data)
            setIpAddressData(fetchedIpAddressData.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const saveToFavorites = async () => {
        setLoading(true)
        try {
            setFavorited(true);
            const savedIP = await axios.post('http://localhost:3000/location/saveLocation', {
                ip: ipAddressData.query,
                country: ipAddressData.country,
                city: ipAddressData.city,
                region: ipAddressData.regionName,
                timezone: ipAddressData.timezone,
                organization: ipAddressData.org
            })
            console.log(savedIP)
        } catch(err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <>
            {loading ? <CircularProgress /> : null}
            <form className={classes.form}>
                <TextField className={classes.textField} placeholder="Enter IP Address here" value={ip} onChange={handleInputChange}/>
                <div className={classes.buttonDiv}>
                    <Button color="primary" variant="contained" onClick={fetchIpAddressData} disabled={!ip}>Enter</Button>
                </div>
            </form>
            {ipAddressData && Object.keys(ipAddressData).length > 0 && ipAddressData.constructor === Object ? 
                <LocationCard data={ipAddressData} saveToFavorites={saveToFavorites} favorited={favorited}/>
            : null}
        </>
    )
}

export default Location;