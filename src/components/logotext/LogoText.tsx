import { css } from "@emotion/react";
import { Heading } from "@chakra-ui/react";
import { LogoTextProps } from "./LogoTextTypes";

const LogoText = ({ size }: LogoTextProps) => {
  return (
    <Heading
      css={css`
        background: linear-gradient(
          to right,
          #2ec5ff 10%,
          #65009e 30%,
          #ffffff 50%,
          #a70327 70%,
          #f031f0 90%
        );
        background-size: 200% auto;
        color: #fff;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textclip 3s linear infinite;
        @keyframes textclip {
          to {
            background-position: 200% center;
          }
        }
      `}
      fontSize={size}
    >
      InterviewReady
    </Heading>
  );
};

export { LogoText };
