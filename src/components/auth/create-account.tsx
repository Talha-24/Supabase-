import { useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import useValidations from "../../hooks/useValidation";
import ShowFormErrorMessage from "../error-messages/show-form-error-message";
import { RiUserShared2Line } from "react-icons/ri";
import type { SignUpDTO } from "../../mixin/classes/sign-up.dto";
import { PiPhoneOutgoing } from "react-icons/pi";
import useNavigateHooks from "../../hooks/useNavigate";



const CreateAccount = () => {

    // Hooks
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const { emailValidation, passwordValidation, phoneNumberValidation, confirmPasswordValidation, validatePhoneNumber } = useValidations();
    const {goToSignIn,goTo}=useNavigateHooks();

    // React Hook Form
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm<SignUpDTO>();


    // FUNCTIONS
    const onSubmit = (data: SignInDTO) => {
        console.log(data);
    }



    



    return (
        <div className="px-8 py-5 max-[500px]:p-6  bg-white rounded-lg w-[400px] max-w-[500px] max-[500px]:w-[92vw] font-[Poppins] drop-shadow-sm drop-shadow-gray-400">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-[500px]:gap-2 overflow-x-auto max-h-[70vh]" >
                <h1 className="text-2xl font-semibold  font-[Poppins] text-(--primary-color)">Sign Up</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-gray-600">Create your account and access our services</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="name" className="font-medium text-sm">Name</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type="text" placeholder="Enter Name" {...register("name", { required: true, minLength: 2 })} className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center after::">
                                <RiUserShared2Line fontSize={'20px'} />
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.name} />
                    </div>
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
                        <label htmlFor="phone" className="font-medium text-sm">Phone</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type={'text'} placeholder="Enter Password" {...register("phone", phoneNumberValidation)} id="phone" maxLength={11} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setValue("phone", validatePhoneNumber(event) as string) }} className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center">
                                <PiPhoneOutgoing fontSize={'20px'} />
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.phone} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="password" className="font-medium text-sm">Password</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type={isShowPassword ? "text" : "password"} placeholder="Enter Password" {...register("password", passwordValidation)} id="password" className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => setIsShowPassword((prev) => !prev)}>
                                {isShowPassword ? <BsEyeSlash fontSize={'20px'} /> : <BsEye fontSize={'20px'} />}
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.password} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="password" className="font-medium text-sm">Confirm Password</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type={isShowPassword ? "text" : "password"} placeholder="Enter Confirm Password" {...register("confirmPassword", confirmPasswordValidation(watch("password")))} id="password" className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => setIsShowPassword((prev) => !prev)}>
                                {isShowPassword ? <BsEyeSlash fontSize={'19px'} /> : <BsEye fontSize={'19px'} />}
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.confirmPassword} />
                    </div>
                    <div className="flex  justify-between flex-wrap w-full my-1">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="" id="" />
                            <p className="text-[14px]">Remember me?</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <button className="bg-(--primary-color) text-white w-full py-[5px] rounded font-medium">Sign Up</button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Already have an account?</p>
                        <span onClick={goToSignIn} className="text-(--primary-color) font-medium">Sign In</span>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default CreateAccount