import { Link, Section, Text } from "@react-email/components";
import Wrapper from "../components/wrapper";
import { COMPANY_INFO } from "../../constants";

interface Props {
  userName: string;
  passwordResetUrl: string;
  validMinutes: number;
}

export default function PasswordResetEmail({
  userName,
  passwordResetUrl,
  validMinutes = 5,
}: Props) {
  return (
    <Wrapper
      preview={`Đặt lại mật khẩu tài khoản ${COMPANY_INFO.name} của bạn`}
    >
      <Text className="text-blue-900 text-lg font-medium mb-4">
        Xin chào {userName},
      </Text>

      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản.
      </Text>

      <Text className="text-gray-500 text-base leading-relaxed mb-6">
        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email và đảm bảo
        rằng bạn vẫn có thể đăng nhập vào tài khoản của mình.
      </Text>

      <Section className="text-center my-8">
        <Link
          href={passwordResetUrl}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg inline-block shadow-md transition-colors duration-200"
        >
          Đặt lại mật khẩu
        </Link>
      </Section>

      <Text className="text-gray-500 text-sm leading-relaxed mb-6">
        Hoặc sao chép và dán đường dẫn sau vào trình duyệt của bạn:
      </Text>
      <Text className="text-gray-500 text-sm break-all mb-6">
        {passwordResetUrl}
      </Text>

      <Section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <Text className="text-yellow-700 text-sm font-medium">
          Thông tin quan trọng:
        </Text>
        <Text className="text-yellow-500 text-sm">
          • Liên kết này sẽ hết hạn sau {validMinutes} phút
          <br />
          • Chỉ có thể sử dụng một lần
          <br />• Nếu liên kết hết hạn, bạn có thể yêu cầu liên kết mới từ trang
          đăng nhập
        </Text>
      </Section>

      <Section className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
        <Text className="text-indigo-700 text-sm font-medium">
          Lời khuyên bảo mật:
        </Text>
        <Text className="text-indigo-500 text-sm">
          • Tạo mật khẩu mạnh với ít nhất 8 ký tự
          <br />
          • Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt
          <br />• Không sử dụng mật khẩu đã dùng cho các tài khoản khác
        </Text>
      </Section>

      <Text className="text-gray-500 text-sm mb-8">
        Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ với đội ngũ hỗ trợ của chúng
        tôi tại{" "}
        <Link
          href={`mailto:${COMPANY_INFO.supportEmail}`}
          className="text-indigo-500 hover:text-indigo-800 font-medium"
        >
          {COMPANY_INFO.supportEmail}
        </Link>
      </Text>
    </Wrapper>
  );
}
