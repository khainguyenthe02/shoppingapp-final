import './Footer.css';
import { Facebook, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
            <div className="footer-section">
                  <img src="/logo_white.svg" alt="MOHOME" className="footer-logo" />
            </div>
        <div className="footer-section">
          <h3>Văn phòng</h3>
          <span>Số 30TT 22 khu đô thị Văn Phú, phường Phú La, quận Hà Đông, thành phố Hà Nội</span><br/>
          <span>Showroom: S5.05 - Sh15 phân khu Sapphire | Vinhomes Smart City, thành phố Hà Nội</span> <br/>
          <p></p>
          <img src="/bocongthuong.png" alt="" className="certificate-logo" />
        </div>

        <div className="footer-section">
          <h3>Liên hệ</h3>
          <span>Hotline/ Zalo: 099 888 8840</span> <br/>
          <span>Đặt giao hàng: 092 222 3536</span> <br/>
          <span>Bảo hành/ bảo trì: 095 686 4545</span> <br/>
          <span>Đốt thiết kế: lamhome@icash.vn</span><br/>
          <span>Email: cskh@mohome.com.vn</span> <br/>
          <img src="/dcmd.png" className="certificate-logo" />
        </div>

        <div className="footer-section">
          <h3>Trang chủ</h3>
          <ul>
            <li><a href="#"><h5>Giới thiệu</h5></a></li>
            <li><a href="#"><h5>Bộ sưu tập</h5></a></li>
            <li><a href="#"><h5>Dịch vụ</h5></a></li>
            <li><a href="#"><h5>Tin tức</h5></a></li>
            <li><a href="#"><h5>Liên hệ</h5></a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Dịch vụ khách hàng</h3>
          <ul>
            <li><a href="#">Chính sách bán hàng</a></li>
            <li><a href="#">Giao hàng & lắp đặt</a></li>
            <li><a href="#">Đổi trả, bảo hành & bảo trì</a></li>
            <li><a href="#">Dự án thiết kế riêng</a></li>
            <li><h5>Theo dõi chúng tôi</h5></li>
            <li>
                  <div className="social-media-links">
                        <a href="#" aria-label="Facebook"><Facebook /></a>
                        <a href="#" aria-label="Instagram"><Instagram /></a>
                        <a href="#" aria-label="Youtube"><Youtube /></a>
                  </div>
            </li>
          </ul>
        </div>
        <div>
        </div>
      </div>
      <div className="copyright">
        <p>CÔNG TY CỔ PHẦN NỘI THẤT MOHOME VIỆT NAM</p>
        <p>© 2024, All Rights Reserved</p>
        <p>Thứ 2 - Thứ 7 (8:00-17:30)</p>
      </div>
    </footer>
  );
};

export default Footer;