import { ImageResponse } from "next/og";

export const alt = "Only Zeko — calisthenics athlete and personal trainer, Marrakech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          color: "#f2efe6",
          padding: "52px 58px 46px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: 560,
            border: "1px solid rgba(242,239,230,0.16)",
            right: -90,
            top: 80,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            borderRadius: 430,
            border: "1px solid rgba(200,255,61,0.55)",
            right: -25,
            top: 145,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 1,
            height: 630,
            background: "rgba(242,239,230,0.1)",
            right: 210,
            top: 0,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 344,
            height: 10,
            borderRadius: 10,
            background: "#ff9a5c",
            right: 102,
            top: 360,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(242,239,230,0.36)",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: -2,
              }}
            >
              OZ
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                fontSize: 16,
                letterSpacing: 3,
                color: "#f2efe6",
              }}
            >
              <span>ONLY ZEKO</span>
              <span style={{ color: "#8a8f8a", fontSize: 11, letterSpacing: 2 }}>
                CALISTHENICS / MA
              </span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 13, letterSpacing: 3, color: "#8a8f8a" }}>
            MARRAKECH / 31.6295 N
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginTop: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 174,
              fontWeight: 800,
              letterSpacing: -12,
              lineHeight: 0.82,
              display: "flex",
            }}
          >
            ONLY
          </div>
          <div
            style={{
              fontSize: 174,
              fontWeight: 800,
              letterSpacing: -12,
              lineHeight: 0.82,
              display: "flex",
              color: "#ff9a5c",
            }}
          >
            ZEKO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(242,239,230,0.18)",
            paddingTop: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>
              Master your body.
            </span>
            <span style={{ fontSize: 12, letterSpacing: 3, color: "#8a8f8a" }}>
              BODYWEIGHT / SKILL / CONTROL
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 14, letterSpacing: 2, color: "#ff9a5c" }}>
            @ONLY_ZEKO
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
