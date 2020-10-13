import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPlayersLoadingSelector } from '../redux/playerSelector';
import { fetchPlayers, toggleSpin } from "../redux/playerSlice"
import { Button } from 'react-bootstrap';

const GetChallengers = () => {






    const InputComponent = () => {

        const dispatch = useDispatch();

        const loadingStatus = useSelector(getPlayersLoadingSelector);
        const fetchDisabled = loadingStatus === "pending";


        const fetchChallenge = () => {
            dispatch(fetchPlayers({ challengeId: id }))
        }

        const toggleSpinParam = () => {
            dispatch(toggleSpin(true))
            setSpinBtn(true)
        }
        const [id, setId] = useState();
        const [spinBtn, setSpinBtn] = useState(false);


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

    return (
        <>
            <InputComponent></InputComponent>
        </>
    );




}

export default GetChallengers;