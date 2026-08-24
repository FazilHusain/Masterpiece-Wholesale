import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteCollections } from "../../redux/websiteCollection";

import CollectionHero from "../../components/website/collections/CollectionHero";
import CollectionGrid from "../../components/website/collections/CollectionGrid";
import CollectionSkeleton from "../../components/website/collections/CollectionSkeleton";
import EmptyCollection from "../../components/website/collections/EmptyCollection";

const Collections = () => {
  const dispatch = useDispatch();

  const { collections = [], loading } = useSelector(
    (state) => state.websiteCollection
  );

  useEffect(() => {
    dispatch(fetchWebsiteCollections());
  }, [dispatch]);

  return (
    <>
      {/* ================= SEO ================= */}

      <Helmet>
        <title>Luxury Collections | His Masterpiece</title>

        <meta
          name="description"
          content="Discover handcrafted luxury home décor collections curated for premium residential and hospitality interiors."
        />
      </Helmet>

      {/* ================= HERO ================= */}

      <CollectionHero />

      {/* ================= COLLECTIONS ================= */}

      {loading ? (
        <CollectionSkeleton />
      ) : collections.length === 0 ? (
        <EmptyCollection />
      ) : (
        <>
          <CollectionGrid collections={collections} />

          {/* ================= CUSTOM COLLECTION CTA ================= */}

          <section className="bg-[#183425] py-14 text-white lg:py-16">
            <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

              <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#B68C2F]">
                Crafted For Luxury Interiors
              </p>

              <h2
                className="mt-3 text-[32px] leading-tight sm:text-[36px] lg:text-[42px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Looking for a Custom Collection?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-[12px] leading-6 text-white/70">
                Collaborate with our team to develop bespoke collections
                tailored for luxury residences, hospitality projects and
                international wholesale buyers.
              </p>

              <a
                href="/contact"
                className="mt-7 inline-flex border border-[#B68C2F] px-6 py-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#B68C2F] hover:text-[#183425]"
              >
                Contact Our Team
              </a>

            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Collections;