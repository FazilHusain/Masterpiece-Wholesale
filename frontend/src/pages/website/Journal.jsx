import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import JournalHero from "../../components/website/journal/JournalHero";
import JournalFilter from "../../components/website/journal/JournalFilter";
import FeaturedStory from "../../components/website/journal/FeaturedStory";
import StoryGrid from "../../components/website/journal/StoryGrid";
import SidebarStories from "../../components/website/journal/SidebarStories";

import {
  fetchFeaturedJournal,
  fetchWebsiteJournals,
} from "../../redux/journal";

import JournalSkeleton from "../../components/website/journal/JournalSkeleton";
import EmptyJournal from "../../components/website/journal/EmptyJournal";

export default function Journal() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    websiteJournals = [],
    featuredJournal = null,
    loading,
  } = useSelector((state) => state.journal);

  // =========================================
  // FETCH JOURNALS
  // =========================================

  useEffect(() => {
    dispatch(fetchWebsiteJournals());
    dispatch(fetchFeaturedJournal());
  }, [dispatch]);

  // =========================================
  // NORMALIZE CATEGORY
  // =========================================

  const normalizeCategory = (value) => {
    return String(value || "")
      .trim()
      .toLowerCase();
  };

  // =========================================
  // NON-FEATURED STORIES
  // =========================================

  const normalStories = useMemo(() => {
    return websiteJournals.filter(
      (item) => !item.isFeatured
    );
  }, [websiteJournals]);

  // =========================================
  // FILTER STORIES
  // =========================================

  const filteredStories = useMemo(() => {
    if (selectedCategory === "All") {
      return normalStories;
    }

    const selected = normalizeCategory(selectedCategory);

    return normalStories.filter((item) => {
      return (
        normalizeCategory(item.category) === selected
      );
    });
  }, [
    normalStories,
    selectedCategory,
  ]);

  // =========================================
  // SIDEBAR STORIES
  // =========================================

  const sidebarStories = useMemo(() => {
    return normalStories.slice(0, 4);
  }, [normalStories]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return <JournalSkeleton />;
  }

  // =========================================
  // COMPLETELY EMPTY
  // =========================================

  if (
    websiteJournals.length === 0 &&
    !featuredJournal
  ) {
    return (
      <>
        <JournalHero />
        <EmptyJournal />
      </>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <>
      <JournalHero />

      <JournalFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* FEATURED JOURNAL */}
      {featuredJournal && (
        <FeaturedStory story={featuredJournal} />
      )}

      {/* NORMAL STORIES */}
      {filteredStories.length > 0 && (
        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.45fr_0.75fr]">

            <StoryGrid
              stories={filteredStories}
            />

            {sidebarStories.length > 0 && (
              <SidebarStories
                stories={sidebarStories}
              />
            )}

          </div>
        </section>
      )}

      {/* CATEGORY EMPTY STATE */}
      {normalStories.length > 0 &&
        filteredStories.length === 0 && (
          <section className="px-6 py-20 text-center">
            <h2 className="font-serif text-3xl text-[#12312B]">
              No Stories Found
            </h2>

            <p className="mt-3 text-gray-500">
              No journal articles are available in this
              category yet.
            </p>
          </section>
        )}
    </>
  );
}