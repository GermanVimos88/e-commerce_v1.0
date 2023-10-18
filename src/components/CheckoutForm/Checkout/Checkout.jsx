import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';

import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

// API KEY PUBLIC (chec) = pk_19840575a9facac44327ea0ec81e58986780ff33e1e3e

const steps = ['Shipping address', 'Detalles del pago'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({}); 
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                //console.log(token);

                setCheckoutToken(token);

            } catch (error) {
                //console.log(error);
                                
                navigate('/'); //react-router-dom v.6           //history.push('/'); -->> History en react-router-dom v.5

            }
        }
        
        generateToken();

    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();

    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Gracias por tu compra, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Orden ref: {order.customer_reference} </Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Regresar al Inicio</Button>
        </>
    ) : isFinished ? (

        <>
            <div>
                <Typography variant="h5">Gracias por tu compra</Typography>
                <Divider className={classes.divider} />
                
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Regresar al Inicio</Button>
        </>
    ) : (    

        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <div>
                <Typography variant="h5">Error: {error}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Regreso al Inicio</Button>

        </>


    }

    const Form = () => activeStep === 0
            ? <AddressForm checkoutToken={checkoutToken} next={next} />
            : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={prevStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

            

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
