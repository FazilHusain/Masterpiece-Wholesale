import { Link } from "react-router-dom";

const WholesaleCard = () => {
  return (
    <div className="mt-6 bg-[#183824] px-6 py-5">

      <h3 className="font-serif text-[24px] leading-tight leading-tight text-white">

        Apply for Wholesale Access

      </h3>

      <p className="mt-3 text-[13px] leading-7 text-white/70 max-w-md">

        Ready to stock His Masterpiece?
        Complete our trade application.

      </p>

      <Link
        to="/wholesale"
        className="
        inline-flex
        items-center
        justify-center
        mt-8
        h-10
        px-5
        bg-[#B58D2F]
        text-white
        uppercase
        tracking-[2px]
        text-[13px]
        font-medium
        transition-all
        duration-300
        hover:bg-[#a37d26]
        "
      >
        APPLY NOW →

      </Link>

    </div>
  );
};

export default WholesaleCard;