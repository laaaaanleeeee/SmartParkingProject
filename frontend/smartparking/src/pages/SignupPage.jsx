import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { notification } from "antd";
import ImgBg from "../assets/parkinglotimg2.jpg";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: "Đăng ký thành công",
      description: "Bạn có thể đăng nhập ngay bây giờ!",
      placement: "top",
      duration: 2,
    });
  };

  const formik = useFormik({
    initialValues: { username: "", password: "", email: "", fullName: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Vui lòng nhập username"),
      password: Yup.string().min(6, "Ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
      email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
    }),
    onSubmit: async (values) => {
      await register(values);
      openNotification();
      navigate("/login");
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
          <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Tên đăng nhập"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Nhập email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                placeholder="Nhập họ tên"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Đăng ký
            </button>
          </form>

          <NavLink to="/login">
            <p className="text-center mt-5 text-blue-600 hover:underline">Đã có tài khoản? Đăng nhập</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
