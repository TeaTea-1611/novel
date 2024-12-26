import { Link, Section, Text } from "@react-email/components";
import Wrapper from "./wrapper";
import { COMPANY_INFO } from "../../constants";

interface TwoFactorEmailProps {
  userName: string;
  twoFactorCode: string;
  validMinutes: number;
}

export default function TwoFactorEmail({
  userName,
  twoFactorCode,
  validMinutes,
}: TwoFactorEmailProps) {
  return (
    <Wrapper preview={`Mã xác thực hai yếu tố từ ${COMPANY_INFO.name}`}>
      <Text className="text-gray-700 text-lg font-medium mb-4">
        Xin chào {userName},
      </Text>

      <Text className="text-gray-600 text-base leading-relaxed mb-6">
        Để tiếp tục truy cập vào tài khoản của bạn tại {COMPANY_INFO.name}, vui
        lòng nhập mã xác thực hai yếu tố (2FA) bên dưới:
      </Text>

      <Section className="text-center my-8">
        <Text className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 px-8 rounded-lg inline-block shadow-md">
          {twoFactorCode}
        </Text>
      </Section>

      <Text className="text-gray-600 text-sm leading-relaxed mb-6">
        Mã xác thực này có hiệu lực trong vòng{" "}
        <strong>{validMinutes} phút</strong>. Nếu bạn không yêu cầu mã này, vui
        lòng bỏ qua email.
      </Text>

      <Section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <Text className="text-yellow-700 text-sm font-medium">
          Lưu ý quan trọng:
        </Text>
        <Text className="text-yellow-600 text-sm">
          • Không chia sẻ mã xác thực này với bất kỳ ai
          <br />• Nếu bạn không yêu cầu xác thực, tài khoản của bạn có thể gặp
          rủi ro. Vui lòng kiểm tra lại bảo mật ngay.
        </Text>
      </Section>

      <Text className="text-gray-600 text-sm mb-8">
        Nếu bạn gặp bất kỳ khó khăn nào, vui lòng liên hệ với đội ngũ hỗ trợ của
        chúng tôi tại{" "}
        <Link
          href={`mailto:${COMPANY_INFO.supportEmail}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {COMPANY_INFO.supportEmail}
        </Link>
        .
      </Text>
    </Wrapper>
  );
}
