import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
} from "@mui/material";

import WhatshotIcon from "@mui/icons-material/Whatshot";

import { CheckBox } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  quantity: Yup.string().required("Quantity is required"),
  requiredPrice: Yup.number().required("Required Price is required"),
  paymentTerms: Yup.string().required("Payment Terms is required"),
  liftingDays: Yup.number().required("Lifting Days is required"),
  expiry: Yup.string().required("Expiry is required"),
  address: Yup.string().required("Address is required"),
});
function BuyingComponent(props) {
  const [selectedVessels, setSelectedVessels] = useState([]);
  const formik = useFormik({
    initialValues: {
      quantity: "",
      requiredPrice: "",
      paymentTerms: "",
      liftingDays: "",
      expiry: "",
      address: `${props.selContractDetails?.vessel_attributes[0]?.port?.port_name} ${props.selContractDetails?.vessel_attributes[0]?.port?.location}`,
      hotListing: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Form submission logic here
      console.log(values);
    },
  });
  const listNames = [
    "30 Minutes",
    "1 Hour",
    "2 Hours",
    "4 Hours",
    "8 Hours",
    "Today",
    "2 Days",
    "7 Days",
    "15 Days",
    "30 Days",
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog
        open={formik.isSubmitting}
        onClose={() => {
          formik.resetForm();
          setSelectedVessels([]);
        }}
      >
        <DialogTitle>Form Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for submitting the form. Here are the entered values:
          </DialogContentText>

          <ul>
            <li>
              {selectedVessels.length > 0 && (
                <>Selected Vessels: {selectedVessels.join(", ")}</>
              )}
            </li>
            <li>Quantity: {formik.values.quantity} MT</li>
            <li>Required Price: {formik.values.requiredPrice} USD/MT</li>
            <li>Payment Terms: {formik.values.paymentTerms}</li>
            <li>Lifting Days: {formik.values.liftingDays}</li>
            <li>Expiry: {formik.values.expiry}</li>
            <li>Address: {formik.values.address}</li>
            <li>
              Make Your Listing Hot?: {formik.values.hotListing ? "Yes" : "No"}
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.resetForm} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container gap={2}>
        <Grid item xs={12} md={6}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Vessels
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <Select
              value={selectedVessels}
              onChange={(e) => {
                setSelectedVessels(e.target.value);
                console.log(e.target.value);
              }}
              onBlur={formik.handleBlur}
              sx={{
                minWidth: "100%",
              }}
              multiple
              size="small"
            >
              {props.selContractDetails?.vessel_attributes?.map((item) => (
                <MenuItem value={item.vessel_name}>{item.vessel_name}</MenuItem>
              ))}
            </Select>
            {formik.errors.vessels && formik.touched.vessels && (
              <Typography variant="body2" color="error">
                {formik.errors.vessels}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item md={2} xs={12}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Quantity
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <TextField
              value={formik.values.quantity}
              onChange={formik.handleChange}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">MT</InputAdornment>
                ),
              }}
              name="quantity"
            />
            {formik.errors.quantity && formik.touched.quantity && (
              <Typography variant="body2" color="error">
                {formik.errors.quantity}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item md={3} xs={12}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Required Price
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <TextField
              value={formik.values.requiredPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              name="requiredPrice"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">USD/MT</InputAdornment>
                ),
              }}
            />
            {formik.errors.requiredPrice && formik.touched.requiredPrice && (
              <Typography variant="body2" color="error">
                {formik.errors.requiredPrice}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          marginTop: 4,
        }}
      >
        <Grid item xs={12} md={4}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Payment Terms
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <Select
              value={formik.values.paymentTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="paymentTerms"
              size="small"
              sx={{
                minWidth: "100%",
              }}
            >
              <MenuItem value={"advance"}>Advance</MenuItem>
              <MenuItem value={"letter of credit"}>Letter of Credit</MenuItem>
              <MenuItem value={"Credit"}>Credit</MenuItem>
              <MenuItem value={"Cash & Carry"}>Cash & Carry</MenuItem>
            </Select>
            {formik.errors.paymentTerms && formik.touched.paymentTerms && (
              <Typography variant="body2" color="error">
                {formik.errors.paymentTerms}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item md={4} xs={12}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Lifting Days
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <TextField
              value={formik.values.liftingDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="liftingDays"
              size="small"
            />
            {formik.errors.liftingDays && formik.touched.liftingDays && (
              <Typography variant="body2" color="error">
                {formik.errors.liftingDays}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item md={3} xs={12}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Expiry
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <Select
              value={formik.values.expiry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="expiry"
              sx={{
                minWidth: "100%",
              }}
              size="small"
            >
              {listNames?.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            {formik.errors.expiry && formik.touched.expiry && (
              <Typography variant="body2" color="error">
                {formik.errors.expiry}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          marginTop: 4,
        }}
      >
        <Grid item md={8} xs={12}>
          <FormControl
            sx={{
              minWidth: "100%",
            }}
          >
            <FormLabel>
              <Typography variant="subtitle1" component="span">
                Address
              </Typography>
              <Typography variant="subtitle2" component="span" color="error">
                *
              </Typography>
            </FormLabel>
            <TextField
              value={`${props.selContractDetails?.vessel_attributes[0]?.port?.port_name} ${props.selContractDetails?.vessel_attributes[0]?.port?.location}`}
              size="small"
              disabled
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          marginTop: 4,
        }}
      >
        <FormControl
          sx={{
            minWidth: "100%",
          }}
        >
          <FormLabel>
            <Typography variant="subtitle1" component="span">
              Make Your Listing Hot?
            </Typography>
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Checkbox
              checked={formik.values.hotListing}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="hotListing"
              color="primary"
            />
            <Typography variant="subtitle1">Hot</Typography>
            <WhatshotIcon
              sx={{
                color: "#E64842",
                fontSize: 12,
              }}
            />
          </Box>
        </FormControl>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          marginTop: 4,
        }}
      >
        <Button
          variant="contained"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          SUBMIT YOUR REQUIREMENT
        </Button>
      </Grid>
    </form>
  );
}

export default BuyingComponent;
