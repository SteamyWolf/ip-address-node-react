# How to start with this project
To run, download the project from GitHub and use `npm start` in an open terminal to start the project and view the code on a live dev server. Or, you can visit https://ip-address-collection.netlify.app/ to test out the app right now and save some of your favorite IP's.

The server is live on heroku and does not require any configuration on your end. The server is currently live and can be tested all through this application by performing one of the actions below:

# Creating the IP Address:
I first made a card that displays the data returned from the NodeJS server which calls and api: `http://ip-api.com/json/${req.params.ip}`.
This looks like:
```javascript
const fetchIpAddressData = async () => {
        setLoading(true);
        setFavorited(false);
        setBigError('');
        try {
            const fetchedIpAddressData = await axios.get(`https://ip-address-app-wyatt.herokuapp.com/location/${ip}`);
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
```
You can see how I use axios to get the data from the heroku site server.
I call the `LocationCard` Component to display the data returned:
```javascript
<LocationCard data={ipAddressData} saveToFavorites={saveToFavorites} errorMsg={errorMsg} favorited={favorited}/>
```

# Saving the data to the server (Favorited):
From the `LoctionCard` component I call a function located in its parent component that executes the `saveToFavorites` function which looks like this:
```javascript
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
            setFavorited(true);
        } catch(err) {
            setFavorited(false);
        }
        setLoading(false)
    }
```
Notice how it calls a post to the heroku site to save that data.

# Displaying the Favorites
I get the data for the favorites on page load by calling the `fetchFavorites` function and using the useEffect hook to call it:
```javascript
const fetchFavorites = async () => {
        try {
            const fetchedFavorites = await axios.get('https://ip-address-app-wyatt.herokuapp.com/location/favorites')
            let mappedFavorites = fetchedFavorites.data.map(favorite => ({editing: false, ...favorite}))
            setIpAddressData(mappedFavorites)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchFavorites();
    }, [])
```
With the data returned, I call the LocationCard for each element in the array thus creating a list of cards with the correct data in it.

# Editing the cards
This was tricky as I had to show the input boxes for only a specific card and then grab those values if they have changed and then submit it to the server as a put:
```javascript
 const saveChanges = async (id) => {
        let updated = await axios.put(`https://ip-address-app-wyatt.herokuapp.com/location/put`, editingFavorite);
        let oldFavorite = ipAddressData.find(favorite => favorite._id === id);
        let indexOfOldFavorite = ipAddressData.findIndex(element => element._id === oldFavorite._id)
        let newIP = [...ipAddressData]
        let returnedFavorite = {editing: false, ...updated.data};
        newIP.splice(indexOfOldFavorite, 1, returnedFavorite)
        setIpAddressData(newIP)
    }
```
I had to update the client side as well after it had been saved to the back end.

Getting the correct changes:
```javascript
const onChanges = (event, string, id) => {
        if (string === 'ip') {
            setEditingFavorite({...editingFavorite, ip: event.target.value})
        } else if (string === 'country') {
            setEditingFavorite({...editingFavorite, country: event.target.value})
        } else if (string === 'city') {
            setEditingFavorite({...editingFavorite, city: event.target.value})
        } else if (string === 'region') {
            setEditingFavorite({...editingFavorite, region: event.target.value})
        } else if (string === 'timezone') {
            setEditingFavorite({...editingFavorite, timezone: event.target.value})
        } else if (string === 'organization') {
            setEditingFavorite({...editingFavorite, organization: event.target.value})
        } else {
            console.log('ERROR!!!')
        } 
    }
```

# Deleting the Card
```javascript
const deleteIP = async (ip) => {
        setLoading(true);
        let deletion = await axios.delete(`https://ip-address-app-wyatt.herokuapp.com/location/delete/${ip}`);
        let index = ipAddressData.findIndex(address => address._id === deletion.data._id)
        if (ipAddressData.length === 1) {
            setIpAddressData([])
        } else {
            ipAddressData.splice(index, 1)
            setIpAddressData(ipAddressData)
        }
        setLoading(false);
    }
```
Similar to the edit but was easier since all I had to do was update the array that had all the IP Address data by splicing the deleted IP Card out of it by using its index.