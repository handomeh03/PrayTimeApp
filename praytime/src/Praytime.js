import Container from '@mui/material/Container'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {  useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import MosqueIcon from '@mui/icons-material/Mosque';
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");
export default function Praytime(){
  let [praytime,setpraytime]=useState([]);
  let [dateandtime,setdateandtime]=useState(null);
  let arrayPray=praytime.map((e)=>{
    return(
        <tr style={{background:"#00695c"}}>
             <td className='names' style={{textAlign:"center",padding:"10px",fontSize:"20px",color:"white",borderRadius:"10px"}}>{e.time}</td>
            <td className='names' style={{fontSize:"20px",color:"white",borderRadius:"10px"}} key={e.id}>{e.name}</td>
           
        </tr>
    );
  })
  useEffect(()=>{
    setdateandtime(moment().format(' h:mm:ss a'));
    axios.get('https://api.aladhan.com/v1/timingsByCity?city=Amman&country=Jordan&method=2')
    .then(function (response) {
      const fajer=response.data.data.timings.Fajr;
      const duhr=response.data.data.timings.Dhuhr;
      const asr=response.data.data.timings.Asr;
      const magrb=response.data.data.timings.Maghrib;
      const isha=response.data.data.timings.Isha;
      setpraytime([{id:uuidv4(),name:" الفجر",time:fajer},{id:uuidv4(),name:"الظهر",time:duhr},{id:uuidv4(),name:"العصر",time:asr},{id:uuidv4(),name:"المغرب",time:magrb},{id:uuidv4(),name:"العشاء",time:isha}])
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])
    return(
        <Container style={{width:"400px"}}>
            <div style={{direction:"rtl",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
            <Typography  style={{color:"#eceff1"}} gutterBottom sx={{ color: 'text.secondary', fontSize: 30 }}>
          مواقيت الصلاة
        </Typography>
        <MosqueIcon style={{borderRadius:"10px",color:"#eceff1",fontSize:"40px",boxShadow:"0px 2px 4px white",padding:"2px"}}/>
       <Typography style={{color:"white",direction:"ltr"}}>{dateandtime}</Typography>
            </div>
         <Card style={{borderRadius:"10px",background:"#00897b",boxShadow:"3px 5px 20px white"}} sx={{ minWidth: 275 }}>
        <CardContent>
        <table style={{width:"100%"}}>
           {arrayPray}
        </table>
      </CardContent>
    </Card>
      </Container>
    );
}