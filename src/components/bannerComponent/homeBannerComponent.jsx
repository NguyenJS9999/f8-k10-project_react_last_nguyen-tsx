const HomeBannerComponent = () => {
  return (
    <section className="relative h-[600px] bg-gray-200">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1920x600?text=Banner+Image')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>

        {/* Content */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-5xl font-bold mb-4">LX8 SERIES</h1>
          <p className="text-lg max-w-md mb-6">
            Là dòng sản phẩm cao cấp đến từ DRAcoustic, thiết kế dành cho không gian giải trí đa năng hiện đại. Được thiết kế để mang lại trải nghiệm âm thanh HIFI.
          </p>
          <button className="bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-600 transition">
            Xem chi tiết
          </button>
        </div>

        {/* Dots (Carousel Indicators) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerComponent;