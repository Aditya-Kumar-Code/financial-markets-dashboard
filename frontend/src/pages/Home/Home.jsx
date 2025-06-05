import './App.css';
import { useState } from 'react';
import Header from '../../components/Header';

let Data;
let j = await fetch('http://127.0.0.1:8000/companies-list')
  .then(response => response.json())
  .then(data => {
    Data = data;
  });

function App() {
  
  const [map_data, setmap_data] = useState(Data)

  function searchdata(e) {
    var i, td, filter, txtValue;
    filter = e.target.value.toUpperCase();
    var show_datas = []
    for (i = 0; i < Data.length; i++) {
      td = Data[i];
      if (td) {
        txtValue = td.security_name;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          show_datas.push(Data[i])
        }
      }
    }
    var arr = show_datas.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) === index;
    });
    if (show_datas) {
      setmap_data(arr)
    }
  }

  return (
    <>
     <Header/> 
    <div className="box">
      
      <div>
        
        <div className="container-1">
          <p>Search Stocks Here</p>
          <input id="search-button" type="search" onChange={searchdata}></input>
        </div>
        <div>
          {map_data.map((e) => (
            <div key={e.id} className="map-data">
              
              <div>
                <p className=''>{e.security_name}</p>
              </div>
            </div>
          )
          )}
          </div>
        </div>
    </div>
    </>
    
  );
}

export default App;