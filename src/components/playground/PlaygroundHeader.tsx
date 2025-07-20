import React from 'react';

interface PlaygroundHeaderProps {
  title: string;
  subtitle: string;
}

function PlaygroundHeader({ title, subtitle }: PlaygroundHeaderProps) {
  return (
    <div className="bg-card mb-6 rounded-lg border p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundHeader;
