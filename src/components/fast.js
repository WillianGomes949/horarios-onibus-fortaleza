import Marquee from "react-fast-marquee";
import Image from "next/image";

export function MarqueeComponent() {
    return (
        <Marquee gradient={false} speed={40} className="py-4">
            <Image
                src="/buus.png"
                alt="Bus Icon"
                width={50}
                height={50}
                className="invert opacity-60" // Invert para ficar branco no fundo preto
            />
            <p className="text-sm font-medium text-[var(--text-muted)] mr-12 ml-16 tracking-wide">
                Os horários podem sofrer alterações sem aviso prévio. Verifique sempre as informações mais recentes.
            </p>
        </Marquee>
    )
}