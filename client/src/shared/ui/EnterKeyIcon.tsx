import { SVGProps } from "react";

export function EnterKeyIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            {...props}
        >
            <defs>
                <mask id="ipSEnterKey0">
                    <g
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                    >
                        <path
                            fill="#fff"
                            stroke="#fff"
                            d="M44 44V4H24v16H4v24z"
                        ></path>
                        <path stroke="#000" d="m21 28l-4 4l4 4"></path>
                        <path stroke="#000" d="M34 23v9H17"></path>
                    </g>
                </mask>
            </defs>
            <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSEnterKey0)"
            ></path>
        </svg>
    );
}
