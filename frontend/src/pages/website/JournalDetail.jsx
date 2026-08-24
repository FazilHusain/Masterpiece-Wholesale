import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import { fetchRelatedJournals, fetchWebsiteJournal } from "../../redux/journal";

import JournalSkeleton from "../../components/website/journal/JournalSkeleton";
import EmptyJournal from "../../components/website/journal/EmptyJournal";
import JournalContent from "../../components/website/journal/JournalContent";
import ShareArticle from "../../components/website/journal/ShareArticle";
import RelatedStories from "../../components/website/journal/RelatedStories";

export default function JournalDetail() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const { journal, relatedJournals, loading } = useSelector(
    (state) => state.journal,
  );

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchWebsiteJournal(slug));
    dispatch(fetchRelatedJournals(slug));
  }, [dispatch, slug]);

  /* ================= LOADING ================= */

  if (loading) {
    return <JournalSkeleton />;
  }

  /* ================= EMPTY ================= */

  if (!journal) {
    return <EmptyJournal />;
  }

  return (
    <>
      {/* ================= SEO ================= */}

      <Helmet>
        <title>{journal.metaTitle || journal.title} | His Masterpiece</title>

        {journal.metaDescription && (
          <meta name="description" content={journal.metaDescription} />
        )}

        {journal.metaKeywords?.length > 0 && (
          <meta name="keywords" content={journal.metaKeywords.join(", ")} />
        )}
      </Helmet>

      {/* ================= HERO ================= */}

      <section className="border-b border-[#ECE7DE] bg-[#FAF8F5]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-14">
          {/* Breadcrumb */}

          <div className="mb-6 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#8B8B8B]">
            <Link to="/" className="transition hover:text-[#183425]">
              Home
            </Link>

            <span>/</span>

            <Link to="/journal" className="transition hover:text-[#183425]">
              Journal
            </Link>

            <span>/</span>

            <span className="max-w-[220px] truncate text-[#183425]">
              {journal.title}
            </span>
          </div>

          {/* Category */}

          {journal.category && (
            <span className="inline-flex bg-[#183425]/5 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#B68C2F]">
              {journal.category}
            </span>
          )}

          {/* Title */}

          <h1
            className="mt-4 max-w-4xl text-[36px] font-medium leading-[1.05] text-[#183425] sm:text-[42px] lg:text-[52px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            {journal.title}
          </h1>

          {/* Meta */}

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-[#666]">
            {journal.author && <span>{journal.author}</span>}

            {journal.author && journal.publishedAt && <span>•</span>}

            {journal.publishedAt && (
              <span>
                {new Date(journal.publishedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURED IMAGE ================= */}

      <section className="bg-white py-8 lg:py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="overflow-hidden">
            <img
              src={journal.featuredImage || "/images/placeholder-journal.jpg"}
              alt={journal.title}
              loading="eager"
              className="h-[240px] w-full object-cover sm:h-[320px] md:h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <JournalContent content={journal.content} />

      {/* ================= SHARE ================= */}

      <ShareArticle journal={journal} />

      {/* ================= RELATED ================= */}

      <RelatedStories journals={relatedJournals} currentSlug={journal.slug} />
    </>
  );
}
