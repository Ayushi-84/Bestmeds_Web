import React,{useState,useEffect,createRef} from 'react';
import { makeStyles } from "@material-ui/core"
 
import {postData,getData,ServerURL} from "../FetchNodeServices"
import { Divider } from '@material-ui/core'; 
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";
 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Header from "./Header"
import Footer from "./Footer"
import CartButton from './CartButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles({
    root: {

        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',        
        flexDirection:'column'
       

    },
    subdiv: {
      
        padding: 15,
        width: '80%',
        marginTop: 50,
        height:300,
        border:'0.5px solid #95a5a6',
        borderRadius:2,
        margin:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }
})


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

export default function Home(props) {
    const classes = useStyles();
    var theme=useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1500,
      slidesToShow:matches?2:5,
      slidesToScroll: 1,
      //autoplay: true,
      //autoplaySpeed: 2000,
    };
    var categoriesSlider=createRef()
    var brandSlider=createRef()
 const [category,setCategory]=React.useState([])
 const [brand,setBrand]=React.useState([])
 const [banner,setBanner]=React.useState([])
 const [subcategory,setSubCategory]=React.useState([])
 const [products,setProducts]=React.useState([])
 const [refresh,setRefresh]=React.useState(false)
 var dispatch=useDispatch()
 var navigate=useNavigate()
 const fetchAllCategories=async()=>{
  var result=await getData('categories/displayallcategories')
  setCategory(result.result)

 }

 const fetchAllBanners=async()=>{
  var result=await getData('banner/displayallbanner')
  setBanner(result.result)

 }

 const fetchAllBrands=async()=>{
  var result=await postData('brands/displayallbrandsbystatus',{status:'Popular'})
  setBrand(result.result)

 }

 const fetchAllProducts=async()=>{
  var result=await postData('products/searchproductbysalestatus',{salestatus:'Trending'})
  setProducts(result.result)

 }


 const fetchAllSubCategories=async(categoryid)=>{
  var result=await postData('subcategories/displaysubcategory',{categoryid:categoryid})
  setSubCategory(result.result)

 }

 useEffect(function(){
fetchAllCategories()
fetchAllBanners()
fetchAllBrands()
fetchAllProducts()
 },[])

const handleProductList=(category)=>{
 
 navigate("/productlist",{state:{category:category}})

}

const showMainCategories=()=>{
return category.map((item,index)=>{
return (
<div>
<div className={classes.subdiv} onClick={()=>handleProductList(item)}>
 
 <div style={{padding:10}}>
 <img src={`${ServerURL}/images/${item.icon}`} style={{width:'100%'}}/>
 </div>
 <div style={{fontFamily:'Sarabun',fontSize:20}}>
   {item.categoryname}  
 </div>    
</div>
</div>


)


})


}


const showMainBrands=()=>{
  return brand.map((item,index)=>{
  return (
  <div>
  <div className={classes.subdiv}>
   
   <div style={{padding:10}}>
   <img src={`${ServerURL}/images/${item.icon}`} style={{width:150,height:150}}/>
   </div>
  </div>
  </div>
  
  
  )
  
  
  })
  
  
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

  const showProducts=()=>{
    return products.map((item,index)=>{
    return (
    <div>
    <div className={classes.subdiv}>
     
     <div style={{padding:10}}>
     <img onClick={()=>navigate("/productview",{state:{product:item}})} src={`${ServerURL}/images/${item.picture}`} style={{width:150,height:150}}/>
     </div>
     <div style={{width:240,fontFamily:'Sarabun',fontWeight:500,display:'flex',justifyContent:'left'}}>
    {item.productname}
     </div>

     <div style={{width:240,fontFamily:'Sarabun',fontWeight:500,display:'flex',justifyContent:'left'}}>
    {item.offerprice>0?<div style={{display:'flex',flexDirection:'column'}}><div>Price: &#8377; {item.price-item.offerprice}  <s style={{color:'#ff4757'}}>&#8377; {item.price}</s> </div><div style={{color:'#2ed573'}}>You Save:&#8377; {item.offerprice} </div></div>:<></>}
     </div>

     <div style={{display:'flex', justifyContent:'center',padding:10}}>
     <CartButton value={0} onChange={(value)=>handleQtyChange(value,item)} />
     </div>

    </div>
    </div>
       
    )
     
    })
       
    }
  






const showAllBanners=()=>{
  return banner.map((item,index)=>{
  return (
  <div>
   
   
   <div style={{padding:10}}>
   <img src={`${ServerURL}/images/${item.bannerpicture}` } width="100%" />
   </div>
  </div>
  
  
  )
  
  
  })
  
  
  }
  









const showSubCategories=()=>{
  return subcategory.map((item)=>{
  return (
    
    <MenuItem>{item.subcategoryname}</MenuItem>
    )
  
  
  })
  
  
  }
  const couponsView=()=>{

    return(<div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
  
    <span style={{padding:10,margin:5}} >
  
  
  <img src="/coupontwo.jpg" style={{borderRadius:10}} width="100%" />
  </span>
  
  <span style={{padding:10,margin:5}} >
  
  
  <img src="/couponone.jpg" style={{borderRadius:10}} width="100%" />
  </span>
  <span style={{padding:10,margin:5}} >
  
  
  <img src="/couponthree.jpg" style={{borderRadius:10}} width="100%" />
  </span>
   </div>)
   }
  
return(<div>
    <Header style={{width:'100%'}}  />
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
       <div style={{ width:'95%' }}>
       
          <Slider {...bannersettings}  >
              {showAllBanners()}
          </Slider>
        </div>
      </div>  

      {couponsView()}
        
  {/*////////categories list ///////////////*/ }
  <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>  
  <div style={{fontFamily:'Sarabun',fontSize:32,fontWeight:'bold'}}>Shop By Category</div>
  </div>
     <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
       
        <ArrowBackIos onClick={()=>categoriesSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
    
       <div style={{ width:'90%' }}>
       
          <Slider {...settings} ref={categoriesSlider} >
              {showMainCategories()}
          </Slider>
        </div>
    
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
       
        <ArrowForwardIosIcon onClick={()=>categoriesSlider.current.slickNext()} style={{cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
        
    </div>   
 {/*/////////////////////////////////////*/    }
    


{/*////////brand list ///////////////*/ }
<div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>  
  <div style={{fontFamily:'Sarabun',fontSize:32,fontWeight:'bold'}}>Popular Brands</div>
  </div>
     <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
       
        <ArrowBackIos onClick={()=>brandSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
    
       <div style={{ width:'90%' }}>
       
          <Slider {...settings} ref={brandSlider} >
              {showMainBrands()}
          </Slider>
        </div>
    
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
       
        <ArrowForwardIosIcon onClick={()=>brand.current.slickNext()} style={{cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
        
    </div>   
 {/*/////////////////////////////////////*/    }

{/*/////////Products/////////*/    }
<div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>  
  <div style={{fontFamily:'Sarabun',fontSize:32,fontWeight:'bold'}}>Trending Products</div>
  </div>
<div style={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
 {showProducts()}
</div>


{/*/////////////////////////////////////*/    }


  
    <Divider style={{margin:30}}/>
    <Footer />


    </div>)

}