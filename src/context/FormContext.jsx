import {createContext, useContext, useMemo, useState} from 'react';
import {initialValues, validateForm} from '../lib/validation.js';
export const FormContext=createContext(null);
export function FormProvider({children}) {const [values,setValues]=useState(initialValues); const [touched,setTouched]=useState({});
 const errors=useMemo(()=>validateForm(values),[values]); const isValid=Object.keys(errors).length===0;
 const handleChange=(event)=>{const {name,value}=event.target;setValues(prev=>({...prev,[name]:value}));};
 const handleBlur=(event)=>setTouched(prev=>({...prev,[event.target.name]:true}));
 return <FormContext.Provider value={{values,errors,isValid,touched,setTouched,handleChange,handleBlur}}>{children}</FormContext.Provider>;
}
export function useFormContext(){const context=useContext(FormContext); if(!context)throw new Error('FormProvider is missing'); return context;}