import Marquee from "react-fast-marquee";
import Image from "next/image";

export function MarqueeComponent() {
    return (

        <Marquee gradient={false} speed={40}>
            <Image
                src="/buus.png"
                alt="Picture of the author"
                width={50}
                height={50}
                className="dark:invert opacity-50"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 mr-12 ml-16">
                Os horários podem sofrer alterações sem aviso prévio. Verifique sempre as informações mais recentes.

            </p>
        </Marquee>
    )
}