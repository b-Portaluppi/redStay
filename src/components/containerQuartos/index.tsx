import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
        <div
        className="flex flex-col w-full items-center gap-5 sm:flex-row justify-center"
        >
            { children }
        </div>
    )
}