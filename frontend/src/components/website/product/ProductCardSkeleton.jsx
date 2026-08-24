export default function ProductCardSkeleton() {
    return (
        <div className="animate-pulse border border-gray-200 bg-white">

            <div className="h-[320px] bg-gray-200" />

            <div className="space-y-3 p-5">

                <div className="h-3 w-24 bg-gray-200" />

                <div className="h-6 w-full bg-gray-200" />

                <div className="h-4 w-20 bg-gray-200" />

                <div className="h-5 w-28 bg-gray-200" />

                <div className="h-10 w-full bg-gray-200" />

            </div>

        </div>
    );
}