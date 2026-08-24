function decodeHtml(html) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

export default function JournalContent({ content }) {
  const decodedContent = decodeHtml(content || "");

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <article
          className="
            journal-content
            text-[16px]
            leading-8
            text-[#4B4B4B]

            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0

            [&>p]:mb-7
            [&>p]:leading-8

            [&>h1]:mt-14
            [&>h1]:mb-6
            [&>h1]:font-cormorant
            [&>h1]:text-5xl
            [&>h1]:font-semibold
            [&>h1]:text-[#183425]

            [&>h2]:mt-12
            [&>h2]:mb-5
            [&>h2]:font-cormorant
            [&>h2]:text-4xl
            [&>h2]:font-semibold
            [&>h2]:text-[#183425]

            [&>h3]:mt-10
            [&>h3]:mb-4
            [&>h3]:font-cormorant
            [&>h3]:text-3xl
            [&>h3]:font-semibold
            [&>h3]:text-[#183425]

            [&>ul]:my-8
            [&>ul]:list-disc
            [&>ul]:space-y-3
            [&>ul]:pl-6

            [&>ol]:my-8
            [&>ol]:list-decimal
            [&>ol]:space-y-3
            [&>ol]:pl-6

            [&>blockquote]:my-10
            [&>blockquote]:border-l-4
            [&>blockquote]:border-[#B68C2F]
            [&>blockquote]:bg-[#FAF8F5]
            [&>blockquote]:py-6
            [&>blockquote]:pl-6
            [&>blockquote]:pr-4
            [&>blockquote]:font-cormorant
            [&>blockquote]:text-3xl
            [&>blockquote]:italic
            [&>blockquote]:text-[#183425]

            [&>img]:my-10
            [&>img]:w-full
            [&>img]:rounded-3xl

            [&_a]:font-medium
            [&_a]:text-[#B68C2F]
            [&_a]:underline
            [&_a]:underline-offset-4
            hover:[&_a]:text-[#183425]
          "
          dangerouslySetInnerHTML={{
            __html: decodedContent,
          }}
        />
      </div>
    </section>
  );
}