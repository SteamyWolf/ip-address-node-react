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
        width: '200px',
        marginTop: 30
    },
    buttonDiv: {
        width: '100%',
        marginTop: 10,
        textAlign: 'center'
    },
    textField: {
        width: '100%'
    },
    red: {
        color: 'crimson'
    }
}));

const Location = () => {
    const classes = useStyles();
    const [ipAddressData, setIpAddressData] = useState({});
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [bigError, setBigError] = useState('')

    const handleInputChange = (e) => setIp(e.target.value);

    const fetchIpAddressData = async () => {
        setLoading(true);
        setFavorited(false);
        setBigError('');
        try {
            const fetchedIpAddressData = await axios.get(`https://ip-address-app-wyatt.herokuapp.com/location/${ip}`);
            console.log(fetchedIpAddressData.data)
            if (fetchedIpAddressData.data.status === 'fail') {
                setBigError(fetchedIpAddressData.data.message);
                setLoading(false)
                return;
            }
            setIpAddressData(fetchedIpAddressData.data)
            setErrorMsg('');
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const saveToFavorites = async () => {
        setLoading(true)
        try {
            if (ipAddressData.org === '') {
                setLoading(false);
                setErrorMsg('Organization Required')
            }
            const savedIP = await axios.post('https://ip-address-app-wyatt.herokuapp.com/location/saveLocation', {
                ip: ipAddressData.query,
                country: ipAddressData.country,
                city: ipAddressData.city,
                region: ipAddressData.regionName,
                timezone: ipAddressData.timezone,
                organization: ipAddressData.org
            })
            console.log(savedIP)
            setFavorited(true);
        } catch(err) {
            console.log(err)
            setFavorited(false);
        }
        setLoading(false)
    }

    return (
        <>
            {loading ? <CircularProgress /> : null}
            {bigError ? <div className={classes.red}>{bigError}</div>: null}
            <form className={classes.form}>
                <TextField className={classes.textField} placeholder="Enter IP Address here" value={ip} onChange={handleInputChange}/>
                <div className={classes.buttonDiv}>
                    <Button color="primary" variant="contained" onClick={fetchIpAddressData} disabled={!ip}>Enter</Button>
                </div>
            </form>
            {ipAddressData && Object.keys(ipAddressData).length > 0 && ipAddressData.constructor === Object ? 
                <LocationCard data={ipAddressData} saveToFavorites={saveToFavorites} errorMsg={errorMsg} favorited={favorited}/>
            : null}
        </>
    )
}

export default Location;