import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, rgba(11,13,16,1) 0%, rgba(18,21,27,1) 60%, rgba(92,124,250,0.35) 100%)",
          color: "#EDEFF4"
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>Roam</div>
        <div style={{ marginTop: 18, fontSize: 28, color: "#8B93A7" }}>Here. Now. Mutual.</div>
      </div>
    ),
    size
  );
}
