import { useState } from 'react';
import './Entry.css';
import Info from './info';
export default function EntryBut({ToPage2}){
    const [info,setInfo]=useState("");
     function ToInfo(){
        setShowComp1("False");
        setShowComp2("true");
    }
    return(
        <div className='body' >
        <div className='box'>
         <h3>StreamFlix</h3>
         <h4>100% Entertainment</h4>
         <button onClick={ToPage2}>Enter</button>
         <p>Watch movies online in excellent quality. Exclusively designed, 
            developed for ibappam.tv fans. Read</p> <button >More...</button>
         </div>
         </div>
    );
}