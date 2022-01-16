import React, {useState, useEffect} from 'react';
import { setInterval } from 'timers';
import {Redirect} from 'react-router';
// import { Redirect } from '../../../node_modules/@types/react-router';
// import {form} from 'ant-mobile';

const Login = (props) => {
    const createName = () => {
        console.log('createName')
        return '';
    }
    const [name, setName] = useState(() => createName());
    const [password, setPassword] = useState('');
    const [redirectToReferrer, setRedirectToRerrer] = useState(false);
    const [timer, setTimer] = useState();

    // useEffect(() => {
    //     return {
    //         timer
    //     }
    // }, [])
    
    const handleSubmit = () => {
        if (!name || !password) {
            alert('用户名或密码不能为空')
        }

        setTimer(setTimeout(() => {
            alert('提交成功')
            setRedirectToRerrer(true)
        }))
    }

    const handleChange = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const type = e.target.name;
        const value = e.target.value;

        if (type === 'name') {
            setName(value);
        } else if (type === 'password') {
            setPassword(value);
        }
    }

    return (
        <div>{
            redirectToReferrer 
            ?  <Redirect to={props.from}></Redirect>
             : <form onSubmit={handleSubmit}>
             <input name="name" type="text" value={name} onChange={handleChange}/>
             <input name="password" type="text" value={password} onChange={handleChange}/>
             <input name="submit" type="submit"/>
            </form>
         }
         </div>
    )
}

export default Login;