import { useNavigate } from "react-router-dom";

const useNavigateHooks = () => {

    const goTo = useNavigate();
    const goToSignIn = () => goTo("/sign-in");
    const goToSignUp = () => goTo("/sign-up");
    const goToForgotPassword = () => goTo("/forgot-password");
    const goToResetPassword = () => goTo("/reset-password");
    const goToDashboard = () => goTo("/dashboard");



    return {
        goTo,
        goToSignIn,
        goToSignUp,
        goToDashboard,
        goToForgotPassword,
        goToResetPassword,
    }

}
export default useNavigateHooks;