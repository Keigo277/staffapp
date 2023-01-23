
import {useState,useEffect,useContext,useRef} from 'react'
import {Link,useParams} from 'react-router-dom'
import{ChevronLeft}from '@mui/icons-material'
import {AppBar,Box,Toolbar,IconButton,Typography,Button,Avatar,Badge,Grid,Card,CardMedia,CardContent,CardActions,Stack} from '@mui/material'
import { display, fontSize, fontWeight } from '@mui/system'

import {db} from '../firebase'
import{collection,onSnapshot,addDoc,doc,deleteDoc, Timestamp, serverTimestamp,orderBy,query}from 'firebase/firestore'



import DeleteIcon from '@mui/icons-material/Delete';
import "../others/App.css"

import { format } from "date-fns";
import { useLocation } from 'react-router-dom'


const Rooms = () => {
    const location = useLocation()
   
    const prop = location.state 
    console.log(prop)


    
    const staff = "店員"
    const ref = useRef()
    const[chat,setChat] = useState('')
    const[messages,setMessages] = useState([])
    const [list,setList] = useState([])
    const[box,setBox] = useState([])
    var arrays = []
    const [msgs,setMsgs] = useState([])

    
    
    const datas = collection(db,"room")


   useEffect(()=>{
     
        
           var q = query(datas,orderBy("times"))
           onSnapshot(q,(snapshot)=>{
            const items = snapshot.docs.map((doc)=>({
              id: doc.id,
              ...doc.data()
            }))
            const datas = items.filter(li => {return li.userId === prop})

             setList(datas)
             setBox(datas)

             
            //  const formatTime = `${box.times.timestamp.getFullYear()}/${box.times.timestamp.getMonth()+1}/${box.times.timestamp.getDate()} ${box.times.timestamp.getHours()}:${box.times.timestamp.getMinutes()}:${box.timestamp.getSeconds()}`
           })
       
     
   },[])



   const sendHanlder = ()=>{
       

          addDoc(datas,{
            userId:prop,
            username: staff,
            selectname: staff,
            message:chat,
            times:  Timestamp.fromDate(new Date()),
          })
       
         
        
   }
  return (
    <div>
        <AppBar position="fixed" style={{background:'lime',opacity:0.9}}>
     <Toolbar sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
     <Link to="/">
       <ChevronLeft/>
     </Link>
      <Typography variant='h5' sx={{color:"white",marginLeft:{xs:"32%",sm:"38%",md:"45%",lg:"45%"}}} flexGrow={1}>
         Message
      </Typography>
     </Toolbar>
   </AppBar>
 
     {/* <h1 style={{marginTop:"20%"}}>Test</h1> */}
    <div className='sentences' style={{marginTop:"20%"}}>
      
{
 list.map(({id,userId,message,username,selectname,times})=>(
<div className="balloon">
    { selectname !== "" && <div className="balloon-image-right">
      <div className="balloon-img"><p style={{marginTop:"0.8rem",marginLeft:"15%"}}>{selectname}</p></div>
    </div>}
   <div className={selectname === "" ? "balloon-text-right" : "balloon-text-left"} key={id} >
     <p>{message}</p>
   </div>
   <div className='times' style={{padding: "3% 20%"}}>
    {format(times.toDate(),"yyyy年MM月dd日")}
   </div>
  </div>
  
  ))
} 

    </div>
   <div className='msgs'>
   <input type="text" name="text"className='txts' ref={ref} onChange={(e)=>{setChat(e.target.value)}} />
   <button className='snd' onClick={()=>{sendHanlder()}}>Send</button>
   </div>
    </div>
  )
}

export default Rooms