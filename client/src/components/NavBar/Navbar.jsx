import React from 'react'
import { Link } from 'react-router-dom'
import { 
    AppBar,
    Typography,
    Avatar,
    Toolbar,
    Button
} from '@material-ui/core'
import memories from '../../images/memor.png'
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()

    const user = null

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    className={classes.heading} 
                    variant="h2"
                    align="center"
                >
                    Memories
                </Typography>
                <img
                    src={memories}
                    className={classes.image}
                    alt="img"
                    height="60"
                />
            </div>
            <Toolbar className={classes.toolBar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.result?.name}
                            src={user?.result?.imageUrl}
                        >
                            {user?.result?.name?.charAt(0)}
                        </Avatar>
                        <Typography className={classes.username} variant="h6">
                            {user?.result?.name}
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            color='secondary'
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar