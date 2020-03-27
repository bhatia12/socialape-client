import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link} from 'react-router-dom';
import EditDetails from './EditDetails'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Paper, IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import { logoutUser, uploadImage } from '../redux/actions/userActions';


const styles = (theme) => ({
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    });


class Profile extends Component {

    handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = (e) => {
        const fileInput= document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
      };
    render() {
        const { classes, user:{credentials: {handle, createdAt, imageUrl, bio, website, location}, loading, authenticated}} =this.props
        
        let profileMarkup = !loading ? (authenticated ? (<Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" />
                    <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                    <Tooltip title="Edit profile pic" placement="top">
                        <IconButton onClick={this.handleEditPicture} className="button">
                            <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography> } 
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span> 
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreference">
                                {' '}{website}
                            </a>
                        </Fragment>
                    )}
                    <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MM YYYY')}</span> 
                </div>
                <Tooltip title="Logout" placement="top">
                    <IconButton onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                    </IconButton>
                </Tooltip>
                <EditDetails />
            </div>
        </Paper>) : (<Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No profile found, Please login again
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        SignUp
                    </Button>
                </div>
            </Typography>
        </Paper>)): (<p>...Loading</p>)

        return profileMarkup;
        
    }
}

const mapStateToProps = (state) => ({
    user:state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps) (withStyles(styles)(Profile))
