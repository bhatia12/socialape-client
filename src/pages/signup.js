import React, { Component } from 'react';
import withStyle from '@material-ui/core/styles/withStyles';
import AppIcon from '../images/icon.png'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

import {connect} from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        testAlign: 'center',
         
     },
     image:{
         margin: '20px auto 20px auto'
     },
     pageTitle:{
         fontSize: '1.75rem',
         margin: '10px auto 10px auto'
     },
     textfield:{
         margin: '10px auto 10px auto'
     },
     button:{
         margin: '10px auto 10px auto',
         position: 'relative'
     },
     app:{
         textAlign: 'center'
     },
     customError: {
         color: 'red',
         fontSize: '0.8rem',
         marginTop: 10
     },
     progress:{
         position: 'absolute'
     }
 };

class signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            coinfirmPassword:'',
            handle:'',
            errors: {}
        }
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors})
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            loading:true
        });
        const newUserData = {
            email:this.state.email,
            password:this.state.password,
            coinfirmPassword:this.state.coinfirmPassword,
            handle:this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }   
    
    render() {
        const { classes, UI: {loading} } =this.props;
        const {errors, } = this.state;
        return (
            <Grid container direction="row"
            justify="center"
            alignItems="center" className={classes.form}>
                <Grid item sm/>
                <Grid item sm alignItems="center" className={classes.app}>
                    <img src={AppIcon} alt="logo" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                       Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        className={classes.textfield}
                        value={this.state.email} 
                        onChange={this.handleChange} fullWidth/>
                        
                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textfield}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange} fullWidth/>

                        <TextField 
                        id="coinfirmPassword" 
                        name="coinfirmPassword" 
                        type="password" 
                        label="Coinfirm Password" 
                        className={classes.textfield}
                        helperText={errors.coinformPassword}
                        error={errors.coinformPassword ? true : false}
                        value={this.state.coinformPassword} 
                        onChange={this.handleChange} fullWidth/>

                        
                        <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle" 
                        className={classes.textfield}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={this.state.handle} 
                        onChange={this.handleChange} fullWidth/>

                        {errors.general &&(
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}   
                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}>

                           SIGN UP
                            {loading &&
                                <CircularProgress size={20} className={classes.progress}/>
                            }
                        </Button>
                        <br />
                        <small>Already have an account ? login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyle(styles)(signup))

