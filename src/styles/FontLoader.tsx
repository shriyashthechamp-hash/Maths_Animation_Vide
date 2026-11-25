import React from "react";

export const FontLoader: React.FC = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inter:wght@400..700&family=Space+Grotesk:wght@400..700&display=swap');

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background-color: #FAFAF8;
        -webkit-font-smoothing: antialiased;
      }
    `}</style>
  );
};
