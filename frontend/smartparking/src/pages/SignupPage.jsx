import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { notification } from "antd";
import ImgBg from "@/assets/parkinglotimg2.jpg";

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
    initialValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      phone: "",
      dob: "",
      userGender: "MALE",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Vui lòng nhập username"),
      password: Yup.string()
        .min(6, "Ít nhất 6 ký tự")
        .required("Vui lòng nhập mật khẩu"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      phone: Yup.string()
        .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
      dob: Yup.date().required("Vui lòng chọn ngày sinh"),
      userGender: Yup.string()
        .oneOf(["MALE", "FEMALE", "OTHER"])
        .required("Vui lòng chọn giới tính"),
    }),
    onSubmit: async (values) => {
      await register(values);
      openNotification();
      navigate("/sign-in");
    },
  });

  return (
    <>
      {contextHolder}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ImgBg})` }}
      >
        <div className="bg-white backdrop-blur-sm p-8 m-10 rounded-2xl shadow-2xl w-full max-w-lg">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
            Đăng ký tài khoản
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Tên đăng nhập"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Nhập email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                placeholder="Nhập họ tên"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="Nhập số điện thoại"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formik.values.dob}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.dob}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới tính
              </label>
              <select
                id="userGender"
                name="userGender"
                value={formik.values.userGender}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
              {formik.touched.userGender && formik.errors.userGender && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.userGender}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200"
            >
              Đăng ký
            </button>
          </form>

          <NavLink to="/sign-in">
            <p className="text-center mt-6 text-green-700 hover:underline font-medium">
              Đã có tài khoản? Đăng nhập
            </p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
