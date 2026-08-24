import { useState } from "react";
import {
  Link2,
  Share2,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter} from "react-icons/fa";

export default function ShareArticle({ journal }) {
  const [copied, setCopied] = useState(false);

  const pageUrl = window.location.href;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pageUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: journal.title,
        text: journal.shortDescription,
        url: pageUrl,
      });
    } catch (err) {}
  };

  return (
    <section className="border-y border-[#ECE7DE] bg-[#FAF8F5] py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-6 lg:flex-row lg:px-8">
        <div>
          <p className="font-cormorant text-3xl text-[#183425]">
            Enjoyed this article?
          </p>

          <p className="mt-2 text-sm text-[#777]">
            Share it with your friends and colleagues.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="rounded-full border border-[#ECE7DE] p-3 transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
            >
              <Share2 size={18} />
            </button>
          )}

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              pageUrl
            )}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#ECE7DE] p-3 transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            <FaFacebook size={18} />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              pageUrl
            )}&text=${encodeURIComponent(journal.title)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#ECE7DE] p-3 transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            <FaTwitter size={18} />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              pageUrl
            )}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#ECE7DE] p-3 transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            <FaLinkedin size={18} />
          </a>

          <button
            onClick={handleCopy}
            className="rounded-full border border-[#ECE7DE] p-3 transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            <Link2 size={18} />
          </button>

          {copied && (
            <span className="text-sm font-medium text-[#183425]">
              Link Copied
            </span>
          )}
        </div>
      </div>
    </section>
  );
}