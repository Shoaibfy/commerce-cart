import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,Menu,MenuItem,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import useStyles from './styles'



const Navbar = ({totalItems}) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant='h5' className={classes.title} color='inherit'>
                        <img src="https://source.unsplash.com/1400x400/?cat,garden" style={{borderRadius:'55%',width:'40px',height:'50px',padding:'3px'}}  alt='teaGarden' height='25px' className={classes.image} />
                        Shoaib & co
                    </Typography>
                    <div className={classes.grow} />
                    <div>
                        <IconButton aria-label='show cart items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
