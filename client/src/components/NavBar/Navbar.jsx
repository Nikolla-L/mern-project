import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
    AppBar,
    Typography,
    Avatar,
    Toolbar,
    Button
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import memories from '../../images/memor.png'
import useStyles from './styles'
import { LOGOUT } from '../../constants/actionTypes'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const classes = useStyles()

    useEffect(() => {
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({type: LOGOUT})
        navigate('/')
        setUser(null)
        window.location.reload();
    }

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
                            onClick={logout}
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