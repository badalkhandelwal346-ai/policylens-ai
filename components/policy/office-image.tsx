import Image from "next/image";

export function OfficeImage() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-black/5 shadow-2xs aspect-video sm:aspect-21/9">
      <Image
        src="/images/policy-office.jpg"
        alt="Government Policy Office"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
