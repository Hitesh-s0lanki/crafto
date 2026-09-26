import Image from "next/image";

export function CraftoLogo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <Image src="/brand/crafto-icon.png" alt="Crafto" width={40} height={40} priority />;
  }

  return (
    <Image
      src="/brand/crafto-logo-transparent.png"
      alt="Crafto"
      width={420}
      height={300}
      priority
    />
  );
}
