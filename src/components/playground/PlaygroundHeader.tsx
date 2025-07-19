import React from 'react';

interface PlaygroundHeaderProps {
  title: string;
  subtitle: string;
}

function PlaygroundHeader({ title, subtitle }: PlaygroundHeaderProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundHeader;
