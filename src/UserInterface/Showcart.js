import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Badge, Grid, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core"
import { postData, getData, ServerURL } from '../FetchNodeServices';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Divider } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartButton from './CartButton';
import Header from "./Header"
import Footer from "./Footer"
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Crimson',
    background: '#f6f6f7',
    flexDirection:'column'

  },
  subdiv: {

    padding: 20,
    width: 1200,
    marginTop: 50,
  },
  one: {

    padding: 20,
    width: '95%',
    marginTop: 10,
    background: '#fff',
    borderRadius: '8px',


  },
  two: {

    padding: 20,
    width: '100%',
    background: '#fff',
    height: 100,
    borderRadius: '20px',
    fontFamily: 'Poppins',
    marginLeft: 20,

  },
  three: {
    borderRadius: '20px',
    padding: 20,
    marginTop: 20,
    width: '95%',
    background: '#fff',
    paddingLeft: 50,
    // height:200,
    fontFamily: 'Poppins',
    marginLeft:20,
  },
  four: {
    textAlign: 'left',
    paddingLeft: 20,
    fontFamily: 'Poppins',
    marginLeft: 20,
  },
});
var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function Productview() {
  const classes = useStyles();
  var month=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]
  var date=new Date()
  var newdate=new Date()
  newdate.setDate(date.getDate()+3)

  var dispatch=useDispatch()
  const [refresh,setRefresh]=React.useState(false)
  const [banner, setBanner] = React.useState([])
  
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
  
  const showCartItems=()=>{
    return listproducts.map((item,index)=>{
      return(<>
      <div style={{ display: 'flex', justifyContent: 'left', marginTop: 10,padding:20 }}>
                <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 50, height: 50 }} />
                <div style={{display:'flex',flexDirection:'column', alignItems: 'right', fontFamily: 'Poppins', marginLeft: 10, marginTop: 10 }}>
                  <div>{item.productname}</div>
                  <div style={{fontSize:10,fontWeight:100}}><i>Only {item.stock} left in stock</i></div>
                  <div style={{fontSize:10,fontWeight:100}}>Mfr:{item.brandname}</div>
                  </div>
              </div>
              <div style={{ display:'flex',flexDirection:'row', color: "#ef4281", fontWeight: 'bold', fontFamily: 'Crimson Pro', marginTop: 20, fontSize: 20, marginLeft: 50 }}>
              <div style={{ display:'flex',flexDirection:'column'}}>
              <div style={{fontSize:14,color:'#000'}}>&#8377;  {item.offerprice>0?((item.price-item.offerprice)).toFixed(2):(item.price).toFixed(2)} x {item.qty}</div>

              <div>&#8377;  {item.offerprice>0?((item.price-item.offerprice)*item.qty).toFixed(2):(item.price*item.qty).toFixed(2)}</div>
              </div>  
              <div style={{marginLeft:'auto'}}><CartButton value={item.qty} onChange={(value)=>handleQtyChange(value,item)} /></div>
              </div>

              <div style={{ fontSize: 16, fontFamily: 'Poppins', marginTop: 50, display: 'flex', justifyContent: 'space-between' }}>
                Delivery between {month[date.getMonth()]} {date.getDate()}-{month[newdate.getMonth()]} {newdate.getDate()}       
                {/* <div style={{display:'flex',justifyContent:'right'}}>
             Qty
            </div> */}

                <div>
                  <Button style={{ marginRight: 7, color: 'grey', background: '#f2f2f2' }} >REMOVE</Button>
                  <Button style={{ marginLeft: 5, color: 'grey', background: '#f2f2f2' }} >SAVE FOR LATER</Button>
                </div>
              </div>
     </>)})
    

  }
  
  const fetchAllBanners = async () => {
    var result = await getData('banner/displayallbanner')
    setBanner(result.result)

  }

  const showAllBanners = () => {
    return banner.map((item, index) => {
      return (

        <img src={`${ServerURL}/images/${item.bannerpicture}`} />



      )


    })


  }
  useEffect(function () {
    fetchAllBanners()

  }, [])

const handleUser=()=>{
 navigate("/signin")


}


  return (
    <>
    <Header style={{width:'100%'}}  />
    <div className={classes.root}>
 
      <div className={classes.subdiv}>
        <Grid container spacing={2}>

          <Grid item xs={7}>
            <div style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'Poppins', }}>
              ORDER SUMMARY
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
              <div style={{ width: '100%' }}>
                <Slider {...bannersettings}  >
                  {showAllBanners()}
                </Slider>
              </div>
            </div>
            <div className={classes.one} >
              <div style={{ fontFamily: 'Poppins' }}>
                PRODUCTS
              </div>
              {showCartItems()}
            </div>
          </Grid>
          
          <Grid item xs={5} >
            <div className={classes.two}>
              <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                APPLY PROMOCODE / NMS SUPERCASH
              </div>
            </div>

            <div className={classes.three}>
              <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                PAYMENT DETAILS
              </div>
              <div style={{ display:'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                <div>MRP Total</div><div style={{ marginLeft:'auto', paddingLeft: 60 }}>&#8377; {totalamount}</div>
              </div>
               <div style={{ display:'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                <div>Total Amount</div><div style={{ marginLeft:'auto', paddingLeft: 60 }}>&#8377; {totalamount-offeramount}</div>
              </div>

               <div style={{ display:'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: '#32ff7e', alignItems: 'left' }}>
                <div>You Save</div><div style={{ marginLeft:'auto', paddingLeft: 60 }}>&#8377; {offeramount}</div>
              </div>

              <div style={{ display:'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                <div>Amount Pay</div><div style={{ marginLeft:'auto', paddingLeft: 60 }}>&#8377; {totalamount-offeramount}</div>
              </div>

              
              
              <div style={{ display:'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}></div>
              <Button onClick={handleUser} variant='contained' style={{ background: '#000', color: '#fff' }}> Proceed </Button>
              </div>

              

            
            <div className={classes.four} style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'grey', alignItems: 'left', fontSize: 10, marginTop: 5 }}>
              Bestmeds is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
    </>
  )

}