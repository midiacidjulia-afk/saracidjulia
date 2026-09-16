import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site-url";

export async function QrCode({
  path = "/contribuir",
  label = "Escaneie para contribuir",
  className,
}: {
  path?: string;
  label?: string;
  className?: string;
}) {
  const siteUrl = await getSiteUrl();
  const dataUrl = await QRCode.toDataURL(`${siteUrl}${path}`, {
    margin: 1,
    width: 240,
    color: {
      dark: "#1c1c1f",
      light: "#ffffff",
    },
  });

  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt="QR code para acessar a página de contribuição"
        width={160}
        height={160}
        className="rounded-xl border border-border bg-white p-2"
      />
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-foreground-muted">
          Ideal para telão, cartazes e convites impressos
        </p>
      </div>
    </div>
  );
}
