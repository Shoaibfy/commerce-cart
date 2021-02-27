import React,{useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Button,Typography,CircularProgress,Divider,CssBaseline} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymenForm'
import {commerce} from '../../../lib/Commerce'
import {Link,useHistory} from 'react-router-dom'

const steps =['shippong Address','payment Details']

const Checkout = ({cart,order,error,onCaptureCheckout}) => {
    const classes = useStyles();
    const [activeStep,setActiveStep] = useState(0)
    const [shippingData,setShippingData] = useState({})
    const [checkoutToken,setCheckoutToken] = useState(null)
    const [isFinished,setIsFinished] =useState(false)
    const history =useHistory();

   useEffect(()=>{
    const generateToken = async () => {
        try {

            const token = await commerce.checkout.generateToken(cart.id,{type:"cart"})
            console.log(token)
            setCheckoutToken(token)
        }
        catch (error) {
            console.log(error)
            history.pushState('/')
        }
    }
    generateToken();

   },[cart] )

   const nextStep =()=> setActiveStep((preActiveStep)=>preActiveStep + 1)
   const backStep =()=> setActiveStep((preActiveStep)=>preActiveStep - 1)

   const next =(data)=>{
    setShippingData(data)
    nextStep()
   }

   const timeout = ()=>{
       setTimeout(()=>{
          setIsFinished(true)
       },3000)
   }

    const Confirmation = () => order.customer ? (
        <> 
        <CssBaseline />
            <div>
                <Typography>
                    Thank you for your purchase {order.customer.firstname} {order.customer.lstname}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant='h5'>
                    your order ref : {order.customer_reference}
                </Typography>
                <Button variant='outlined'  component={Link} to='/' > Back to Home</Button>
            </div>
        </>
    ) : isFinished ? (
        <> 
        <CssBaseline />
            <div>
                <Typography>
                    Thank you for your purchase
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant='h5'>
                    your order confirmed
                </Typography>
                <Button variant='outlined'  component={Link} to='/' > Back to Home</Button>
            </div>
        </>
    ) :
    (
        <div className={classes.spinner} >
        <CircularProgress />

    </div>
    );
    if(error) {
        <>
        <Typography> Error :{error} </Typography>
        <Button variant='outlined' type='button' component={Link} to='/' > Back to Home</Button>
        <br />
        </>
    }

    const Form =() => activeStep === 0 
    ?  <AddressForm checkoutToken={checkoutToken} next={next} /> :
     <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} timeout={timeout} onCaptureCheckout={onCaptureCheckout}  />
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout} >
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center' > Checkout </Typography>
                <Stepper activeStep={0} className={classes.stepper} >
                    {steps.map(
                        (step) => (
                            <Step key={step} >
                                <StepLabel>
                                    {step}
                                </StepLabel>
                                
                            </Step>
                            )     
                    )}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
            </Paper>
            </main>
        </>
    )
}

export default Checkout
