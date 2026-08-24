import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchWebsiteCollection,
  fetchCollectionProducts,
} from "../../redux/websiteCollection";

import CollectionDetailHero from "../../components/website/collections/CollectionDetailHero";
import CollectionStory from "../../components/website/collections/CollectionStory";
import CollectionCategories from "../../components/website/collections/CollectionCategories";
import CollectionProducts from "../../components/website/collections/CollectionProducts";
import CollectionCTA from "../../components/website/collections/CollectionCTA";
import CollectionSkeleton from "../../components/website/collections/CollectionSkeleton";

const CollectionDetail = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const {
    collection,
    collectionLoading,
    collectionProducts,
    collectionProductsLoading,
  } = useSelector((state) => state.websiteCollection);

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchWebsiteCollection(slug));
    dispatch(fetchCollectionProducts(slug));
  }, [dispatch, slug]);

  // Loading
  if (collectionLoading && !collection) {
    return <CollectionSkeleton />;
  }

  // Not Found
  if (!collection) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-cormorant text-5xl text-[#183425]">
            Collection Not Found
          </h2>

          <p className="mt-4 text-gray-500">
            The requested collection does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {collection?.metaTitle ||
            `${collection?.name} | His Masterpiece`}
        </title>

        <meta
          name="description"
          content={
            collection?.metaDescription ||
            collection?.shortDescription ||
            ""
          }
        />
      </Helmet>

      {/* Hero */}
      <CollectionDetailHero collection={collection} />

      {/* Story */}
      {collection?.storyDescription && (
        <CollectionStory collection={collection} />
      )}

      {/* Categories */}
      {Array.isArray(collection?.categories) &&
        collection.categories.length > 0 && (
          <CollectionCategories
            categories={collection.categories}
          />
        )}

      {/* Products */}
      <CollectionProducts
        products={
          Array.isArray(collectionProducts)
            ? collectionProducts
            : []
        }
        loading={collectionProductsLoading}
      />

      {/* CTA */}
      <CollectionCTA />
    </>
  );
};

export default CollectionDetail;