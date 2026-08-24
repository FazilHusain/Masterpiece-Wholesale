import { motion } from "framer-motion";

export default function QuickOrderHero() {
  return (
    <section className="bg-[#183425]">
      <div className="mx-auto flex h-[270px] max-w-7xl items-center justify-center px-6 text-center lg:h-[300px] lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#B68C2F]">
            TRADE CUSTOMERS
          </span>

          <h1 className="mt-5 font-cormorant text-[42px] font-normal leading-none text-white md:text-[52px] lg:text-[64px]">
            Quick{" "}
            <span className="italic text-[#B68C2F]">
              Order
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-7 text-[#D8DDD8]">
            Know your SKUs? Paste your list and quantities below to place
            a bulk order quickly.
          </p>
        </motion.div>

      </div>
    </section>
  );
}