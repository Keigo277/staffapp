import {useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import{ChevronLeft}from '@mui/icons-material'
import {AppBar,Box,Toolbar,IconButton,Typography,Button,Avatar,Badge,Grid,Card,CardMedia,CardContent,CardActions} from '@mui/material'
import { display, fontSize, fontWeight } from '@mui/system'
import { db } from './firebase'
import{collection, deleteDoc, onSnapshot,doc} from 'firebase/firestore'
import People from './components/pictures/person01.jpg'




import './others/App.css'
import { id } from 'date-fns/locale'


const Home = () => {
  const[users,setUsers] = useState([])
  const[preusers,setpreUsers] = useState([])

  const navigate = useNavigate()
  
 const ref = collection(db,"users")

 useEffect(()=>{
   onSnapshot(ref,(snapshot)=>{
    const user = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
     }))
     setUsers(user)
     setpreUsers(user)
   })
 },[])

 const pageHandler = (id)=>{
    navigate('./others/Rooms',{state:id})
 }

 const DeleteAction = (id)=>{
  console.log(id)
    deleteDoc(doc(db,"users",id))
 }

  return (
    <div>
    <AppBar position="fixed" style={{background:'lime',opacity:0.9}}>
     <Toolbar sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
      <Typography variant='h5' sx={{color:"white",marginLeft:{xs:"40%",sm:"42%",md:"45%",lg:"45%"}}} flexGrow={1}>
         Users
      </Typography>
     </Toolbar>
   </AppBar>
   <Box sx={{marginTop:"100px"}}>
   <Grid container spacing={2} sx={{paddingRight:"10px"}}>
      {
        users.map(({id,username,userId,total,foods})=>(
      <Grid key={id} item xs={6} style={{padding:"10px"}}>
        
       
        <div style={{border:"3px solid gold",marginLeft:"1rem",height:"300px",textAlign:"center",padding:"10% 0px",borderRadius:"5%"}} onClick={()=>{pageHandler(userId)}} >
          <div style={{background:"red",width:"80%",marginLeft:"1rem"}}>
            <h4>
                Name:{username}
            </h4>
          </div>
           <div style={{width:"60px",height:"55px",border:"2px solid black",marginLeft:"3rem",marginTop:"1rem",display:"flex",paddingLeft:"1rem",alignItems:"center"}}>
             <img src={People} style={{width:"60%",height:"60%"}} />
           </div>
           <div style={{marginTop:"1rem", display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
            <h5 style={{overflowWrap:"break-word",fontSize:"8px"}}>
                ID:{userId}
            </h5>
            <div style={{border:"1px solid gray",width:"90%",marginLeft:"5%",marginTop:"1rem"}}>
            <h5 style={{marginTop:"1%"}}>
             注文内容
            </h5>
            <div>
            <h6 style={{marginTop:"5px",fontSize:"10px",overflow:"hidden"}}>
            「{`${foods}。`}」
            </h6>
            </div>
            <p style={{marginTop:"1rem"}}>
             合計:￥{total}
            </p>
           </div>
          </div>
        </div>
        <button style={{marginLeft:"4rem",width:"80px",backgroundColor:"violet"}} onClick={()=>{DeleteAction(id)}}>削除</button>
      </Grid>
        ))
      }
     
   </Grid>
   </Box>
    </div>
  )
}

export default Home