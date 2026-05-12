import Link from "next/link";
import pkg from "../../package.json";

interface LogoProps {
  onClick?: () => void;
  className?: string;
  variant?: "horizontal" | "vertical";
  href?: string;
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.359 9.68043C22.537 9.22617 23.8635 9.8056 24.3215 10.9745C25.5311 14.0621 25.4552 17.5003 24.1104 20.5322C23.7709 21.2976 23.3559 22.02 22.8777 22.6935L27.3299 27.1103C28.2235 27.9971 28.2232 29.4349 27.3299 30.3217C26.4362 31.2087 24.9863 31.2087 24.0924 30.3217L19.6022 25.8661C18.8392 26.3744 18.0193 26.8068 17.1492 27.1425L17.1413 27.1457C14.4335 28.1786 11.4779 28.3048 8.71173 27.5406L8.85365 27.9054C9.31161 29.0743 8.7285 30.3905 7.5506 30.8451C6.37246 31.2996 5.046 30.72 4.58799 29.551L2.51495 24.2592C2.057 23.0903 2.64004 21.7741 3.818 21.3196L9.15092 19.2625C10.329 18.808 11.6555 19.3876 12.1136 20.5566C12.542 21.6501 12.0581 22.8702 11.0295 23.3954C12.5239 23.6129 14.0622 23.4523 15.4953 22.9064C17.4733 22.1421 19.0655 20.6306 19.9206 18.7026C20.7765 16.7731 20.8246 14.585 20.0548 12.6201C19.5968 11.4511 20.1809 10.1349 21.359 9.68043ZM17.6264 0.154884C18.8044 -0.299571 20.131 0.280031 20.589 1.44899L22.662 6.7407C23.1199 7.90964 22.5369 9.22585 21.359 9.68043L16.026 11.7375C14.8479 12.1919 13.5215 11.6124 13.0635 10.4434C12.6353 9.35019 13.1185 8.12891 14.1463 7.60344C12.6521 7.38622 11.1135 7.54756 9.68064 8.09358C7.70306 8.85804 6.11141 10.3699 5.25628 12.2975C4.40048 14.2268 4.35254 16.415 5.12218 18.3798C5.58018 19.5489 4.99614 20.865 3.818 21.3196C2.64001 21.7738 1.31348 21.1954 0.855394 20.0266C-0.354293 16.939 -0.278304 13.4998 1.06661 10.4678C2.41155 7.43584 4.91621 5.05895 8.02779 3.85865L8.03561 3.85532L8.64579 3.63797C11.1834 2.80688 13.9057 2.75133 16.4652 3.45833L16.3233 3.09461C15.8654 1.92566 16.4484 0.609445 17.6264 0.154884Z" fill="#1DB954" />
    </svg>
  );
}

export function Logo({ onClick, className = "text-2xl", variant = "vertical", href = "/jobs" }: LogoProps) {
  if (variant === "horizontal") {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={href}
          onClick={onClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-baseline gap-2">
            <span className={`${className} font-black text-admin-accent tracking-tighter leading-none`}>
              TUKLAS
            </span>
            <span className="text-[10px] font-black text-admin-muted uppercase tracking-[0.3em]">
              v{pkg.version}
            </span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 group"
      >
        <div className="flex flex-col">
          <span className={`${className} font-black text-admin-contrast tracking-tighter group-hover:text-admin-accent transition-colors leading-none`}>
            TUKLAS
          </span>
          <span className="text-[10px] font-black text-admin-muted tracking-[0.2em] mt-1 ml-0.5">
            V{pkg.version}
          </span>
        </div>
      </Link>
    </div>
  );
}
