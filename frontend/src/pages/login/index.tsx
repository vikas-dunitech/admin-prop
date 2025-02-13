import { route } from "@/enums/route.enum";
import { publicRequestUrls, requests } from "@/helper/apiAgent";
import { getKeyMessageFromErrors, ResponseHandler } from "@/helper/utils";
import { useFormik } from "formik";
import { get, isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as Yup from "yup";

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values, "jln");

      setLoading(true);
      const email = values.email;
      const password = values.password;

      await requests
        .post(publicRequestUrls.login, { email, password })
        .then((res: any) => {
          setLoading(false);
          const response = ResponseHandler(res);
          toast.success(get(response, "message", "Login Successful"));
          localStorage.setItem(
            "token",
            JSON.stringify(get(response, "data.token", ""))
          );
          router.push(route.dashboard);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(get(err, "response.data.error", ""));
        });
    },
  });

  const handleChange = (e: ChangeEvent) => {
    formik.handleChange(e);
    setFormErrors([]);
  };
  return (
    <>
      <main className="mx-auto min-h-screen">
        <div className="relative flex">
          <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
            <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
              <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                  <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Sign In
                  </h4>
                  <p className="mb-9 ml-1 text-base text-white">
                    Enter your email and password to sign in !
                  </p>
                  {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
                    <div className="rounded-full text-xl">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                        enableBackground="new 0 0 48 48"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                      </svg>
                    </div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                      Sign In with Google
                    </h5>
                  </div>
                  <div className="mb-6 flex items-center  gap-3">
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                    <p className="text-base text-gray-600 dark:text-white">
                      {" "}
                      or{" "}
                    </p>
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                  </div> */}
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                      >
                        Email*
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={(e) => handleChange(e)}
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none duration-300 border-gray-200 dark:border-white focus:border-blueSecondary dark:focus:border-blueSecondary dark:text-white"
                      />
                    </div>
                    {(formik.errors.email ||
                      getKeyMessageFromErrors(formErrors, "email")) && (
                      <p className="text-red-600 -mt-2">
                        {formik.errors.email ||
                          getKeyMessageFromErrors(formErrors, "email")}
                      </p>
                    )}
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                      >
                        Password*
                      </label>
                      <div className="flex items-center justify-between relative">
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={formik.values.password}
                          onChange={handleChange}
                          className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none duration-300 border-gray-200 dark:border-white focus:border-blueSecondary dark:focus:border-blueSecondary dark:text-white"
                        />
                        <span
                          className="absolute top-5 right-4"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`fa-solid ${
                              showPassword ? "fa-eye" : "fa-eye-slash"
                            } text-white`}
                          ></i>
                        </span>
                      </div>
                    </div>
                    {(formik.errors.password ||
                      getKeyMessageFromErrors(formErrors, "password")) && (
                      <p className="text-red-600 -mt-2 mb-4">
                        {formik.errors.password ||
                          getKeyMessageFromErrors(formErrors, "password")}
                      </p>
                    )}
                    <div className="mb-4 flex items-center justify-between px-2">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s] checked:border-none checked:text-[#A1B2F9] hover:cursor-pointer dark:border-white checked:bg-[#A1B2F9] dark:checked:bg-brand-400 undefined"
                          name="weekly"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 text-sm font-medium text-navy-700 dark:text-white"
                        >
                          Keep me logged In
                        </label>
                      </div>
                      <a
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                        href=""
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="linear mt-2 w-full rounded-xl bg-[#A1B2F9] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-[#A1B2F9] dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-[#A1B2F9]"
                    >
                      {!loading ? "Sign In" : <ClipLoader />}
                    </button>
                  </form>
                </div>
              </div>
              <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                <div className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px] bg-[#A1B2F9]">
                  <Image
                    src={"/img/login.png"}
                    alt={""}
                    height={700}
                    width={844}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
