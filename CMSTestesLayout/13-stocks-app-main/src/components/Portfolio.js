import { get } from 'axios';
import React, { useState, } from 'react';

export default function Portfolio() {

    const [ticker, setTicker] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const access_key = '22f7bd893eabb35ec7875a31ca051a7f';

        const response = await get(`http://api.marketstack.com/v1/eod?access_key=${access_key}&symbols=${ticker}`);
        const apiResponse = response.data;
        if (Array.isArray(apiResponse['data'])) {
            const todayData = apiResponse['data'][0];
            console.log(`Ticker ${todayData['symbol']} has a day high of ${todayData['high']} on ${todayData['date']}`);
        }
    }

    return (
        <>
            <div>
                <h1>Your Portfolio</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Insert stock ticker" name="ticker" onChange={e => setTicker(e.target.value)} />
                    <input type="submit" />
                </form>
            </div>
        </>
    );
}