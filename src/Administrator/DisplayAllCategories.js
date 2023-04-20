/* 
@material-table/core@next
@mui/lab

*/

import React,{useEffect,useState} from "react"
import MaterialTable from "@material-table/core"
import { makeStyles } from '@mui/styles';
import {postData, postDataImage, getData, ServerURL } from "../FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import {Grid,TextField,Button,Avatar,Divider} from '@mui/material'
 
import { alpha, styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2" 

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









const useStyles = makeStyles({
    root: {
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
   },
   subdiv:{
     background:'#7ed6df',
     padding:20,
     width:1000,
     marginTop:50

   },

   croot: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
 },
 csubdiv:{
   background:'#7ed6df',
   padding:20,
   width:700,
   marginTop:50

 },
  });

export default function DisplayAllCategories(props)
{const classes = useStyles();
  const [list,setList]=useState([])
  const [open,setOpen]=useState(false)
  const [showButton,setShowButton]=useState(false)
  const [categoryId,setCategoryId]=useState('')  
  const [categoryName,setCategoryName]=useState('') 
  const [icon,setIcon]=useState({bytes:'',filename:'/image.png'}) 
  const [tempIcon,setTempIcon]=useState('')
  const [btnStatus,setBtnStatus]=useState(true)
  const handleIconChange=(event)=>{
    setShowButton(true)
    setBtnStatus(false)
    setIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
  
  }

  const handleSubmit=async()=>{
  var result=await postData('categories/editdata',{categoryid:categoryId,categoryname:categoryName})

  if(result.result)
  {Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your Category has been saved',
    showConfirmButton: false,
    timer: 3000
  })

}


  
  else
  {

    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Fail  to Edit Category',
      showConfirmButton: false,
      timer: 3000
    })


  }
  }



  const handleCancel=()=>{
    setShowButton(false)
    setBtnStatus(true)
    alert(tempIcon)
    setIcon({bytes:'',filename:`${ServerURL}/images/${tempIcon}`})
  }

const handleOpen=(rowData)=>{
  setCategoryId(rowData.categoryid)
  setCategoryName(rowData.categoryname)
  setIcon({bytes:'',filename:`${ServerURL}/images/${rowData.icon}`})
  setTempIcon(rowData.icon)
  setOpen(true)
}


const handleDelete=async(rowData)=>{
 
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
      var dresult=await postData('categories/deletedata',{categoryid:rowData.categoryid})

 if(dresult.result)
 {


      Swal.fire(
        'Deleted!',
        'Your Category has been deleted.',
        'success'
      
        )
        fetchCategories()
    }}
  })

 

}

const handleIconSave=async()=>{
  var formData=new FormData()
  formData.append('categoryid',categoryId)
  formData.append('icon',icon.bytes)
  var result=await postDataImage('categories/editicon',formData)
 
  if(result.result)
  {Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your Icon has been Edited',
    showConfirmButton: false,
    timer: 3000
  })

}


  
  else
  {

    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Fail  to Edit Icon',
      showConfirmButton: false,
      timer: 3000
    })


  }



  setShowButton(false)
  setBtnStatus(true)
}
const handleClose=()=>
{ setOpen(false)
fetchCategories()

}

/*********Dialog**************/
const showDialog=()=>{
return (
  <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">

      <DialogContent>
         
    <div className={classes.croot}>
       
       <div className={classes.csubdiv}>
         <Grid container spacing={2} >
             <Grid item xs={12} style={{fontSize:20,fontWeight:'bold',color:'#FFF'}}>
                 Edit Category
                 
              </Grid>
             <Grid item xs={12}>
                 <CssTextField variant="outlined"  value={categoryName} InputLabelProps={{
   style: { color: '#FFF' },
}} inputProps={{ style: { color: "#FFF" } }} label="Category Name" onChange={(event)=>setCategoryName(event.target.value)} fullWidth/>
                 
             </Grid>
             <Grid item xs={12}>
         <Button onClick={()=>handleSubmit()} style={{background:'#FFF',color:'#7ed6df',fontWeight:'bold'}} variant='contained' fullWidth>Edit Data</Button>
         
         </Grid>    

         <Grid item xs={12}>
           <Divider style={{background:'#FFF'}}/>
         </Grid>
 
             <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       {btnStatus?<>
             <label htmlFor="contained-button-file">
       <Input onChange={(event)=>handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
       <Button style={{background:'#FFF',color:'#7ed6df',fontWeight:'bold'}} variant="contained" component="span"  fullWidth>
         Upload
       </Button>
     </label></>:<></>}

      {showButton?<div> 
        <Button onClick={handleIconSave} style={{color:'#FFF',fontWeight:'bold'}}>
        Save
       </Button>
       <Button onClick={handleCancel} style={{color:'#FFF',fontWeight:'bold'}}>
        Cancel
       </Button>

     </div>:<></>}




               </Grid>
         <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         <Avatar
       alt="Remy Sharp"
       src={icon.filename}
       variant="rounded"
       sx={{ width: 70, height: 70 }}
     />
           </Grid>      

         
         </Grid>
       
       </div>
    
   </div>
      </DialogContent>
      <DialogActions>
 
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

}
/*************************** */









  const fetchCategories=async()=>{
   var result=await getData("categories/displayallcategories")
   setList(result.result)

  }
    useEffect(
        function()
        { 
            fetchCategories()
        },[])
        

    function display() {
        return (
          <MaterialTable
            title="List Categories"
            columns={[
              { title: 'Category ID', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' ,

            
            },
              { title: 'Icon',  field:'icon',
                render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 70, borderRadius: '25%'}}/>
            },
              
            ]}
            
            data={list}        
            
            actions={[
              {
                icon: 'edit',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleDelete(rowData)
              }
 
            ]}
          />
        )
      }

  return(<div>
  
  <div className={classes.root}>
       
       <div className={classes.subdiv}>
   
    {display()}
    {showDialog()}
    </div>
    </div>
  </div>)


}