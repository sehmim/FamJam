import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import AddressForm from './Forms/AddressForm';
import PaymentForm from './Forms/PaymentForm';
import ReviewOrder from './ReviewOrder';
import CheckoutSuccess from './CheckoutSuccess';

import validationSchema from './FormModel/validationSchema';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formInitialValues from './FormModel/formInitialValues';

import useStyles from './styles';
import InternetCheck from './InternetCheck/InternetCheck';
import InterfaceCheck from './InterfaceCheck/InterfaceCheck';
import InterestsCheck from './InterestsCheck/InterestsCheck';
import InsightsCheck from './InsightsCheck/InsightsCheck';
import { Link } from 'react-router-dom';

const steps = [
  {
    stepText : 'Internet Speed' ,
    stepIcon : ""
  },
  {
    stepText : 'Interface' ,
    stepIcon : ""
  },
  {
    stepText : 'Interests' ,
    stepIcon : ""
  },
  {
    stepText : 'Insights' ,
    stepIcon : ""
  }
];
const { formId, formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      // return <AddressForm formField={formField} />;
      return <InternetCheck  />
    case 1:
      return <InterfaceCheck  />
      // return <PaymentForm formField={formField} />;
    case 2:
      return <InterestsCheck />
      // return <PaymentForm  />;
    case 3:
      return <InsightsCheck />;
    default:
      return <div>Not Found</div>;
  }
}

export default function CheckoutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [isSubmitting , setIsSubmitting] = useState(false)

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    setIsSubmitting(true)

    setActiveStep(activeStep + 1);
    setIsSubmitting(false)
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography p="5" component="h1" variant="h4" align="center">
        RIFFS HUB LOGO PLACEHOLDER
      </Typography>

      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label.stepText}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {/* {activeStep === steps.length ? (
          <CheckoutSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}> */}
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    {
                      isLastStep ?                         
                      <Link to="/room">
                        <Button>Start Jam</Button>
                      </Link>
                    :                   
                      <Button
                        disabled={isSubmitting}
                        onClick={_submitForm}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                      Next
                      </Button>
                    }

                    {/* {isSubmitting && ( */}
                      {/* <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      /> */}
                    {/* )} */}
                  </div>
                </div>
              {/* </Form>
            )}
          </Formik> */}
        {/* )} */}
      </React.Fragment>
    </React.Fragment>
  );
}
