import React, { useState,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {Button,Grid,Divider,TextField,Avatar} from '@mui/material';
import { postData,getData,ServerURL } from '../FetchNodeServices';
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate,useLocation} from 'react-router-dom';
import OTPInput, { ResendOTP } from "otp-input-react";
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';



const useStyles = makeStyles({
    root: {
      display :'flex',
      alignItem :'center',
      justifyContent :'center',
      background : '#f1f1f1',
    },
  
    subdiv:{
         background : '#FFF',
         padding : 20,
         width: 900,
         
         margin: 20,
         borderRadius:9,
         
  
    },
  });




export default function SignUp() {

    const classes = useStyles();
    const [OTP, setOTP] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gOtp,setGOtp]=useState('')
    var navigate=useNavigate()
    var dispatch=useDispatch()
    var theme=useTheme();
    var location=useLocation()
    const [mobileno,setMobileno]=useState(location.state.mobileno)
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  console.log("MDDDDDD",matches)

const handleSubmit=async()=>
{ 
  if(OTP==gOtp)
  {var body={mobileno:mobileno,emailid:email,firstname:firstName,lastname:lastName}
  var result=await postData('users/adduser',body)
  // alert(result.result)
  dispatch({type:'ADD_USER',payload:[mobileno,body]})
  navigate('/showcartreview')
  }
  else
  {
    alert("Invalid Otp")
  }


}



 
const generateOtp=async()=>{
  var otp=parseInt(Math.random()*899999)+100000
  alert(otp)
  var result=await postData("smsapi/sendotp",{mobileno:mobileno,otp:otp})
  setGOtp(otp)
  return(otp)
}

useEffect(function(){
  generateOtp()

},[])



  return (

<div>




<div className={classes.root}>
       <div style={{
         background : '#FFF',
         padding : 20,
         width: 900,
         
         margin: 20,
         borderRadius:9,
         
  
    }}>

<Grid container spacing={2}>
{matches?<>
    <Grid item xs={12} style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:20,fontWeight:'bold',color:'#000'}}>
                  <div style={{fontSize:'25px',color:'#000'}}>Create Account</div>
                 
                  <div style={{fontSize:10,marginTop:15}}>EMAIL ID</div>
                  <TextField style={{width:400}} onChange={(e)=>setEmail(e.target.value)} fullWidth label=" Enter your Email Id" variant="standard" />

                  <div style={{fontSize:10,marginTop:15}}>FIRST NAME</div>
                  <TextField style={{width:400}} onChange={(e)=>setFirstName(e.target.value)} fullWidth label=" Your First Name" variant="standard" />

                  <div style={{fontSize:10,marginTop:15}}>LAST NAME</div>
                  <TextField style={{width:400}}  onChange={(e)=>setLastName(e.target.value)}fullWidth label=" Your Last Name" variant="standard" />

                  <div style={{fontSize:10,marginTop:15}}>VERIFICATION NUMBER</div>
                  <div style={{fontSize:10,marginTop:5}}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                  <OTPInput style={{marginTop:10,}} value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                  

                  <Button onClick={()=>handleSubmit()} style={{background:'#000',color:'#fff',fontWeight:'bold',marginTop:30,width:400}}  variant='contained'  fullWidth>VERIFY</Button>
                  
             </Grid>
</>:<>
             <Grid item xs={6} style={{fontSize:20,fontWeight:'bold',color:'#FFF'}}>
                  <img src='/signinimage.png'  width='450' />
             </Grid>

             <Grid item xs={6} style={{fontSize:20,fontWeight:'bold',color:'#000'}}>
                  <div style={{fontSize:'25px',color:'#000'}}>Create Account</div>
                 
                  <div style={{fontSize:'10px',marginTop:20}}>EMAIL ID</div>
                  <TextField style={{width:400}} onChange={(e)=>setEmail(e.target.value)} fullWidth label=" Enter your Email Id" variant="standard" />

                  <div style={{fontSize:'10px',marginTop:30}}>FIRST NAME</div>
                  <TextField style={{width:400}} onChange={(e)=>setFirstName(e.target.value)} fullWidth label=" Your First Name" variant="standard" />

                  <div style={{fontSize:'10px',marginTop:30}}>LAST NAME</div>
                  <TextField style={{width:400}} onChange={(e)=>setLastName(e.target.value)} fullWidth label=" Your Last Name" variant="standard" />

                  <div style={{fontSize:'10px',marginTop:30}}>VERIFICATION NUMBER</div>
                  <div style={{fontSize:10,marginTop:5}}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                  <OTPInput style={{marginTop:10,}} value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                  

                  <Button onClick={()=>handleSubmit()} style={{background:'#000',color:'#fff',fontWeight:'bold',marginTop:30,width:400}}  variant='contained'  fullWidth>VERIFY</Button>
                  
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