
import { useState,useNavigate } from 'react';
import App from './App.jsx' 
import EntryBut from './Entry.jsx'
export default function Entry(){
    const [showComp2,setShowComp2]=useState("False");
    const [showComp1,setShowComp1]=useState("True")
    function ToPage1(){
        setShowComp2("false");
        console.log(showComp2);
    }
    function ToPage2(){
        setShowComp1("False");
        setShowComp2("true");
    }
   
    return(
        <div className='body'>
        
        {showComp2=="true"?<App ToPage1={ToPage1}  />: <EntryBut ToPage2={ToPage2}/>}
        </div>
    );
}


