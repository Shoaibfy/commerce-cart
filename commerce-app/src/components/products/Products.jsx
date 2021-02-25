import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles'

// const products = [
//     {
//         id:1,name:'shoes',description:"Running Shoes",price:'$5',image:"https://source.unsplash.com/1400x400/?shoes,legs" 
//     },
//     {
//         id:2,name:'MacBook',description:"Apple  MacBook",price:'$10',image:"https://source.unsplash.com/1400x400/?laptop,apple" 
//     }
// ]

const Products = ({products,onAddToCart} )=>{
    const classes = useStyles();
return(
    <main className={classes.content} >
        <div  className={classes.toolbar} />
    <Grid container justify='center' spacing={4} >
        { products.map((product,i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3} >
                <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
        )) }
    </Grid>
    </main>
)
}

export default Products