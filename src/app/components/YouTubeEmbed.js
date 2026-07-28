export default function YouTubeEmbed({ id, title = "YouTube video" }) {
  if (!id) return null;

  return (
    <div className="not-prose my-8 aspect-video w-full overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
