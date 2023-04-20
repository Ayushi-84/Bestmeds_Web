import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core"
import { alpha, styled } from '@mui/material/styles';
import { Avatar, Button, TextField, Grid } from "@mui/material"

import Select from "@mui/material/Select"
import { InputLabel, FormControl, MenuItem } from "@mui/material"
import { getData, postData, postDataImage } from "../FetchNodeServices"
import Swal  from "sweetalert2"

/**********CSS brand********************* */

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    subdiv: {
        backgroundColor: '#00cec9',
        padding: 10,
        width: 600,
        marginTop: 50
    }
})
const Input = styled('input')({
    display: 'none',
  });
const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1.5px solid #FFF'
        },
        '&:hover fieldset': {
            borderColor: '#FFF',

        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF',

        },

    },
})



/***********function brand************** */
 function Brand(props) {
    const classes = useStyles();
    const [categoryId, setcategoryId] = useState('')
    const [subcategoryId, setsubcategoryId] = useState('')
    const [brandName,setbrandName]=useState('')
    const [status,setstatus]=useState('')
    // const [brandIcon,setbrandIcon]=useState('')
    const [list, setList] = useState([])
    // const [categoryid,setcategoryid]=useState('')
    const [Slist, setSlist] = useState([])
    const [icon, setIcon] = useState({ bytes: '', filename: '/brand.jpeg' })
    

    const fetchCategories = async () => {
        var result = await getData('categories/displayallcategories')
        setList(result.result)

    }

    const fetchSubcategories = async () => {
        var result = await getData('subcategories/displaysubcategory')
        setSlist(result.result)
    }
    useEffect(
        function () {
            fetchCategories()
        
        }, [])

    const fillCategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

            )
        })
    }
    const fillSubcategory = () => {
        return Slist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })

    }
    const handleChange =async (event) => {
        setcategoryId(event.target.value);
        // setsubcategoryId(event.target.value);
        var  result=await postData('subcategories/displaysubcategory',{categoryid:event.target.value})
        setSlist(result.result)
    };
    const handleChanged=(event)=>{
        setsubcategoryId(event.target.value)
    }
    

    const handleIconChange = (event) => {
       
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }
    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('subcategoryid', subcategoryId);
        formData.append('categoryid', categoryId);
        formData.append('brandname', brandName)
        formData.append('brandicon', icon.bytes);
        formData.append('status', status);

        var result = await postDataImage('brand/savebrand', formData)
        if(result.result)
        {Swal.fire({
        
         icon: 'success',
         title: 'Your Brand has been saved',
         showConfirmButton: false,
         timer: 1500
       })}
     else
     {
       Swal.fire({
        
         icon: 'error',
         title: 'Fail to submit Sub Category',
         showConfirmButton: false,
         timer: 1500
       })
     }
      };

   

        return (
            <div className={classes.root}>
                <style jsx>
      {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: white !important;
        }
        svg.MuiSvgIcon-root {
          color: white !important;
        }
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
        
      `}
    </style>
                <div className={classes.subdiv}>
                    <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ color: '#fff', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                                Brand
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel  style={{ color: "#FFF" }}  id="demo-simple-select-label">Category </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryId}
                                        label="Category "
                                        variant="outlined"
                                        onChange={handleChange}
                                    >
                                        {fillCategory()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Sub Category </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subcategoryId}
                                        label="SubCategory "
                                        onChange={handleChanged}
                                    >
                                        {fillSubcategory()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField onChange={(event)=>setbrandName(event.target.value)} label="Brand Name" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                    <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Status </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        onChange={(event)=>setstatus(event.target.value)}
                                    >
                                        <MenuItem value="Top Brands">Top Brands</MenuItem>
                                        <MenuItem value="Trending">Trending</MenuItem>
                                        <MenuItem value="Popular">Popular</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                                    <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button style={{ background: "#ffff", color: '#00cec9', fontWeight: 'bold' }} variant="contained" component="span" fullWidth> Upload </Button></label>
                                
                            </Grid>
                            <Grid item xs={6}>
                                <Avatar
                                    src={icon.filename}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={()=>handleSubmit()} style={{ background: "#ffff", color: '#00cec9', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Submit</Button>
                            </Grid><Grid item xs={6}>
                                <Button style={{ background: "#ffff", color: '#00cec9', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Reset</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>

        )
    }
// }
export default Brand;
