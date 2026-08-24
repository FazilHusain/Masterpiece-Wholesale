import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="bg-[#183425]">
      <div className="mx-auto flex h-[250px] items-center justify-center px-6 text-center sm:h-[270px] lg:h-[290px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            OUR STORY
          </p>

          <h1 className="mt-3 font-cormorant text-[34px] font-light leading-[1.05] text-white sm:text-[38px] lg:text-[44px]">
            About{" "}
            <span className="italic text-[#B68C2F]">
              His Masterpiece
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[13px] leading-6 text-white/75 sm:text-[14px] sm:leading-7">
            Heritage craft, original design, own manufacturing – built for
            retailers who value the story behind every product.
          </p>
        </motion.div>
      </div>
    </section>
  );
}