import CollectionCard from "./CollectionCard";

const CollectionGrid = ({ collections = [] }) => {
  return (
    <section className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
        {collections.map((item) => (
          <CollectionCard
            key={item._id}
            collection={item}
          />
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;