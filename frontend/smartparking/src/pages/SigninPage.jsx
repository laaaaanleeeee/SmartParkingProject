import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { notification } from "antd";
import ImgBg from "@/assets/parkinglotimg2.jpg";

const SigninPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: "Đăng nhập thành công",
      description: "Chào mừng bạn quay trở lại!",
      placement: "top",
      duration: 2,
    });
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Vui lòng nhập username"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      await login(values.username, values.password);
      openNotification();
      const role = localStorage.getItem("userRole");

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/");
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ImgBg})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nhập username"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
            >
              Đăng nhập
            </button>
          </form>

          <NavLink to="/sign-up">
            <p className="text-center mt-5 text-blue-600 hover:underline">Đăng ký ngay</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
