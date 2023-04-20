import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import { Grid, TextField, Button, Avatar } from "@mui/material";
// import { borderRadius } from "@mui/system";
import { postDataImage, getData } from "../FetchNodeServices";
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

function Subcategories(props) {
  const classes = useStyles();
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");
  const [icon, setIcon] = useState({ bytes: "", filename: "/image1.png" });
  const [categoryId, setCategoryId] = React.useState("");
  const [list, setList] = useState([]);
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
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handleIconChange = (event) => {
    setIcon({
      bytes: event.target.files[0],
      filename: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryname", subcategoryName);
    formData.append("subcategorydescription", subcategoryDescription);
    formData.append("icon", icon.bytes);
    var result = await postDataImage(
      "Subcategories/saveSubcategories",
      formData
    );
    if (result.result) {
      Swal.fire({
        icon: "success",
        title: "Your SubCategory has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Fail to submit Sub Category",
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
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
      `}
    </style>
   
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}
          >
            Sub Categories
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                style={{ color: "#FFF" }}
                id="demo-simple-select-label"
              >
                Category
              </InputLabel>
             
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={categoryId}
                label="Category"
                onChange={handleChange}
              >
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
              InputLabelProps={{
                style: { color: "#FFF" },
              }}
              inputProps={{ style: { color: "#FFF" } }}
              label="Description"
              onChange={(event) =>
                setSubcategoryDescription(event.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <label htmlFor="contained-button-file">
              <Input
                onChange={(event) => handleIconChange(event)}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
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
                Upload Icon
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
              src={icon.filename}
              // variant="rounded"
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

export default Subcategories;
