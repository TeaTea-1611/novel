import * as React from "react";

import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { COMPANY_INFO } from "../../constants";

interface Props {
  preview: string;
  children: React.ReactNode;
}

export default function Wrapper({ preview, children }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {},
            },
          },
        }}
      >
        <Body className="bg-blue-50 font-sans">
          <Container className="mx-auto py-4 px-2">
            <Section className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
              {/* HEADER */}
              <Text className="text-3xl font-bold text-center text-blue-800 mb-8">
                {COMPANY_INFO.name}
              </Text>

              {children}

              {/* FOOTER */}
              <Section className="border-t border-blue-200 mt-8 pt-8">
                <Text className="text-blue-600 text-sm text-center mb-2 font-medium">
                  {COMPANY_INFO.name}
                </Text>
                <Text className="text-blue-600 text-sm text-center mb-2">
                  {COMPANY_INFO.address}
                </Text>
                <Text className="text-blue-500 text-xs text-center">
                  © {COMPANY_INFO.year} {COMPANY_INFO.name}. Bảo lưu mọi quyền.
                </Text>
                <Text className="text-blue-500 text-xs text-center mt-2">
                  Email này được gửi tự động. Vui lòng không trả lời email này.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
