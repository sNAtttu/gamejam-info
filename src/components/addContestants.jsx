import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPlayersLoadingSelector } from '../redux/playerSelector';
import { fetchPlayers, toggleSpin } from "../redux/playerSlice"
import { Button } from 'react-bootstrap';

const GetChallengers = () => {



    const dispatch = useDispatch();
    const [id, setId] = useState();
    const loadingStatus = useSelector(getPlayersLoadingSelector);
    const fetchDisabled = loadingStatus === "pending";
    const [spinBtn, setSpinBtn] = useState(false);

    const fetchChallenge = () => {
        dispatch(fetchPlayers({ challengeId: id }))
    }

    const toggleSpinParam = () => {
        dispatch(toggleSpin(true))
        setSpinBtn(true)
    }


    return (
        <>

            <div className="column">
                <label>FETCH</label>
                <input type="number" onChange={e => setId(e.target.value)}></input>
                <Button type="button" disabled={fetchDisabled} name="FETCH" onClick={fetchChallenge}>Update</Button>
                <Button type="button" disabled={spinBtn} name="SPIN" onClick={toggleSpinParam}>Stop</Button>
            </div>



        </>
    )


}

export default GetChallengers;