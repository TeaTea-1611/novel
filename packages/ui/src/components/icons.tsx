import { cn } from "@workspace/ui/lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  logo: (props: IconProps) => (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", props.className)}
      {...props}
    >
      <path d="M20.553,3.105l-6,3C11.225,7.77,9.274,9.953,8.755,12.6c-.738,3.751,1.992,7.958,2.861,8.321A.985.985,0,0,0,12,21h0c6.682,0,11-3.532,11-9,0-6.691-.9-8.318-1.293-8.707A1,1,0,0,0,20.553,3.105Zm-7.6,15.86a8.594,8.594,0,0,1,5.44-8.046,1,1,0,1,0-.788-1.838,10.363,10.363,0,0,0-6.393,7.667,6.59,6.59,0,0,1-.494-3.777c.4-2,1.989-3.706,4.728-5.076l5.03-2.515A29.2,29.2,0,0,1,21,12C21,16.063,17.94,18.67,12.954,18.965ZM3.523,5.38A29.2,29.2,0,0,0,3,12a6.386,6.386,0,0,0,4.366,6.212,1,1,0,1,1-.732,1.861A8.377,8.377,0,0,1,1,12c0-6.691.9-8.318,1.293-8.707a1,1,0,0,1,1.154-.188l6,3A1,1,0,0,1,8.553,7.9Z" />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      {...props}
      fill="none"
    >
      <path
        d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
        fill="#4285F4"
      />
      <path
        d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
        fill="#34A853"
      />
      <path
        d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
        fill="#FBBC05"
      />
      <path
        d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
        fill="#EB4335"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  upvote: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none size-6"
      {...props}
    >
      <path
        d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
        fill="currentcolor"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
};

export { Icons };
