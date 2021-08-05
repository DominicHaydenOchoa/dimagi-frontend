/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react'
import axios from 'axios'
import './form.css'



function Form() {
    const [email, setEmail] = useState()
    const [location, setLocation] = useState()
    const [selected, setSelected] = useState()
    const [results, setResults] = useState([])
    const [error, setError] = useState()
    let ResultText
    let CheckInPrompt

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const handleLocationButton = (e) => {
        setSelected(e)
    }

    const handleSearch = () => {
        const query = location
        const url = `http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=dimagi`
        axios.get(url).then(res => {
            const results = res.data.geonames
            setResults(results)
        }).catch(error => {
            console.log(error);
        });
    }

    const handleCheckIn = () => {

        if (!email || !selected) {
            setError('errors')
        }
        else {
            const url = 'http://127.0.0.1:8000/api/checkins/'
            const params = {
                email: email,
                city: `${selected.name}, ${selected.countryName}`,
                latitude: parseFloat(selected.lat),
                longitude: parseFloat(selected.lng)
            }

            axios.post(url, params).then(res => {
                console.log(res)
                setError('none')
            }).catch(error => {
                console.log(error);
            });
        }
    }
    
    // Conditionally render the response from geoname api call
    if (results !== 0) {
        ResultText = results.map((result) => 
            <div key={result.geonameId}>
                <input type="radio" name="location" id={result.geonameId} onClick={() => handleLocationButton(result)} />
                <label for={result.geonameId}>
                    {result.name}, {result.countryName}
                </label>
            </div>
        )
    }
    else {
        ResultText = ''
    }

    // Throw error prompt if handleCheckIn fails, else show 'Successfully Checked In!' to user
    if (error==='errors') {
        CheckInPrompt = <span className="error">Submission Error: Be sure to enter email and select location after searching</span>
    }
    else if (error==='none') {
        CheckInPrompt = <span >Successfully checked in. Thank you!</span>
    }
    else {
        CheckInPrompt = ''
    }

    return (
        <div className="form">
            <label for="fname">EMAIL:</label>
            <input onChange={handleEmailChange}/>
            <br />
            <label for="fname">LOCATION:</label>
            <input onChange={handleInputChange} />
            <button onClick={handleSearch}>Search</button>
            <br />
            <br />
            <div className="location-selection">{ResultText}</div>
            <br />
            <button onClick={handleCheckIn}>Check in</button>
            <br />
            <br />
            {CheckInPrompt}
        </div>
    )
}

export default Form
