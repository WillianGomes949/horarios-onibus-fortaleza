import Marquee from "react-fast-marquee";

export function MarqueeComponent() {
    return (
        <Marquee gradient={false} speed={40} className="py-4">
            <p className="text-sm font-medium text-[var(--text-muted)] mr-12 ml-16 tracking-wide">
               Os horários podem sofrer alterações sem aviso prévio. Verifique sempre as informações mais recentes.
            </p>
            <p className="text-sm font-medium text-[var(--text-muted)] mr-12 ml-16 tracking-wide">
                Este é um projeto de estudo.
            </p>
            <p className="text-sm font-medium text-[var(--text-muted)] mr-12 ml-16 tracking-wide">
                Verifique as rotas sempre, elas podem ter divergências. baixe o app oficial <a href="https://play.google.com/store/apps/details?id=br.com.m2m.meuonibus&hl=pt_BR" className="text-[var(--primary)]">Meu Onibus fortaleza.</a>
            </p>
             <p className="text-sm font-medium text-[var(--text-muted)] mr-12 ml-16 tracking-wide">
                Este é um projeto de estudo.
            </p>
        </Marquee>
    )
}