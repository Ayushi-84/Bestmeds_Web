import React, { useState,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {Button,Grid,Divider,TextField,Avatar} from '@mui/material';
import { postData,getData,ServerURL } from '../FetchNodeServices';
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useDispatch } from 'react-redux';



const useStyles = makeStyles({
    root: {
      display :'flex',
      alignItem :'center',
      justifyContent :'center',
      background : '#f1f1f1',
      
    },
  
    subdiv:{
     
         background : '#fff',
         padding : 20,
         width: 1000,
         height:490,
         margin:20,  
         borderRadius:9,
         
  
    },
  });


export default function SignIn() {

    const classes = useStyles();
    var navigate=useNavigate()
    var dispatch=useDispatch()
    var theme=useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileno,setMobileno]=useState()
  const [OTP, setOTP] = useState("");
  const [btnStatus,setBtnStatus]=useState(true)
  const [gOtp,setGOtp]=useState('')
  const handleChkOtp=()=>{
    if(OTP==gOtp)
    {
      navigate('/showcartreview')
      
    }
    else
    { alert('Invalid otp')}

  }

  const generateOtp=async()=>{
    var otp=parseInt(Math.random()*899999)+100000
    alert(otp)
    var result=await postData("smsapi/sendotp",{mobileno:mobileno,otp:otp})
    return(otp)
  }

  const handleVerify=async()=>{
    const result=await postData('users/checkmobile',{mobileno:mobileno})
    if(result.result)
    { dispatch({type:'ADD_USER',payload:[result.data[0].mobileno,result.data[0]]})
      alert(JSON.stringify(result.data[0]))
   setBtnStatus(false)
   
   var t=generateOtp()
   alert(t)
     setGOtp(t)
     
     //dispatch({type:'ADD_PRODUCT',payload:[item.productid,item]})

    }
    else
    {
      navigate('/signup',{state:{mobileno:mobileno}})
    }


  
  }
  
  

  return (

<div>
<Header style={{width:'100%'}}  />


<div className={classes.root}>
       <div style={{background : '#fff', padding : 20, width: 1000, height:490, margin:20, borderRadius:9,}}>

<Grid container spacing={2} >
{matches?<>
  <Grid item xs={12} style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:20,fontWeight:'bold',color:'#000'}}>
                  <div style={{fontSize:'30px'}}>Sign In / Sign Up</div>
                  <div style={{fontSize:'15px',marginTop:12,marginBottom:40}}>Sign up or Sign in to access your orders, special offers, health tips and more!</div>
                  <spam style={{fontSize:'15px',}}>PHONE NUMBER</spam>

                  <TextField style={{width:400}} fullWidth onChange={(e)=>setMobileno(e.target.value)} label=" Enter your mobile no." variant="standard" />
                 {btnStatus? <Button style={{background:'#000',color:'#fff',fontWeight:'bold',marginTop:30,width:400}}  variant='contained'onClick={()=>handleVerify()} fullWidth>Verify</Button>:<>
                 
                 <Grid item xs={12} style={{display:'flex',marginTop:30,flexDirection:'column',justifyContent:'center',fontSize:20,fontWeight:'bold',color:'#000'}}>
  <div  >VERIFICATION NUMBER</div>
  <div style={{fontSize:10,marginTop:5}}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                  <OTPInput style={{marginTop:10,}} value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                  

                  <Button style={{background:'#000',color:'#FFF',fontWeight:'bold',marginTop:30,width:400}} onClick={()=>handleChkOtp()} variant='contained'  fullWidth>VERIFY</Button>
                  </Grid>  
                 
                 </>}
                  
             </Grid>
           
</>:<>
             <Grid item md={6} sm={6} xs={6} style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>
                  <img src='/signinimage.png'  width='450' />
             </Grid>

             <Grid item xs={6} style={{fontSize:20,fontWeight:'bold',color:'#000'}}>
                  <div style={{fontSize:'30px'}}>Sign In / Sign Up</div>
                  <div style={{fontSize:'15px',marginTop:12,marginBottom:40}}>Sign up or Sign in to access your orders, special offers, health tips and more!</div>
                  <spam style={{fontSize:'15px',}}>PHONE NUMBER</spam>
                  <TextField style={{width:400}} onChange={(e)=>setMobileno(e.target.value)}  fullWidth label=" Enter your mobile no." variant="standard" />
                  {btnStatus? <Button style={{background:'#000',color:'#fff',fontWeight:'bold',marginTop:30,width:400}}  variant='contained' onClick={()=>handleVerify()} fullWidth>Verify</Button>:<>
                  <Grid item xs={12} style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:20,fontWeight:'bold',color:'#000',marginTop:30}}>
  <div  >VERIFICATION NUMBER</div>
  <div style={{fontSize:10,marginTop:5}}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                  <OTPInput style={{marginTop:10,}} value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                  

                  <Button onClick={()=>handleChkOtp()} style={{background:'#000',color:'#FFF',fontWeight:'bold',marginTop:30,width:400}}  variant='contained'  fullWidth>VERIFY</Button>
                  </Grid>  
                 
                  </>}
                  
             </Grid></>}

</Grid>
</div>
</div>

<div style={{marginTop:50}}>
  <Divider />
</div>



<div style={{marginTop:17}}>
        <Footer  />
      </div>
    </div>
       
       


  );
}