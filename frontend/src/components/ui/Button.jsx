export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[#12312B] text-white hover:bg-[#0D2520]",

    secondary:
      "bg-[#B68C2F] text-white hover:bg-[#A57F28]",

    outline:
      "border border-[#E8E2D9] bg-white text-[#12312B] hover:bg-[#F8F6F2]",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-5
        py-3
        text-sm
        font-medium
        transition-all
        duration-300
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}