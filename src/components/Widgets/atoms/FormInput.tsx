/*
  File contains definations of <FormInput/> component used in /account/create and /account/login
  for the login/register form
*/
import {HTMLInputTypeAttribute,ChangeEventHandler} from "react" // Importing classes from react

interface FormInputProps {
	inputHasError:boolean|string,
	inputType:HTMLInputTypeAttribute,
	value:string | string[],
	onChange: ChangeEventHandler<HTMLInputElement>,
	placeHolder?:string,
	className?:string
}


const FormInput = (props: FormInputProps) => {
	return (
		<input 
			type={props.inputType}
			className={`mt-10 w-full p-2 outline-none bg-transparent text-white rounded border-gray-600 ${props.inputHasError ? 'border-red-600 animate__animated animate__headShake animate__faster' : ""} border ${props.className}`} 
			placeholder={props.placeHolder}
			onChange={props.onChange}
			value={props.value}
			/>
	);
};

export default FormInput;
