// hooks/useEnter.ts
import { useEffect, useRef } from "react";

export function useEnter(callback: () => void) {
    const cbRef = useRef(callback);

    // Mettre à jour la référence si callback change
    useEffect(() => {
        cbRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const isCtrlOrMeta = e.ctrlKey || e.metaKey;
            if (!isCtrlOrMeta) return;
            if (e.key !== "enter" && e.key !== "Enter") return;

            const target = e.target as HTMLElement | null;
            if (target) {
                const tag = target.tagName;
                if (tag === "TEXTAREA" || target.isContentEditable) {
                    return;
                }
            }

            e.preventDefault();
            cbRef.current();
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
}
