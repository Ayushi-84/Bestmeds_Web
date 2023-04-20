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
    width: 1500,
    marginTop: 50,
  },
});

export default function DisplayAllProducts(props) {
  const classes = useStyles();
  const [categorylist, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [subcategoryId, setSubcategoryId] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerType, setOfferType] = useState("");
  const [salesStatus, setSalesStatus] = useState("");
  const [list, setList] = useState([]);
  const [subCategoryList, setSubcategoryList] = useState([]);
  const [brandlist, setBrandList] = useState([]);

  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState({ bytes: "", filename: "/image1.png" });
  const [showButton, setShowButton] = useState(false);
  const [tempIcon, setTempIcon] = useState("");
  const [btnStatus, setBtnStatus] = useState(true);

  const handleCancel = () => {
    setShowButton(false);
    setBtnStatus(true);
    setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` });
  };

  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid);
    fetchSubcategories(rowData.categoryid);
    fetchBrands(rowData.subcategoryid);
    setSubcategoryId(rowData.subcategoryid);
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    setProductName(rowData.productname);
    setDescription(rowData.description);
    setPrice(rowData.price);
    setOfferPrice(rowData.offerprice);
    setOfferType(rowData.offertype);
    setStock(rowData.stock);
    setStatus(rowData.status);
    setSalesStatus(rowData.salestatus);
    setIcon({ bytes: "", filename: `${ServerURL}/images/${rowData.picture}` });
    setTempIcon(rowData.picture);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchProducts();
  };

  /***********************Dialog ****************************************************/
  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    fetchSubcategories(event.target.value);
  };

  const fetchCategories = async () => {
    var result = await getData("categories/displayallcategories");
    setCategoryList(result.result);
  };
  useEffect(function () {
    fetchCategories();
  }, []);

  const fillCategory = () => {
    return categorylist.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handleSubCategoryChange = (event) => {
    setSubcategoryId(event.target.value);
    fetchBrands(event.target.value);
  };

  const fetchSubcategories = async (cid) => {
    var result = await postData("subcategories/displaysubcategory", { categoryid: cid });
    setSubcategoryList(result.result);
  };

  const fillSubcategory = () => {
    return subCategoryList.map((item) => {
      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
    });
  };

  const handleBrandChange = (event) => {
    setBrandId(event.target.value);
  };

  const fetchBrands = async (scid) => {
    var result = await postData("brand/displaybrands", { subcategoryid: scid });
    setBrandList(result.result);
  };
  useEffect(function () {
    fetchBrands();
  }, []);

  const fillBrands = () => {
    return brandlist.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  const handleStatusChange = (status) => {
    setStatus(status.target.value);
  };
  const handleSaleStatusChange = (salesStatus) => {
    setSalesStatus(salesStatus.target.value);
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
    formData.append("productid", productId);
    formData.append("icon", icon.bytes);
    var result = await postDataImage("products/editicon", formData);
    if (result.result) {
      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Your Product Icon has been Updated",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "fail",
        title: "Fail to update product Icon",
        showConfirmButton: false,
        timer: 1500,
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
        var dresult = await postData("products/deletedata", { productid: rowData.productid });
        if (dresult.result) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        }
      }
      fetchProducts();
    });
  };

  const handleSubmit = async () => {
    var result = await postData("products/editdata", {
      categoryid: categoryId,
      subcategoryid: subcategoryId,
      brandid: brandId,
      productid: productId,
      productname: productName,
      description: description,
      price: price,
      offerprice: offerPrice,
      offertype: offerType,
      stock: stock,
      status: status,
      salestatus: salesStatus,
    });
    if (result.result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your products has been updated",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "fail",
        title: "Fail to update products",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            <div className={classes.root}>
              <style jsx>
                {`
                  fieldset.MuiOutlinedInput-notchedOutline {
                    border-color: white !important;
                  }

                  svg.MuiSvgIcon-root {
                    color: white !important;
                  }

                  div.MuiOutlinedInput-input.MuiSelect-select {
                    color: #fff !important;
                  }
                `}
              </style>

              <div className={classes.subdiv}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
                    Edit Products
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryId}
                        label="Category"
                        onChange={(event) => handleCategoryChange(event)}
                      >
                        {fillCategory()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Sub Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subcategoryId}
                        label="Sub Category"
                        onChange={(event) => handleSubCategoryChange(event)}
                      >
                        {fillSubcategory()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Brands
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandId}
                        label="Brands"
                        onChange={(event) => handleBrandChange(event)}
                      >
                        {fillBrands()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <CssTextField
                      variant="outlined"
                      value={productName}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Product Name"
                      onChange={(event) => setProductName(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CssTextField
                      variant="outlined"
                      value={description}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Description"
                      onChange={(event) => setDescription(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      variant="outlined"
                      value={price}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Product Price"
                      onChange={(event) => setPrice(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      variant="outlined"
                      value={offerPrice}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Offer Price"
                      onChange={(event) => setOfferPrice(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      variant="outlined"
                      value={offerType}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Offer Type"
                      onChange={(event) => setOfferType(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      variant="outlined"
                      value={stock}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Products In Stock"
                      onChange={(event) => setStock(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={status} label="Status" onChange={handleStatusChange}>
                        <MenuItem value={"continue"}>Continue</MenuItem>
                        <MenuItem value={"discontinue"}>Discontinue</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Sales Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={salesStatus}
                        label="Sales Status"
                        onChange={handleSaleStatusChange}
                      >
                        <MenuItem value={"Trending"}>Trending</MenuItem>
                        <MenuItem value={"Most Selling"}>Most Selling</MenuItem>
                        <MenuItem value={"Popular"}>Popular</MenuItem>
                      </Select>
                    </FormControl>
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

  const fetchProducts = async () => {
    var result = await getData("products/displayallproducts");
    setList(result.result);
  };
  useEffect(function () {
    fetchProducts();
  }, []);

  function display() {
    return (
      <MaterialTable
        title="List Products"
        columns={[
          { title: "Product ID", field: "productid" },
          { title: "Category", field: "categoryname" },
          { title: "Sub-Category", field: "subcategoryname" },
          { title: "Brand", field: "brandname" },
          { title: "Product Name", field: "productname" },
          { title: "Description", field: "description" },
          { title: "Price", field: "price" },
          { title: "Offer Price", field: "offerprice" },
          { title: "Offer Type", field: "offertype" },
          { title: "Stock", field: "stock" },
          { title: "Status", field: "status" },
          { title: "Sales Status", field: "salestatus" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 60, borderRadius: "25%" }} alt="" />,
          },
        ]}
        data={list}
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
