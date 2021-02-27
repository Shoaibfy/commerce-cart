import React,{useState,useEffect} from 'react'
import {InputLabel,Button,Select,MenuItem,Grid,Typography} from '@material-ui/core'
import {useForm,FormProvider} from 'react-hook-form'
import {Link} from 'react-router-dom';
import FormInput from './CustomTextField'
import {commerce} from '../../lib/Commerce'


const AddressForm = ({checkoutToken,next}) => {
    const methods = useForm()
    const [shippingCountries,setshippingCountries] = useState([])
    const [shippingCountry,setshippingCountry] = useState('')
    const [shippingSubdivisions,setshippingSubdivisions] = useState([]) 
    const [shippingSubdivision,setshippingSubdivision] = useState('')
    const [shippingOptions,setshippingOptions] = useState([])
    const [shippingOption,setshippingOption] = useState('')

    const countries = Object.entries(shippingCountries).map(([code,name]) => ({id:code,label:name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => ({id:code,label:name}))
    const options =Object.entries(shippingOptions).map((sO) => ({id:sO.id,label:`${sO.description} - (${sO.price.formatted_with_symbol})`}))
    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId)=>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        setshippingCountries(countries);
        setshippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countrycode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countrycode)
        setshippingSubdivisions(subdivisions)
        setshippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId,country,region=null) =>{
        const options = await commerce.getShippingOptions(checkoutTokenId,{country,region})
        setshippingOptions(options)
        setshippingOptions(options[0].id)
    }

    useEffect(()=>{
        console.log(checkoutToken)
        fetchShippingCountries(checkoutToken)
    },[])

    useEffect(() =>{
       if(shippingCountry) fetchSubdivisions()
    },[shippingCountry])

    useEffect(()=>{
        shippingSubdivision && fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
    },[shippingSubdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address    </Typography> 
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit((data)=> next(...data,shippingCountry,shippingSubdivision,shippingOption))}>
                    <Grid container spacing={3} >
                        <FormInput name='firstName' label='First Name'  />
                        <FormInput name='lastName' label='Last Name'  />
                        <FormInput name='address1' label=' Address' required />
                        <FormInput name='email' label=' Email' required />
                        <FormInput name='city' label=' City'  />
                        <FormInput name='zip' label=' Zip/Postal Code'  />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)} >
                               {countries.map((country) => (
                                     <MenuItem key={country.id} value={country.id}>
                                  {country.label}
                                 </MenuItem> 

                               ))}

                               
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivisions</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setshippingSubdivision(e.target.value)} >
                                {subdivisions.map((subdivisions)=>(
                                       <MenuItem key={subdivisions.id} value={subdivisions.id}>
                                       {subdivisions.label}
                                   </MenuItem>
                                ))}
                             
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=>setshippingOption(e.target.value)} >
                            {options.map((option)=>(
                                       <MenuItem key={option.id} value={option.id}>
                                       {option.label}
                                   </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button component={Link} to='/' variant='outlined' >Back to Cart</Button>
                                <Button type='submit' variant='contained'color='primary' >Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
