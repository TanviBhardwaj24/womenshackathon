interface TelegramPostData {
  channelName: string;
  postId: string;
  text: string;
  urls: string[];
  hasMedia: boolean;
  timestamp?: string;
}

export async function fetchTelegramPost(telegramUrl: string): Promise<TelegramPostData> {
  const match = telegramUrl.match(/(?:t\.me|telegram\.me)\/([^/]+)\/(\d+)/i);
  if (!match) {
    throw new Error("Invalid Telegram URL format");
  }

  const [, channelName, postId] = match;
  const embedUrl = `https://t.me/${channelName}/${postId}?embed=1&mode=tme`;

  try {
    const response = await fetch(embedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BlockSteerBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Telegram post: ${response.status}`);
    }

    const html = await response.text();
    return parseTelegramEmbed(html, channelName, postId);
  } catch (error) {
    console.error("Error fetching Telegram post:", error);
    return {
      channelName,
      postId,
      text: "",
      urls: [],
      hasMedia: false,
    };
  }
}

function parseTelegramEmbed(html: string, channelName: string, postId: string): TelegramPostData {
  const urls: string[] = [];
  const textContent: string[] = [];

  const textMatch = html.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (textMatch) {
    let text = textMatch[1];
    
    const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([^<]*)<\/a>/gi;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      const href = linkMatch[1];
      if (href && !href.startsWith("tg://") && !href.includes("t.me/")) {
        urls.push(decodeHtmlEntities(href));
      }
    }

    text = text.replace(/<[^>]+>/g, " ");
    text = decodeHtmlEntities(text);
    text = text.replace(/\s+/g, " ").trim();
    textContent.push(text);
  }

  const urlRegex = /https?:\/\/[^\s<>"']+/gi;
  const rawText = textContent.join(" ");
  const additionalUrls = rawText.match(urlRegex) || [];
  for (const url of additionalUrls) {
    if (!urls.includes(url) && !url.includes("t.me/")) {
      urls.push(url);
    }
  }

  const hasMedia = html.includes("tgme_widget_message_photo") || 
                   html.includes("tgme_widget_message_video") ||
                   html.includes("tgme_widget_message_document");

  const timeMatch = html.match(/<time[^>]+datetime="([^"]+)"/i);
  const timestamp = timeMatch ? timeMatch[1] : undefined;

  return {
    channelName,
    postId,
    text: rawText,
    urls: [...new Set(urls)],
    hasMedia,
    timestamp,
  };
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function parseTelegramUrl(url: string): { channelName: string; postId: string } | null {
  const match = url.match(/(?:t\.me|telegram\.me)\/([^/]+)\/(\d+)/i);
  if (!match) return null;
  return { channelName: match[1], postId: match[2] };
}

export function buildTelegramUrl(channelName: string, postId: string): string {
  return `https://t.me/${channelName}/${postId}`;
}
