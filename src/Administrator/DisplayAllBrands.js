import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@mui/styles";
import { postData, postDataImage, getData, ServerURL } from "../FetchNodeServices";
import Dialog from "@mui/material/Dialog";
import { alpha, styled } from "@mui/material/styles";
import { Grid, TextField, Button, Avatar, Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #FFF",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: "#FFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFF",
    },
  },
});
const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subdiv: {
    background: "#7ed6df",
    padding: 20,
    width: 1000,
    marginTop: 50,
  },

  droot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dsubdiv: {
    background: "#7ed6df",
    padding: 20,
    width: 1000,
    marginTop: 50,
  },
});

export default function DisplayAllBrands(props) {
    const classes = useStyles();
    const [List, setList] = useState([]);
    const [open, setOpen] = useState(false)
    const [icon, setIcon] = useState({ bytes: "", filename: "/brand.jpeg" })
    const [showButton, setShowButton] = useState(false)
    const [btn, setbtn] = useState(true)
    const [categoryId, setcategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandid, setBrandId] = useState('')
    const [brandname, setBrandName] = useState('')
    const [status, setStatus] = useState('')
    const [tempIcon, settempIcon] = useState('')
    const [Clist,setCList]=useState([])
    const [SClist,setSCList] =useState([])

    const handleIconChange = (event) => {
        setShowButton(true)
        setbtn(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconSave = async () => {
        var formData = new FormData()
        formData.append('brandid', brandid)
        formData.append('brandicon', icon.bytes)
        var result = await postDataImage('brand/editicon', formData)
        if (result.result) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your icon has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Your icon has not been updated',
                showConfirmButton: false,
                timer: 1500
            })
        }
        fetchSubCategories()
    }

    const deleteData = async (rowData) => {

        setOpen(false)

        Swal.fire({
            title: 'Are you sure You want to Delete This Record Permanently',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonColor: 'red',
            denyButtonColor: 'green',
            denyButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var result1 = postData('brand/deletedata', { brandid: (rowData.brandid) })

                Swal.fire('Deleted!', rowData.brandname + '  Brand has been deleted.', 'success')
                fetchallbrands()
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')

            }


        }
        )
    }

    const editData = async () => {

        var result = await postData('brand/editdata', 
        {categoryId:categoryId,
            subcategoryId:subCategoryId,
            brandid:brandid,
            brandname:brandname,
             status:status })
        // alert("edit brands called"+" "+ brandid+" "+ brandname+" "+ status)
        setOpen(false)
        if (result.result) {

            Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: 'Your Brand has been Updated',
                showConfirmButton: true,
                timer: 5000
            })
        }
        else {
            Swal.fire({
                position: "top-middle",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Brand',

            })
        }
        fetchallbrands()

    }

    const fetchallbrands = async () => {
        var result = await getData("brand/displayallbrands")
        setList(result.result)
        // alert('subcategories called')
    }



    const fetchSubCategories = async (cid) => {
        var result = await postData("subcategories/displaysubcategory",{categoryid:cid})
        setSCList(result.result)
    // alert('subcategories called')
    }

    const fetchCategories = async () => {
        var result = await getData("categories/displayallcategories")
        setCList(result.result)
        // alert('categories called')

    }


    useEffect(() => {
        fetchallbrands()
        fetchCategories()
        
    }, [])

    const handleCancel = () => {
        setShowButton(false)
        setbtn(true)
        setTimeout(() => {
            setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
        }, 0.5);

    }

    const handleOpen = (rowData) => {
        fetchSubCategories(rowData.categoryid)
        setStatus(rowData.status)
        setBrandId(rowData.brandid)
        setBrandName(rowData.brandname)
        
        setcategoryId(rowData.categoryid)
        
        setSubCategoryId(rowData.subcategoryid)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.brandicon}` })
        setOpen(true)
        settempIcon(rowData.brandicon)
    }
    const handleClose = () => {
        setOpen(false)
        fetchallbrands()
    }

    const handleChange = async  (event) => {
        setcategoryId(event.target.value);
        var result = await postData("subcategories/displaysubcategory", { categoryid: event.target.value })
        setSCList(result.result)

    };

    const handleChanged = (event) => {
        setSubCategoryId(event.target.value)
       
        
    }


    const fillCategory = () => {
        return Clist.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategory = () => {
        return SClist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }


  const showDialog = () => {
    return (
      <div>
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            <div className={classes.root}>
              <div className={classes.subdiv}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
                    Sub Categories
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Category</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={categoryId} label="Category" onChange={handleChange}>
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
                                        value={subCategoryId}
                                        label="SubCategory "
                                        onChange={handleChanged}
                                        variant="outlined"
                                    >
                                        {fillSubCategory()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField onChange={(event)=>setBrandName(event.target.value)} label="Brand Name" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} value={brandname} inputProps={{ style: { color: "#fff" } }} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                    <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Status </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        variant="outlined"
                                        onChange={(event)=>setStatus(event.target.value)}
                                    >
                                        <MenuItem value="Top Brands">Top Brands</MenuItem>
                                        <MenuItem value="Trending">Trending</MenuItem>
                                        <MenuItem value="Popular">Popular</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                          
                          
                                    
                                    <Grid item xs={12}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => editData()}
                                                component="span" fullWidth>
                                                Edit Data
                                            </Button>
                                        </label>

                                    </Grid>
                                    <Grid item xs={12}><Divider color="white"
                                    /></Grid>

                                    <Grid item xs={6}>
                                        {btn ? <label htmlFor="contained-button-file">
                                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                                            <center> <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF", }} variant="contained" component="span" >
                                                Upload Image
                                            </Button>
                                            </center>
                                        </label> : <div></div>
                                        }
                                        {showButton ? <div>
                                            <Button onClick={() =>  handleIconSave()} style={{ fontWeight: "bold", color: "#FFF" }} component="span" >
                                                Save
                                            </Button>
                                            <Button onClick={() => handleCancel()} style={{ fontWeight: "bold", color: "#FFF" }} component="span" >
                                                cancel
                                            </Button>
                                        </div> :
                                            <div>

                                            </div>
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Avatar
                                            alt="no Image"
                                            src={icon.filename}
                                            variant="rounded"
                                            sx={{ width: 80, height: 50 }}

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
  };

  /**********************Dialog End ****************************************************/
  function display() {
    return (

        <MaterialTable
            title="List of Brand Items"


            columns={[
                {
                    title: 'Brand ID', field: 'brandid',
                  

                },
                {
                    title: <font size="3">Category Id</font>, field: 'categoryid',

                   
                },
                {
                    title: <font size="3">Sub-Category Id</font>, field: 'subcategoryid',

                   
                },
                
                {
                    title: 'Brand Name', field: 'brandname',

                 
                },

                {
                    title: 'Brand Status', field: 'status'},
                {
                    title: 'Brand Icon', field: 'brandicon',

                    render: rowData => <img src={`${ServerURL}/images/${rowData.brandicon}`} style={{ width: 100, height: "70%", borderRadius: "5px" }} />
                },

            ]}
            data={List}
            actions={[
                {
                    icon: "edit",
                    tooltip: 'Edit Brand',
                    onClick: (event, rowData) => handleOpen(rowData)
                },
                {
                    icon: "delete",
                    tooltip: 'Delete Brand',
                    onClick: (event, rowData) => deleteData(rowData)
                },

            ]}
        />


    )
}

return (
    <div>

        <div className={classes.root}>

            <div className={classes.subdiv}>
                {display()},
                {showDialog()}
            </div>

        </div>
    </div>
)

}
