import {useId} from 'react';
import {useFormContext} from '../context/FormContext.jsx';
export default function InputField({name,label,type='text',autoComplete}){const id=useId();const errorId=`${id}-error`;const {values,errors,touched,handleChange,handleBlur}=useFormContext();const error=touched[name]?errors[name]:undefined;
 return <div className="field-group"><label htmlFor={id}>{label}</label><input id={id} name={name} type={type} autoComplete={autoComplete} value={values[name]} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(error)} aria-describedby={error?errorId:undefined}/>{error&&<span id={errorId} role="alert" className="error">{error}</span>}</div>;
}