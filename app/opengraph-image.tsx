import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1d4ed8',
          color: 'white',
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>Sacrament Meeting Planner</div>
        <div style={{ fontSize: 28, fontWeight: 400, marginTop: 20, opacity: 0.85 }}>
          Plan, manage, and review meeting agendas
        </div>
      </div>
    ),
    size
  );
}