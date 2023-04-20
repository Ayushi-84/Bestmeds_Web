import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import { Grid, TextField, Button, Avatar } from "@mui/material";
// import { borderRadius } from "@mui/system";
import { postDataImage, getData, postData } from "../FetchNodeServices";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subdiv: {
    background: "#7ed6df",
    padding: 20,
    width: 700,
    marginTop: 50,
  },
});
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

function Products(props) {
  const classes = useStyles();
  const [categoryId, setCategoryId] = React.useState("");
  const [subcategoryId, setSubcategoryId] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerType, setOfferType] = useState("");
  const [Stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [salesStatus, setSalesStatus] = useState("");
  const [image, setImage] = useState({ bytes: "", filename: "/image.png" });
  const [list, setList] = useState([]);
  const [subCategoryList, setSubcategoryList] = useState([]);
  const [brandlist, setBrandList] = useState([]);

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    fetchSubcategories(event.target.value);
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
  const clearValues=()=>{
   setCategoryId("")



  }
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

  const handleImageChange = (event) => {
    setImage({
      bytes: event.target.files[0],
      filename: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryid", subcategoryId);
    formData.append("brandid", brandId);
    formData.append("productname", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("offerprice", offerPrice);
    formData.append("offertype", offerType);
    formData.append("stock", Stock);
    formData.append("status", status);
    formData.append("salestatus", salesStatus);
    formData.append("picture", image.bytes);
    var result = await postDataImage("products/saveproducts", formData);
    if (result.result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Product has been saved",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "fail",
        title: "Fail to Save Product",
        showConfirmButton: false,
        timer: 1500,
      });
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

          div.MuiOutlinedInput-input.MuiSelect-select {
            color: #fff !important;
          }
        `}
      </style>

      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
            Products
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
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={brandId} label="Brands" onChange={(event) => handleBrandChange(event)}>
                {fillBrands()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <CssTextField
              variant="outlined"
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
              InputLabelProps={{
                style: { color: "#FFF" },
              }}
              inputProps={{ style: { color: "#FFF" } }}
              label="Offer Type"
              value={offerType}
              onChange={(event) => setOfferType(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CssTextField
              variant="outlined"
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
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={salesStatus} label="Sales Status" onChange={handleSaleStatusChange}>
                <MenuItem value={"Trending"}>Trending</MenuItem>
                <MenuItem value={"Most Selling"}>Most Selling</MenuItem>
                <MenuItem value={"Popular"}>Popular</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ justifyContent: "center", alignItems: "center" }}>
            <label htmlFor="contained-button-file">
              <Input onChange={(event) => handleImageChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
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
                Upload - Picture
              </Button>
            </label>
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
              src={image.filename}
              variant="rounded"
              sx={{ width: 70, height: 70 }}
            />
          </Grid>

          <Grid item xs={6}>
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
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{
                background: "#FFF",
                color: "#7ed6df",
                fontWeight: "bold",
              }}
              variant="contained"
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Products;
