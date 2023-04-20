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

export default function DisplayAllSubCategories(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [scList, setSCList] = useState([]);
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");
  const [icon, setIcon] = useState({ bytes: "", filename: "/image.png" });
  const [tempIcon, setTempIcon] = useState("");
  const [btnStatus, setBtnStatus] = useState(true);

  const handleCancel = () => {
    setShowButton(false);
    setBtnStatus(true);
    setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` });
  };

  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid);
    setSubcategoryId(rowData.subcategoryid);
    setSubcategoryName(rowData.subcategoryname);
    setSubcategoryDescription(rowData.description);
    setIcon({ bytes: "", filename: `${ServerURL}/images/${rowData.icon}` });
    setTempIcon(rowData.icon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchSubCategories();
  };

  /***********************Dialog ****************************************************/

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const fetchCategories = async () => {
    var result = await getData("categories/displayallcategories");
    setList(result.result);
  };
  useEffect(function () {
    fetchCategories();
  }, []);

  const fillCategory = () => {
    return list.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    });
  };

  const handleIconChange = (event) => {
    setShowButton(true);
    setBtnStatus(false);
    setIcon({
      bytes: event.target.files[0],
      filename: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleIconSave = async () => {
    var formData = new FormData();
    formData.append("subcategoryid", subcategoryId);
    formData.append("icon", icon.bytes);
    var result = await postDataImage("subcategories/editicon", formData);
    if (result.result) {
      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Your Sub-Category Icon has been Updated",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setShowButton(false);
    setBtnStatus(true);
  };

  const handleDelete = async (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var dresult = await postData("subcategories/deletedata", { subcategoryid:rowData.subcategoryid });
        if (dresult.result) {
          Swal.fire("Deleted!", "Your Sub-Category has been deleted.", "success");
          fetchSubCategories();
        }
      }
    });

   
  };
  const handleSubmit = async () => {
    var result = await postData("subcategories/editdata", {
      categoryid: categoryId,
      subcategoryid: subcategoryId,
      subcategoryname: subcategoryName,
      subcategorydescription: subcategoryDescription,
    });
    if (result.result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Categories has been updated",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

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
                    <CssTextField
                      variant="outlined"
                      value={subcategoryName}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Sub Category Name"
                      onChange={(event) => setSubcategoryName(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      value={subcategoryDescription}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Description"
                      onChange={(event) => setSubcategoryDescription(event.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      onClick={() => handleSubmit()}
                      style={{
                        background: "#FFF",
                        color: "#7ed6df",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                      fullWidth
                    >
                      Edit Data
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider style={{ background: "#FFF" }} />
                  </Grid>

                  <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {btnStatus ? (
                      <>
                        <label htmlFor="contained-button-file">
                          <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                          <Button
                            style={{
                              background: "#FFF",
                              color: "#7ed6df",
                              fontWeight: "bold",
                            }}
                            variant="contained"
                            component="span"
                            fullWidth
                          >
                            Upload
                          </Button>
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                    {showButton ? (
                      <div>
                        {" "}
                        <Button onClick={handleIconSave} style={{ color: "#FFF", fontWeight: "bold" }}>
                          Save
                        </Button>
                        <Button onClick={handleCancel} style={{ color: "#FFF", fontWeight: "bold" }}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={icon.filename}
                      // variant="rounded"
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
  };

  /**********************Dialog End ****************************************************/
  const fetchSubCategories = async () => {
    var result = await getData("subcategories/displayallsubcategories");
    setSCList(result.result);
  };

  useEffect(function () {
    fetchSubCategories();
  }, []);

  function display() {
    return (
      <MaterialTable
        title="List Sub-Categories"
        columns={[
          { title: "Sub-Category ID", field: "subcategoryid" },
          { title: "Category ID", field: "categoryid" },
          { title: "Sub-Category Name", field: "subcategoryname" },
          { title: "Description", field: "description" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 60, borderRadius: "25%" }} alt="" />,
          },
        ]}
        data={scList}
        actions={[
          {
            icon: "edit",
            tooltip: "edit subcategory",
            onClick: (event, rowData) => {
              handleOpen(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div>
      <div className={classes.droot}>
        <div className={classes.dsubdiv}>
          {display()}
          {showDialog()}
        </div>
      </div>
    </div>
  );
}
