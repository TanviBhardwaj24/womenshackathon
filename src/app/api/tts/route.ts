import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = (await req.json()) as { text: string };

  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID;

  if (!apiKey || apiKey === "your_minimax_api_key_here" || !groupId || groupId === "your_group_id_here") {
    return NextResponse.json(
      { error: "TTS not configured. Add MINIMAX_API_KEY and MINIMAX_GROUP_ID to .env.local" },
      { status: 503 }
    );
  }

  // Truncate long text to keep TTS responses reasonable
  const truncatedText = text.length > 500 ? text.slice(0, 500) + "..." : text;

  try {
    const response = await fetch(`https://api.minimax.io/v1/t2a_v2?GroupId=${groupId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "speech-02-hd",
        text: truncatedText,
        voice_setting: {
          voice_id: "English_Graceful_Lady",
          speed: 0.95,
          pitch: 0,
          emotion: "happy",
        },
        audio_setting: {
          format: "mp3",
          sample_rate: 32000,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("MiniMax TTS error:", error);
      return NextResponse.json({ error: "TTS request failed" }, { status: 500 });
    }

    const result = await response.json();
    console.log("MiniMax TTS response keys:", JSON.stringify(Object.keys(result)));
    console.log("MiniMax TTS result:", JSON.stringify(result).slice(0, 500));

    if (result.data?.audio) {
      // The audio is returned as hex-encoded data
      const audioBuffer = Buffer.from(result.data.audio, "hex");
      return new Response(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": String(audioBuffer.length),
        },
      });
    }

    // If audio is base64 encoded
    if (result.audio_file) {
      const audioBuffer = Buffer.from(result.audio_file, "base64");
      return new Response(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": String(audioBuffer.length),
        },
      });
    }

    return NextResponse.json({ error: "No audio data received" }, { status: 500 });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json({ error: "TTS request failed" }, { status: 500 });
  }
}
