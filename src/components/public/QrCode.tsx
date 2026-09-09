import QRCode from "qrcode";
import { Card } from "@/components/ui/Card";
import { getSiteUrl } from "@/lib/site-url";

export async function QrCode({
  path = "/contribuir",
  label = "Aponte a câmera para contribuir",
}: {
  path?: string;
  label?: string;
}) {
  const siteUrl = await getSiteUrl();
  const dataUrl = await QRCode.toDataURL(`${siteUrl}${path}`, {
    margin: 1,
    width: 240,
    color: {
      dark: "#2a2c30",
      light: "#fffdf8",
    },
  });

  return (
    <Card className="flex flex-col items-center gap-4 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt="QR code para acessar a página de contribuição"
        width={160}
        height={160}
        className="rounded-lg border border-border"
      />
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-foreground-muted">
          Ideal para telão, cartazes e convites impressos
        </p>
      </div>
    </Card>
  );
}
