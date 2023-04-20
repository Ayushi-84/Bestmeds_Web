import React,{useState,useEffect,createRef} from 'react';
import { makeStyles } from "@material-ui/core"
 

import { Divider,Avatar,Button } from '@material-ui/core'; 

const useStyles = makeStyles({
    root: {

        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',        
        flexDirection:'column'
       

    },
    subdiv: {
      
        padding: 15,
        width: 250,
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


export default function CartButton(props) {
    const classes = useStyles();
  
     const [qty,setQty]=React.useState(props.value)
   const handlePlus=()=>{
   var v=qty+1
   if(v<10)
   setQty(v)
   props.onChange(v)

   }

   const handleMinus=()=>{
    var v=qty-1
    if(v>=0)
    setQty(v)
    props.onChange(v)
    }
 
     return(
         <>
         {qty==0?<div style={{display:'flex',alignItems:'center',padding:2,margin:2}}><Button onClick={()=>handlePlus()} style={{width:240,background:'#000',color:'#FFF'}} variant="contained">Add to Cart</Button></div>:
         <div style={{display:'flex',alignItems:'center',padding:2,margin:2}}>
             <Avatar onClick={()=>handleMinus()} style={{ background:'#000',color:'#FFF',marginRight:15}} variant="square">
            -
              </Avatar>
             <span>
                 {qty}
             </span> 
             <Avatar onClick={()=>handlePlus()} style={{ background:'#000',color:'#FFF',marginLeft:15}} variant="square">
             +
              </Avatar>
             

         </div>}
       </>
     )
 
    }
 