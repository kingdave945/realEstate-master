// components/AgentSkeleton.tsx
export default function AgentSkeleton() {
  return (
    <div style={{ padding: "2rem" }}>
      
      <div
        
        style={{
          height: "40px",
          width: "250px",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          marginBottom: "1rem",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div style=
      {{
       display: "flex",
       gap:"20px"
      }}>

    
      <div
        style={{
          height: "210px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          marginBottom: "1rem",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div
        style={{
           height: "210px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          marginBottom: "1rem",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div
        style={{
         height: "210px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          marginBottom: "1rem",
          animation: "pulse 1.5s infinite",
        }}
      />
        </div>
      <div
        style={{
          height: "160px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          animation: "pulse 1.5s infinite",
        }}
      />

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
