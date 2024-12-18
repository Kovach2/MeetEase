import React from "react";

export default function Container({children, className} : {children: React.ReactNode, className?: string}) {
    return (
        <div className={`w-full max-w-[1140px] mx-auto px-[10px] ${className}`}>
            {children}
        </div>
    );
}