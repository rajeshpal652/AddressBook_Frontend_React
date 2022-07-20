import React from 'react';
import { Button, TextField } from '@mui/material';
import './login.scss'
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const[textfieldvalues,setTextfieldvalues]= React.useState({
        emailId : "",
        password : "",
        emailIdError: false,
        passwordError: false
    })
    const changeFields=(e)=>{
        setTextfieldvalues(previousvalues=>{
           return {...previousvalues,[e.target.name]:e.target.value}
        })
    }
    const validate=()=>{
        let emailIdError = textfieldvalues.emailId==='' ? true : false
        let passwordError = textfieldvalues.password==='' ? true : false
        setTextfieldvalues((previousvalues)=>{
            return {...previousvalues,emailIdError: emailIdError ,passwordError : passwordError}
        })
        return emailIdError||passwordError

    }
    const login =()=> {
        let isValidate = validate();
        if(!isValidate){
            let data={
                "emailId":textfieldvalues.emailId,
                "password" : textfieldvalues.password
            }
            UserService.login(data).then((data)=>{
                console.log(data);
                console.log("login success");
                alert("Successfully logged in !");
                navigate("/home");
            }).catch((err)=>{
                console.log("login error" + err);
                alert("Login is failed " + err);
            })
        }
    }
    return (<>
        <div className='login'>
            <div className='mail'>
                <TextField name ="emailId" className="emailfield" style={{ backgroundColor: 'white' }} size="small" type='text' id="outlined-email" label="Email Id" variant="outlined"
                onChange={(e)=>changeFields(e)} error={textfieldvalues.emailIdError}/>
            </div>
            <div>
                <TextField name="password" className="passwordfield" style={{ backgroundColor: 'white' }} size="small" type='password' id="outlined-password" label="Password" variant="outlined"
               onChange={(e)=>changeFields(e)} error ={textfieldvalues.passwordError} />
            </div>
            <br></br>
            <Button className='loginbutton' style={{ backgroundColor: '#A03037' }} onClick={()=>login()} > Login </Button>
            <p className='mid'>OR</p>
            <div className='Buttons'>
                <div className='facebookbButton'>
                    <Button style={{ backgroundColor: '#4266B2' }} variant="contained">Facebook</Button>
                </div>
                <div className='googleButton'>
                    <Button variant="contained">Google</Button>
                </div>
            </div>
        </div>
    </>);
}

export default Login;