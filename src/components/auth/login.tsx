import { useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import useValidations from "../../hooks/useValidation";
import ShowFormErrorMessage from "../error-messages/show-form-error-message";



const Login = () => {

    // Hooks
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    //Validations
    const { emailValidation, passwordValidation } = useValidations();
    // React Hook Form
    const { register, handleSubmit, formState: { errors }, } = useForm<SignInDTO>();


    // FUNCTIONS
    const onSubmit = (data: SignInDTO) => {
        console.log(data);
    }




    return (
        <div className="px-8 py-5 max-[500px]:p-6  bg-white rounded-lg w-[400px] max-w-[500px] max-[500px]:w-[92vw] font-[Poppins] drop-shadow-sm drop-shadow-gray-400">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-[500px]:gap-2" >
                <h1 className="text-black text-2xl font-semibold  font-[Poppins]">Sign In</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-gray-600">Enter your credentials to access your account</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="email" className="font-medium text-sm">Email</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type="email" placeholder="Enter Email" {...register("email", emailValidation)} className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center after::">
                                <MdOutlineEmail fontSize={'20px'} />
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.email} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="password" className="font-medium text-sm">Password</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type={isShowPassword ? "text" : "password"} placeholder="Enter Password" {...register("password", passwordValidation)} id="password" className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => setIsShowPassword((prev) => !prev)}>
                                {isShowPassword ? <BsEyeSlash fontSize={'18px'} /> : <BsEye fontSize={'18px'} />}
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.password} />
                    </div>
                    <div className="flex  justify-between flex-wrap w-full my-1">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="" id="" />
                            <p className="text-[14px]">Remember me?</p>
                        </div>
                        <div className="w-full text-right">
                            <p className="text-[14px]  text-(--primary-color) font-medium text-right">Forgot password?</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <button className="bg-(--primary-color) text-white w-full py-[5px] rounded font-medium">Sign in</button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Don't have an account?</p>
                        <span className="text-(--primary-color) font-medium">Create one</span>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default Login;