import React,{useState,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Box ,Button,Badge,Grid} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {postData,getData,ServerURL} from "../FetchNodeServices"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  var theme=useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  console.log("MDDDDDD",matches)

  var products=useSelector((state)=>state.product)
  var keys=Object.keys(products).length
  var listproducts=Object.values(products)
  var navigate=useNavigate()
  
  var totalamount=listproducts.reduce(calculatetotal,0)
 

  var offeramount=listproducts.reduce(calculateoffer,0)
  

  function calculatetotal(p,n){
    return(p+(n.price*n.qty))
  }
  
  function calculateoffer(p,n){
    return(p+(n.offerprice*n.qty))
  }


 const [category,setCategory]=React.useState([])
 const [subcategory,setSubCategory]=React.useState([])
 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);
///////popover///////

const [panchorEl, setPAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setPAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPAnchorEl(null);
  };

  const openp = Boolean(panchorEl);
  const showCartItems=()=>{
    return listproducts.map((item,index)=>{
      return(<>
      {index<2?<>
      <Grid item xs={8}>
       <span style={{fontWeight:'normal',letterSpacing:2 }}>{item.productname}</span>
     </Grid>
     <Grid item xs={4}>
       <span style={{fontWeight:'normal',display:'flex',justifyContent:'right' }}>&#8377; {item.price}x{item.qty}</span>
     </Grid>
     </>:<></>}


     </>)})
    

  }

 const cartPopup=()=>{
  return (
    <div>
      
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={openp}
        anchorEl={panchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',

        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
      <div style={{width:400,padding:20}}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <span style={{fontWeight:'lighter',letterSpacing:2 }}>Order Summary</span>
        </Grid>
        <Grid item xs={4}>
          <span style={{fontWeight:'lighter',display:'flex',justifyContent:'right' }}>({keys}) Items</span>
        </Grid>
        {showCartItems()}
        <Grid item xs={8}></Grid>
        {keys>2?
        <Grid item xs={4} style={{display:'flex',justifyContent:'right'}}>{`+${keys-2} More items`}</Grid>:<></>}
        <Grid item xs={8}><div style={{display:'flex',flexDirection:'column'}}><div style={{color:'orange'}}>Total Amount &#8377; {`${(totalamount-offeramount).toFixed(2)}`}</div><div style={{color:'green'}}>You Save &#8377; {`${offeramount.toFixed(2)}`}</div></div></Grid>


        <Grid item xs={4}></Grid>

      </Grid>
      </div>  
      </Popover>
    </div>
  );
}

// const signIn=()=>{
//   return (
//     <div>
      
//       <Popover
//         id="mouse-over-popover"
//         sx={{
//           pointerEvents: 'none',
//         }}
//         open={openp}
//         anchorEl={panchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',

//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         onClose={handlePopoverClose}
//         disableRestoreFocus
//       >
//       <div style={{width:200,padding:20}}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <span style={{fontWeight:'lighter',letterSpacing:2 }}>Order Summary</span>
//         </Grid>
//         <Grid item xs={4}>
//           <span style={{fontWeight:'lighter',display:'flex',justifyContent:'right' }}>({keys}) Items</span>
//         </Grid>
//         {showCartItems()}
//         <Grid item xs={8}></Grid>
//         {keys>2?
//         <Grid item xs={4} style={{display:'flex',justifyContent:'right'}}>{`+${keys-2} More items`}</Grid>:<></>}
//         <Grid item xs={8}><div style={{display:'flex',flexDirection:'column'}}><div style={{color:'orange'}}>Total Amount &#8377; {`${(totalamount-offeramount).toFixed(2)}`}</div><div style={{color:'green'}}>You Save &#8377; {`${offeramount.toFixed(2)}`}</div></div></Grid>


//         <Grid item xs={4}></Grid>

//       </Grid>
//       </div>  
//       </Popover>
//     </div>
//   );
// }




/////////////////////




  const handleClick = (event,categoryid) => {
    setAnchorEl(event.currentTarget);
    fetchAllSubCategories(categoryid)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const fetchAllCategories=async()=>{
  var result=await getData('categories/displayallcategories')
  setCategory(result.result)

 }

 const fetchAllSubCategories=async(categoryid)=>{
  var result=await postData('subcategories/displaysubcategorybycategoryid',{categoryid:categoryid})
  setSubCategory(result.result)

 }

 useEffect(function(){
fetchAllCategories()

 },[])

const showMainCategories=()=>{
return category.map((item,index)=>{
return (<>
 {index<=3?
<div style={{marginRight:50}}>
  
  <Button 
  id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  onClick={(event)=>handleClick(event,item.categoryid)}
  style={{color:'#000'}}  >{item.categoryname}</Button>
  </div>:<></>}</>)


})


}

const handleProductList=(category)=>{
 
  navigate("/productsublist",{state:{category:category}})
 
 }

const showSubCategories=()=>{
  return subcategory.map((item)=>{
  return (
    
    <MenuItem onClick={()=>handleProductList(item)}>{item.subcategoryname}</MenuItem>
    )
  
  
  })
  
  
  }

const nextApp=()=>{
return category.map((item,index)=>{
     return <>{index>=4?
         <div style={{marginRight:50,color:'#FFF'}}>
          {item.categoryname} 
        </div>:<></>}</>
})
   
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="sticky">
        <Toolbar>
          {matches?
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>:<></>}
          <div>
            <img src='/logo.png' width="75"/>
          </div>
       
         {matches?<></>:<>
          <div  style={{display:'flex',justifyContent:'center', width:'90%' }}>
          {showMainCategories()}
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {showSubCategories()}
       </Menu>

          </div>
  </>}

          <div style={{display:'flex',flexDirection:'row'}} >
          <Badge badgeContent={keys} color="secondary">
        <ShoppingCartIcon onClick={()=>navigate('/showcart')} color="action" aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
   />
         </Badge>
          <Person style={{marginLeft:'20'}}/>
         </div>
         {cartPopup()}


        </Toolbar>
      </AppBar>
     {matches?<></>:<div style={{height:50,width:'100%',background:'#000',display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}} >
      {nextApp()}
      </div>}
    </Box>
  );
}