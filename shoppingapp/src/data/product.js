const productList = [
  {
    id: '001',
    date: '2024-01-20',
    product: 'Tủ trà oval',
    image: '/images/product/tutra.png',
    price: '10000000',
    description: `Tủ trà oval mang phong cách hiện đại với thiết kế tinh tế và tiện nghi. Sản phẩm này phù hợp để trưng bày tại phòng khách hoặc phòng làm việc, mang lại vẻ đẹp trang nhã cho không gian. 
    Phần mặt trên được làm từ gỗ tràm tự nhiên, kết hợp veneer tràm tạo cảm giác mộc mạc nhưng sang trọng. Thân tủ sử dụng gỗ công nghiệp PB đạt tiêu chuẩn CARB-P2, an toàn và bền bỉ theo thời gian. 
    Tủ được trang bị các chi tiết mây tre tự nhiên ở mặt cắt, giúp tăng tính thẩm mỹ và cảm giác thân thiện với môi trường. Chân tủ được làm từ gỗ cao su tự nhiên, đảm bảo độ ổn định và chắc chắn.`,
    origin: 'Việt Nam',
    dimension: 'Dài 160cm x Rộng 41cm x Cao 51cm',
  },
  {
    id: '002',
    date: '2024-01-22',
    product: 'Bàn trà gỗ',
    image: '/images/product/bantra.jpg',
    price: '5000000',
    description: `Bàn trà gỗ là sự lựa chọn hoàn hảo cho không gian phòng khách nhỏ gọn hoặc các căn hộ hiện đại. Sản phẩm mang lại cảm giác gần gũi và ấm áp. 
    Mặt bàn được làm từ gỗ sồi tự nhiên, với bề mặt nhẵn bóng và đường vân gỗ tự nhiên. Chân bàn làm từ gỗ cao su, có khả năng chịu lực tốt, đảm bảo tuổi thọ lâu dài. 
    Thiết kế đơn giản nhưng không kém phần sang trọng, bàn trà gỗ dễ dàng phối hợp với nhiều phong cách nội thất khác nhau.`,
    origin: 'Việt Nam',
    dimension: 'Dài 120cm x Rộng 60cm x Cao 45cm',
  },
  {
    id: '003',
    date: '2024-01-23',
    product: 'Ghế sofa da',
    image: '/images/product/ghe-sofa.jpg',
    price: '15000000',
    description: `Ghế sofa da là biểu tượng của sự sang trọng và thoải mái. Với chất liệu da thật cao cấp, sản phẩm mang đến cảm giác mềm mại và bền bỉ theo thời gian. 
    Khung ghế được làm từ gỗ tự nhiên chắc chắn, đảm bảo khả năng chịu lực tốt. Nệm ngồi sử dụng mút cao cấp, đem lại trải nghiệm ngồi êm ái và dễ chịu. 
    Sofa này là sự lựa chọn hoàn hảo cho các phòng khách lớn, phù hợp với phong cách nội thất hiện đại hoặc cổ điển.`,
    origin: 'Ý',
    dimension: 'Dài 180cm x Rộng 80cm x Cao 85cm',
  },
  {
    id: '004',
    date: '2024-01-25',
    product: 'Tủ sách gỗ',
    image: '/images/product/tusach.jpg',
    price: '3000000',
    description: `Tủ sách gỗ được thiết kế với kiểu dáng tối giản nhưng không kém phần tinh tế, phù hợp với các không gian học tập và làm việc hiện đại. 
    Mặt tủ làm từ gỗ tự nhiên, bền bỉ và có tính thẩm mỹ cao. Thân tủ được làm từ gỗ MDF phủ veneer, giúp tăng độ bền và giữ được vẻ ngoài đẹp mắt. 
    Với các ngăn chứa rộng rãi, tủ sách này mang lại giải pháp lưu trữ tiện dụng và ngăn nắp.`,
    origin: 'Việt Nam',
    dimension: 'Dài 100cm x Rộng 30cm x Cao 150cm',
  },
  {
    id: '005',
    date: '2024-01-26',
    product: 'Bàn ăn gỗ sồi',
    image: '/images/product/banan.jpg',
    price: '12000000',
    description: `Bàn ăn gỗ sồi được chế tác từ gỗ sồi tự nhiên, mang lại cảm giác ấm áp và gần gũi cho không gian bếp. 
    Với bề mặt bàn rộng rãi, sản phẩm phù hợp cho các gia đình đông người hoặc các bữa tiệc nhỏ. 
    Chân bàn được làm từ gỗ sồi nguyên khối, đảm bảo độ bền và sự chắc chắn trong thời gian dài.`,
    origin: 'Nga',
    dimension: 'Dài 180cm x Rộng 90cm x Cao 75cm',
  },
  {
    id: '006',
    date: '2024-01-28',
    product: 'Kệ TV hiện đại',
    image: '/images/product/ketv.jpg',
    price: '7500000',
    description: `Kệ TV hiện đại mang đến sự gọn gàng và tinh tế cho không gian phòng khách của bạn. 
    Mặt kệ làm từ gỗ MDF phủ veneer, không chỉ đẹp mắt mà còn có khả năng chống trầy xước hiệu quả. 
    Chân kệ được làm từ gỗ cao su tự nhiên, giúp sản phẩm có độ ổn định cao và bền bỉ.`,
    origin: 'Việt Nam',
    dimension: 'Dài 150cm x Rộng 45cm x Cao 50cm',
  },
  {
    id: '007',
    date: '2024-01-29',
    product: 'Bàn làm việc',
    image: '/images/product/banlamviec.jpg',
    price: '4500000',
    description: `Bàn làm việc là giải pháp lý tưởng cho những không gian làm việc nhỏ gọn. 
    Mặt bàn được làm từ gỗ công nghiệp chất lượng cao, có khả năng chống ẩm và chống bám bụi. 
    Chân bàn kim loại được sơn tĩnh điện, mang lại vẻ ngoài hiện đại và sự bền bỉ theo thời gian.`,
    origin: 'Trung Quốc',
    dimension: 'Dài 140cm x Rộng 70cm x Cao 75cm',
  },
  {
    id: '008',
    date: '2024-01-30',
    product: 'Tủ quần áo',
    image: '/images/product/tuquanao.jpg',
    price: '8000000',
    description: `Tủ quần áo thiết kế hiện đại, phù hợp cho cả phòng ngủ lớn và nhỏ. 
    Sản phẩm sử dụng gỗ công nghiệp cao cấp với bề mặt phủ veneer, mang lại vẻ ngoài thanh lịch và khả năng chống ẩm hiệu quả. 
    Tủ có nhiều ngăn chứa đồ tiện lợi, giúp bạn dễ dàng tổ chức quần áo một cách ngăn nắp.`,
    origin: 'Malaysia',
    dimension: 'Dài 180cm x Rộng 60cm x Cao 200cm',
  },
  {
    id: '009',
    date: '2024-02-01',
    product: 'Giường ngủ gỗ',
    image: '/images/product/giuongngu.jpg',
    price: '9000000',
    description: `Giường ngủ gỗ được thiết kế với khung gỗ chắc chắn, mang lại sự thoải mái và yên tâm trong giấc ngủ. 
    Đầu giường được làm từ gỗ MDF phủ veneer, giúp tạo điểm nhấn sang trọng. 
    Sản phẩm phù hợp cho các phòng ngủ hiện đại hoặc phong cách Scandinavian.`,
    origin: 'Thụy Điển',
    dimension: 'Dài 200cm x Rộng 160cm x Cao 45cm',
  },
  {
    id: '010',
    date: '2024-02-02',
    product: 'Kệ sách đa năng',
    image: '/images/product/kesach.jpg',
    price: '6500000',
    description: `Kệ sách đa năng mang phong cách tối giản, phù hợp cho không gian nhỏ hẹp. 
    Mặt kệ được làm từ gỗ MDF cao cấp, chống cong vênh. 
    Khung kệ kim loại được sơn tĩnh điện, đảm bảo độ bền và sự chắc chắn.`,
    origin: 'Nhật Bản',
    dimension: 'Dài 120cm x Rộng 30cm x Cao 180cm',
  },
];

export default productList;
