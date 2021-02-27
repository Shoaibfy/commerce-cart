import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {Link,useLocation} from 'react-router-dom'
import useStyles from './styles'

import img1 from '../../../assets/shoaib_img.jpeg'

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h5' className={classes.title} color='inherit'>
                        <img src={img1} style={{borderRadius:'55%',width:'40px',height:'50px',padding:'3px'}}  alt='teaGarden' height='25px' className={classes.image} />
                        Shoaib & co
                    </Typography>
                    <div className={classes.grow} />
                    {
                        location.pathname === '/' && (    
                            <div>
                      
                               <IconButton component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                                    <Badge badgeContent={totalItems} color='secondary'>
                                            <ShoppingCart />
                                    </Badge>
                                </IconButton>
                        </div>
                        ) 
                    }
                 
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
