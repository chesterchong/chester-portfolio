const YT_RE =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})(?:[^\s]*)?$/i;

function youtubeIdFromNode(node) {
  if (!node) return null;
  if (node.type === "text") {
    const match = node.value.trim().match(YT_RE);
    return match ? match[1] : null;
  }
  if (node.type === "link") {
    const match = String(node.url || "").trim().match(YT_RE);
    return match ? match[1] : null;
  }
  return null;
}

function toEmbed(id) {
  return {
    type: "mdxJsxFlowElement",
    name: "YouTubeEmbed",
    attributes: [{ type: "mdxJsxAttribute", name: "id", value: id }],
    children: [],
  };
}

function isBlankText(node) {
  return node?.type === "text" && !node.value.trim();
}

/** Turn a YouTube URL (or link) into <YouTubeEmbed />. */
export default function remarkYoutube() {
  return (tree) => {
    const nodes = tree.children || [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type !== "paragraph" || !node.children?.length) continue;

      const children = node.children;

      // Whole paragraph is just a YouTube URL / link
      const meaningful = children.filter((child) => !isBlankText(child));
      if (meaningful.length === 1) {
        const id = youtubeIdFromNode(meaningful[0]);
        if (id) {
          nodes[i] = toEmbed(id);
          continue;
        }
      }

      // Trailing soft-break + YouTube URL (common when no blank line before the link)
      // e.g. "…answers the question.\nhttps://youtube.com/…"
      for (let j = children.length - 1; j >= 1; j--) {
        if (isBlankText(children[j])) continue;

        const id = youtubeIdFromNode(children[j]);
        if (!id) break;

        let k = j - 1;
        while (k >= 0 && isBlankText(children[k])) k--;
        if (k < 0 || children[k].type !== "break") break;

        const before = children.slice(0, k);
        while (before.length && isBlankText(before[before.length - 1])) {
          before.pop();
        }

        if (before.length === 0) {
          nodes[i] = toEmbed(id);
        } else {
          node.children = before;
          nodes.splice(i + 1, 0, toEmbed(id));
          i++;
        }
        break;
      }
    }
  };
}
