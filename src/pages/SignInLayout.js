import React, { useEffect, useState } from 'react'
import {SigninPage,CreateCampaign} from './index'
import { getcurrentuser } from '../context';
const SignInLayout = () => {
    const [isloggedin,setisloggedin] = useState(false);
    useEffect(() => {
        const res = getcurrentuser().res;
        console.log(res);
        if(res){
            setisloggedin(true);
        }
        else{
            setisloggedin(false);
        }
    },[])

    if(isloggedin == false){
        return (
            <SigninPage/>
        )
    }
    return (
        <CreateCampaign/>
    )
}

export default SignInLayout
