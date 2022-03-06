import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Button,
    Grid,
    Typography,
    Paper,
    Avatar,
    Container
} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import  { useDispatch } from 'react-redux'
import { signup, signin } from '../../actions/auth'
import { AUTH } from '../../constants/actionTypes'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp)
        setShowPassword(false)
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSubmit = e => {
        e.preventDefault()
        if(isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const googleSuccess = async res => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: AUTH, data: {result, token}})
            navigate("/")
        } catch (error) {
           console.log(error) 
        }
    }

    const googleFailure = (error) => {
        console.log('Google sign in was unsuccessful. Please try later.')
        console.log(error)
    }

    return <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
                {
                    isSignUp ? 'Sign Up' : 'Sign In'
                }
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && <>
                            <Input
                                name="firstName"
                                label="First Name"
                                handleChange={handleChange}
                                half
                            />
                            <Input
                                name="lastName"
                                label="Last Name"
                                handleChange={handleChange}
                                half
                            />
                        </>
                    }
                    <Input
                        name="email"
                        label="Email"
                        type='email'
                        handleChange={handleChange}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        handleShowPassword={handleShowPassword}
                        handleChange={handleChange}
                    />
                    {
                        isSignUp && 
                        <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            type='password'
                            handleChange={handleChange}
                        />
                    }
                </Grid>
                <Button
                    fullWidth
                    type='submit'
                    color='primary'
                    variant='contained'
                    className={classes.submit}
                >
                    {
                        isSignUp ? 'Sign Up' : 'Sign In'
                    }
                </Button>
                <GoogleLogin
                    clientId={'1068850605287-o1pignk020ft6da6c5ijovube2km1k49.apps.googleusercontent.com'}
                    render={props => <Button
                            onClick={props.onClick}
                            disabled={props.disabled}
                            startIcon={<Icon />}
                            fullWidth
                            color="primary"
                            variant='contained'
                            className={classes.boobleButton}
                        >
                            Google Sign In
                        </Button>
                    }
                    cookiePolicy='single_host_origin'
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                />
                <Grid container justifyContent="center">
                    <Grid item>
                        <Button  onClick={switchMode}>
                            {
                                isSignUp ? 
                                "Already have an account? Sign In" :
                                "Don't have an account? Sign Up"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
}

export default Auth