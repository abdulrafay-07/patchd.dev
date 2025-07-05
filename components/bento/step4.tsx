import Image from "next/image";

export const Step4 = () => {
  return (
    <div className="h-full flex items-center justify-center gap-x-2 p-2 shadow-sm rounded-lg bg-background">
      <Image
        src="/step4.png"
        alt="Profile showcase"
        width={1920}
        height={1080}
        className="w-full object-contain"
      />
    </div>
  )
};
