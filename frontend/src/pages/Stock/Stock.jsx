import Header from '../../components/Header';
import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import './Stock.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Stock()
{
    const [data, setData] = useState([]);
    const [funddata, setFunddata] = useState([]);
    const {stock_name}=useParams();
    
    useEffect(() => {
        const fetchStockData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/stock-data/${stock_name}`);
            const jsonData = await response.json();

            
            const formattedData = jsonData.map(item => ({
            Date: item.Date,
            Close: parseFloat(item.Close)
            }));

            setData(formattedData);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
        };
        const fetchfunddata=async ()=>{
            try {
                const response = await fetch(`http://127.0.0.1:8000/stock-fundamental/5paisa`);
                console.log(response.status);
                const jsonData = await response.json();
                console.log(jsonData);
                
                const formattedData = jsonData.map(formatitem => ({
                    market:formatitem.market,
                    enterprise:formatitem.enterprise,
                    noofshares: formatitem.noofshares,
                    pe: formatitem.pe,
                    pb:formatitem.pb,
                    facevalue: formatitem.facevalue,
                    divyield:formatitem.divyield,
                    bookvalue:formatitem.bookvalue,
                    cash: formatitem.cash,
                    debt: formatitem.debt,
                    promoterholding: formatitem.promoterholding,
                    eps: formatitem.eps,
                    salesgrowth: formatitem.salesgrowth,
                    roe: formatitem.roe,
                    roce: formatitem.roce,
                    profitgrowth:formatitem.profitgrowth
                }));
    
                setFunddata(formattedData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        }
        fetchfunddata();
        fetchStockData();
    }, []);
    return (

        <>
        <Header/>
        
        <div className="mycontainer">
            <div className="stock-fundamental">
            {funddata.map((ei) => (
                <>
              <p>Market Cap :{ei.market}</p>
              <p>enterprise : {ei.enterprise}</p>
              <p>no of shares : {ei.noofshares}</p>
              <p>pe: {ei.pe}</p>
              <p>pb :{ei.pb}</p>
              <p>Face Value : {ei.facevalue}</p>
              <p>Div Yield : {ei.divyield}</p>
              <p>Book Value : {ei.bookvalue}</p>
              <p>cash : {ei.cash}</p>
              <p>debt : {ei.debt}</p>
              <p>promoterholding : {ei.promoterholding}</p>
              <p> eps : {ei.eps}</p>

              </>
          )
          )}
                
                
            </div>
            <div className="stock-graph">
                <h1>Graph</h1>
            
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                        type="monotone"
                        dataKey="Close"
                        stroke="#8884d8"
                        connectNulls={true}
                        strokeDasharray="0" 
                        />
                        <Line
                        type="monotone"
                        dataKey="Volume"
                        stroke="#82ca9d"
                        connectNulls={true}
                        strokeDasharray="0" 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        </>
    )
}

export default Stock;