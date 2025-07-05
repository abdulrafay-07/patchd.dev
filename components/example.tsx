import Image from "next/image";

export const Example = () => {
  return (
    <section id="example" className="py-12 md:py-24 flex flex-col items-center">
      <h3 className="text-lg text-muted-foreground font-semibold mb-2">See it in action</h3>
      <h2 className="text-2xl mb-8">
        This could be your profile, but with better projects (hopefully)
      </h2>
      <Image
        src="/example.png"
        alt="Example profile"
        width={1210}
        height={658}
        className="object-contain w-full max-w-[1210px] shadow-xl rounded-3xl"
      />
    </section>
  )
};
