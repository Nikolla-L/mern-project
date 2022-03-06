import React, { useState } from 'react'
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

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const classes = useStyles()

    const handleChange = () => {
        
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp)
        handleShowPassword(false)
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSubmit = () => {

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