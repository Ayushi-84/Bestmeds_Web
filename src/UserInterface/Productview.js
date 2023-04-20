import React,{useState,useEffect,createRef} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Box ,Button,Badge,Grid,TextField} from '@mui/material';
import {  makeStyles } from "@material-ui/core"
import {postData,getData,ServerURL} from '../FetchNodeServices';
import { Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from "./Header"
import Footer from "./Footer"
import CartButton from './CartButton';
import { useDispatch } from 'react-redux';
import Slider from "react-slick";
 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

const useStyles = makeStyles({
    
    imagediv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily:'Crimson',
      border:'4px solid #F1F1F1',
      margin:10
      
 
     
 
  
    },
  });

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    //autoplay: true,
    //autoplaySpeed: 2000,
  };

export default function Productview(props) {
    const classes = useStyles();
    var imageSlider=createRef()
    const [refresh,setRefresh]=React.useState(false)
    const [listimages,setListImages]=React.useState([])
  
 var dispatch=useDispatch()
    var location=useLocation()
    var product=location.state.product
    const [image,setImage]=useState(product.picture)
  const fetchProductImages=async()=>{
    var body={productid:product.productid}
    var result=await postData('productimages/fetchproductimages',body)
    if(result.result)
    {
      setListImages(result.result)
    }

  }
  const handleChangePicture=(pic)=>
    {
 setImage(pic)

    }

  const showImageList=()=>{
    return listimages.map((item,index)=>{
    return (
    <div>
    <div className={classes.imagediv} >
     
     <div style={{padding:5}}>
     <img onMouseOver={()=>handleChangePicture(item.image)} src={`${ServerURL}/images/${item.image}`} style={{width:70,height:70,cursor:'pointer'}}/>
     </div>
    </div>
    </div>
    
    
    )
    
    
    })
  }
    


useEffect(function(){
 fetchProductImages()

},[])





const handleQtyChange=(value,item)=>{
  item['qty']=value
  if(value>0)
  {
  dispatch({type:'ADD_PRODUCT',payload:[item.productid,item]})

  }
  else
  {
    dispatch({type:'DEL_PRODUCT',payload:[item.productid]})
  }
  
setRefresh(!refresh)
}

  
  
    return(
     <>
          <Header style={{width:'100%'}}  />
           <div style={{marginTop:50}}>
              <Grid container spacing={2} >
                  <Grid item xs={6} style={{display:'flex',justifyContent:'center',flexDirection:'column'}} >
                 <div style={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'column'}}>

                 <img src={`${ServerURL}/images/${image}`} style={{width:500,height:500}}/>
                 </div>
                  
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      
      <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             
            }}
          >
     
      <ArrowBackIos onClick={()=>imageSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:22,color:'#95a5a6'}} />
      </div>
  
     <div style={{ width:'70%' }}>
     
        <Slider {...settings} ref={imageSlider} >
            {showImageList()}
        </Slider>
      </div>
  
      <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
               
            }}
          >
     
      <ArrowForwardIosIcon onClick={()=>imageSlider.current.slickNext()} style={{cursor: "pointer",fontSize:22,color:'#95a5a6'}} />
      </div>
      
  </div>   

                  </Grid>
                  <Grid item xs={6}>
                  <Grid  style={{fontSize:24,fontWeight:'normal',fontFamily:'Sarabun',marginBottom:30}}>
                  {product.productname}
                  <div style={{fontSize:16,fontFamily:'Poppins',marginTop:5}}> {product.categoryname} {product.subcategoryname}</div>
                  </Grid >
                
                 
                  
                  <Divider/>

                  

                  <Grid style={{fontSize:22,fontFamily:'Sarabun',marginTop:20}}>
                      <span>BestPrice*</span><span style={{color:"#ef4281",fontWeight:'bold',fontFamily:'Crimson Pro'}}>&#8377; {product.price-product.offerprice}</span>
                  </Grid>
                  <Grid style={{fontSize:16,fontFamily:'Sarabun'}}>
                    <del>MRP  &#8377;{product.price}</del><span style={{color:'#378f30'}}> GET {((product.offerprice*100)/product.price).toFixed(1)}% OFF</span>
                    <div>(Inclusive all taxes)</div>
                    <div>* Mkt: Inlife Pharma Private Limited</div>
                   <div> * Country of Origin: India</div>
                     <div> * Delivery charges if applicable will be applied at checkout</div>
                  </Grid>
                  <Grid style={{marginTop:20,marginBottom:20}}>
                 
     <CartButton onChange={(value)=>handleQtyChange(value,product)} />
  

                  </Grid>
                <Divider />
                <Grid style={{fontFamily:'Poppins',marginTop:20}}>
                Check Availability & Expiry
                <div style={{marginTop:10}}>
                 <TextField
            className="username"
            name="username"
           placeholder="Enter Your Pincode "
            type="text"
            variant="standard"></TextField>
            </div>
                </Grid>
                <Grid style={{fontSize:18,fontWeight:'bold',fontFamily:'Poppins',marginTop:30}}>
                OFFERS APPLICABLE
                </Grid>
                  </Grid>
              </Grid>
           </div>
           <Footer/>
       </>
    )

}