import { Link, Section, Text } from "@react-email/components";
import Wrapper from "../components/wrapper";
import { COMPANY_INFO } from "../../constants";

interface Props {
  userName: string;
  verificationUrl: string;
  validHours: number;
}

export default function VerificationEmail({
  userName,
  verificationUrl,
  validHours,
}: Props) {
  return (
    <Wrapper preview={`Xác thực tài khoản của bạn tại ${COMPANY_INFO.name}`}>
      <Text className="text-blue-900 text-lg font-medium mb-4">
        Xin chào {userName},
      </Text>

      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Cảm ơn bạn đã đăng ký tài khoản tại {COMPANY_INFO.name}. Để hoàn tất quá
        trình đăng ký và bảo mật tài khoản của bạn, vui lòng xác thực email bằng
        cách nhấp vào nút bên dưới:
      </Text>

      <Section className="text-center my-8">
        <Link
          href={verificationUrl}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg inline-block shadow-md transition-colors duration-200"
        >
          Xác thực tài khoản
        </Link>
      </Section>

      <Text className="text-gray-700 text-sm leading-relaxed mb-6">
        Nếu nút trên không hoạt động, bạn có thể sao chép và dán đường dẫn sau
        vào trình duyệt:
      </Text>
      <Text className="text-gray-700 text-sm break-all mb-6">
        {verificationUrl}
      </Text>

      <Section className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <Text className="text-red-700 text-sm font-medium">
          Lưu ý quan trọng:
        </Text>
        <Text className="text-red-600 text-sm">
          • Liên kết này sẽ hết hạn sau {validHours} giờ
          <br />• Nếu bạn không yêu cầu xác thực này, vui lòng bỏ qua email này
        </Text>
      </Section>

      <Text className="text-gray-700 text-sm mb-8">
        Nếu bạn gặp bất kỳ khó khăn nào trong quá trình xác thực, vui lòng liên
        hệ với đội ngũ hỗ trợ của chúng tôi tại{" "}
        <Link
          href={`mailto:${COMPANY_INFO.supportEmail}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {COMPANY_INFO.supportEmail}
        </Link>
      </Text>
    </Wrapper>
  );
}
