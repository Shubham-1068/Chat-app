import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Logo from "../assets/Logo.png";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/chats";
        }
    }, [isAuthenticated]);

    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="md:h-[500px] h-[400px] sm:w-[400px] w-[80%] max-w-md border-2 border-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 flex flex-col justify-around items-center bg-white shadow-xl transform transition-transform duration-300 hover:scale-105">
                <img src={Logo} alt="Logo" className="w-[70%] sm:w-[60%] rounded-lg shadow-xl mb-6" />

                <button
                    onClick={() => loginWithRedirect()}
                    className="w-[85%] flex items-center justify-center gap-3 px-6 py-3 text-sm sm:text-base font-semibold text-white rounded-md shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>Log In</span>
                </button>
            </div>
        </div>
    );
};

export default LoginButton;
