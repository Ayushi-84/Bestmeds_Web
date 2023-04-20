import React,{useState,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Box ,Button,Grid,Divider} from '@mui/material';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {postData,getData,ServerURL} from "../FetchNodeServices"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PersonIcon from '@mui/icons-material/Person';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
// import Person from '@mui/icons-material/Person';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    marginTop:'10px',
  marginBottom:'10px'
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // marginTop:'10px',
  // marginBottom:'10px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Footer() {
  var theme=useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));

 const [category,setCategory]=React.useState([])
 const fetchAllCategories=async()=>{
  var result=await getData('categories/displayallcategories')
  setCategory(result.result)

 }
 useEffect(function(){
fetchAllCategories()

 },[])


 
const showMainCategories=()=>{
return category.map((item)=>{
return (<div style={{marginRight:50}}>
  
  <Button style={{color:'#000'}}>{item.categoryname}</Button>
  </div>)


})


}


 

  return (
<>
   {!matches?<><Grid container spacing={2} style={{display:'flex',justifyContent:'center',padding:5}}>
  <Grid item xs={4}  style={{display:'flex',justifyContent:'center'}}>
 <img src='/logo.png'  width='35' />
   <span style={{fontSize:'25px',color:'#00cec9'}}>estMeds</span>.com
   
 </Grid>
 <Grid item xs={8}  style={{display:'flex',justifyContent:'left',padding:10}} >
 <span style={{color:'#999999'}}>Bestmeds.com, India Ki Pharmacy, is brought to you by the Dadha & Company – one of India’s
      most trusted pharmacies, with over 100 years’ experience in dispensing quality medicines.</span>
 </Grid>

 <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
         <Divider style={{ background:'#FFF', width:1300}} />
       </Grid>


       <Grid item xs={2.5} >
         <p><b>COMPANY</b></p>
         <p>About Bestmeds</p>
         <p>Customers Speak</p>
         <p>In the News</p>
         <p>Career</p>
         <p>Terms and Conditions</p>
         <p>Privacy Policy</p>
         <p>Fees and Payments Policy</p>
         <p>Shipping and Delivery Policy</p>
         <p>Return, Refund and Cancellation Policy</p>
         <p>Contact</p>
         
</Grid>

<Grid item xs={2}>
         <p><b>SHOPPING</b></p>
         <p>Browse by A-Z</p>
         <p>Browse by Manufacturers</p>
         <p>Health Articles</p>
         <p>Offers / Coupons</p>
         <p>FAQs</p>            
</Grid>

<Grid item xs={2}  >

<p><b>CATEGORY</b></p>
{showMainCategories()}

</Grid>

<Grid item xs={2}  >
         <p><b>SOCIAL</b></p>
         <p>Patients Alike</p>
         <p>Facebook</p>
         <p>Twitter</p>
         <p>Instagram</p>
         <p>Youtube</p>   
         <p>Refer & Earn</p>         
</Grid>

<Grid item xs={2.5} >
         <p><b>SUBSCRIBE TO OUR NEWSLETTER</b></p>
         <div>Get a free subscription to our health and </div>
         <div>fitness tip and stay  tuned to our latest  </div>
         <div>offers</div>
         <Grid item xs={12} style={{marginTop:"20px",marginBottom:'20px'}} >
  <Divider  style={{background:'#000'}}/>
</Grid>

 
         <div  >
         <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Here.."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{display:'flex',flexDirection:'column'}} >
              <img src='/googleplay.png' width="150" />
              
              <img src='/iosapp.png'  width="150"  />
           </div>   
              </div>
           
</Grid>

</Grid></>:<> <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
              <img src='/googleplay.png' width="150" />
              
              <img src='/iosapp.png'  width="150"  />
           </div>   </>}
</>
 );
}