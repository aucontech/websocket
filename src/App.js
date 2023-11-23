import './App.css';
import { useEffect,useState,useRef } from 'react';

//var socket = null;
const url ="ws://ewon-vpn.ddns.net:8200/api/ws/plugins/telemetry?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW4ubmd1eWVuQGF1Y29udGVjaC5jb20iLCJ1c2VySWQiOiJkNzkzMzMxMC04MDYzLTExZWUtODkzNC04OTVlN2NhMDhmYWIiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjJiZjM1ZjE2LWVmMWEtNGI4Zi1hNTIxLTBhMzRkOGY2MWQ2NyIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNzAwNzIyMTQ2LCJleHAiOjE3MDA3MzExNDYsImZpcnN0TmFtZSI6IlRhbiIsImxhc3ROYW1lIjoiTmd1eWVuIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImIwNTU2YzUwLTgwNjMtMTFlZS04OTM0LTg5NWU3Y2EwOGZhYiIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAifQ.lLxjzsdsRmcEp2kjSg7vy4C69gEdZHwGmUjt3Uy5U5C0jckKzSvby3bqvdtOI2lXWuvCPAFp8F87Nd3fPIVWCA";
function App() {
const ws = useRef(null);
const [data, setData] = useState([]);

useEffect(()=>{
   ws.current = new WebSocket(url);
   const unixTimeSeconds =  Date.now();
   let obj1 = {
    // attrSubCmds: [],
    // tsSubCmds: [],
    // historyCmds: [],
    entityDataCmds: [
      {
          query: {
              entityFilter: {
                  type: "singleEntity",
                  singleEntity: {
                      entityType: "DEVICE",
                      id: "8b5b0c00-837b-11ee-92c3-a7b0cea44acf"
                  }
              },
              pageLink: {
                  pageSize: 1024,
                  page: 0,
                  sortOrder: {
                      key: {
                          type: "ENTITY_FIELD",
                          key: "createdTime"
                      },
                      direction: "DESC"
                  }
              },
              entityFields: [
                  {
                      type: "ENTITY_FIELD",
                      key: "name"
                  },
                  {
                      type: "ENTITY_FIELD",
                      key: "label"
                  },
                  {
                      type: "ENTITY_FIELD",
                      key: "additionalInfo"
                  }
              ],
              latestValues: []
          },
          cmdId: 1
      }
  ],
    // entityDataUnsubscribeCmds: [],
    // alarmDataCmds: [],
    // alarmDataUnsubscribeCmds: [],
    // entityCountCmds: [],
    // entityCountUnsubscribeCmds: [],
    // alarmCountCmds: [],
    // alarmCountUnsubscribeCmds: []
   }
  let obj2 = {
    // attrSubCmds: [],
    // tsSubCmds: [],
    // historyCmds: [],
    entityDataCmds: [
      {
          cmdId: 1,
          tsCmd: {
              keys: [
                  "Tank_Pressure_AI"
              ],
              startTs: unixTimeSeconds,
              timeWindow: 61000,
              interval: 1000,
              limit: 25000,
              agg: "NONE"
          }
      }
  ],
    // entityDataUnsubscribeCmds: [],
    // alarmDataCmds: [],
    // alarmDataUnsubscribeCmds: [],
    // entityCountCmds: [],
    // entityCountUnsubscribeCmds: [],
    // alarmCountCmds: [],
    // alarmCountUnsubscribeCmds: []
  };

    ws.current.onopen = ()=>{
      console.log('WebSocket connected');
      setTimeout(() => {
        ws.current.send(JSON.stringify(obj1));
        ws.current.send(JSON.stringify(obj2))
      }, 1000);
      // if (ws.readyState === WebSocket.OPEN){
       
     // }
    
    }
  // Connection opened
ws.current.onclose = ()=>{
  console.log("close")
}
return () => {
  ws.current.close();
};

},[])



useEffect(()=>{
  ws.current.onmessage = (evt)=>{
    console.log(evt.data);
     let dataReiceive = JSON.parse(evt.data);
     console.log(dataReiceive);
     if(dataReiceive.update !== null){
      setData([...data,dataReiceive]) ;
    }
 }
    
},[data])

  return (
    <div className="App">
    


      {data.map((dt,index)=>{
        return <p key={index}>{dt.update[0].timeseries.Tank_Pressure_AI[0]?.value}</p>
      })}
    </div>
  );
}

export default App;
