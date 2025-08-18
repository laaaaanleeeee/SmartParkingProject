import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Liên hệ</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Thông tin </h3>

          <div className="space-y-4">
            <div>
              <p className="font-semibold">📞 Hotline</p>
              <p>0368063473</p>
            </div>

            <div>
              <p className="font-semibold">✉️ Email</p>
              <p>lehailan110@gmail.com</p>
            </div>

            <div>
              <p className="font-semibold">📍 Địa chỉ</p>
              <p className="mt-1">
                <strong>Trụ sở chính Hà Nội:</strong> Tây Hồ, Hà Nội
              </p>
              <p className="mt-2">
                <strong>Chi nhánh TP.HCM:</strong> Bến Thành, TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59569.57039009736!2d105.77920460928857!3d21.068741780954664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aae54053e2d5%3A0x2d72b1d7c422234b!2zVMOieSBI4buTLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1755550468190!5m2!1svi!2s"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div>
          <h3 className="text-3xl font-bold text-center mb-12 mt-20">Hãy Để Chúng Tôi Tư Vấn Đến Bạn</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="4"
              placeholder="Nội dung"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition block mx-auto"
            >
              Nhận tư vấn
            </button>
          </form>
        </div>
    </div>
  );
};

export default ContactPage;
