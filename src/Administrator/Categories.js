import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { borderRadius } from '@mui/system';
import { postDataImage } from '../FetchNodeServices';
import DisplayAllCategories from "./DisplayAllCategories"
import Swal from "sweetalert2"
const useStyles = makeStyles({
    root: {
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
   },
   subdiv:{
     background:'#7ed6df',
     padding:20,
     width:700,
     marginTop:50

   },
  });
  const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1.5px solid #FFF',
        borderRadius:0
      },
      '&:hover fieldset': {
        borderColor: '#FFF',
        
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF',
         
      },
      
    },
  });
  const Input = styled('input')({
    display: 'none',
  });

function Categories(props) {
    const classes = useStyles();
    const [categoryName,setCategoryName]=useState('') 
    const [icon,setIcon]=useState({bytes:'',filename:'/image.png'}) 
    const handleIconChange=(event)=>{
      
      setIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    
    }

    const handleSubmit=async()=>{
     var formData=new FormData()
     formData.append('categoryname',categoryName)
     formData.append('icon',icon.bytes)
     var result=await postDataImage('categories/savecategories',formData)
     if(result.result)
     {Swal.fire({
     
      icon: 'success',
      title: 'Your Category has been saved',
      showConfirmButton: false,
      timer: 1500
    })}
  else
  {
    Swal.fire({
     
      icon: 'error',
      title: 'Fail to submit category',
      showConfirmButton: false,
      timer: 1500
    })
  }


    }
const handleDisplayCategory=()=>{
props.setViewContainer(<DisplayAllCategories/>)

}

  return (
    
    <div className={classes.root}>
       
        <div className={classes.subdiv}>
          <Grid container spacing={2} >
              <Grid item xs={6} style={{fontSize:20,fontWeight:'bold',color:'#FFF'}}>
                  Category Interface
                  
               </Grid>
               <Grid item xs={6} style={{fontSize:20,fontWeight:'bold',color:'#FFF'}}>
               
               <Button onClick={()=>handleDisplayCategory()} style={{background:'#FFF',color:'#7ed6df',fontWeight:'bold'}} variant='contained' fullWidth>List Categories</Button>
               </Grid>
               
              <Grid item xs={12}>
                  <CssTextField variant="outlined"  InputLabelProps={{
    style: { color: '#FFF' },
}} inputProps={{ style: { color: "#FFF" } }} label="Category Name" onChange={(event)=>setCategoryName(event.target.value)} fullWidth/>
                  
              </Grid>
              <Grid item xs={6} style={{justifyContent:'center',alignItems:'center'}}>
              <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button style={{background:'#FFF',color:'#7ed6df',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
          Upload
        </Button>
      </label>
                </Grid>
          <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Avatar
        alt="Remy Sharp"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 70, height: 70 }}
      />
            </Grid>      

        <Grid item xs={6}>
          <Button onClick={()=>handleSubmit()} style={{background:'#FFF',color:'#7ed6df',fontWeight:'bold'}} variant='contained' fullWidth>Submit</Button>
          
          </Grid>    
          <Grid item xs={6}>
          <Button style={{background:'#FFF',color:'#7ed6df',fontWeight:'bold'}} variant='contained' fullWidth>Reset</Button>
          </Grid>    

          </Grid>
        
        </div>
     
    </div>
  );
}

export default Categories;
