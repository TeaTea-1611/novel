import React from "react";

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export const Wrapper = ({ children, title, description }: Props) => {
  return (
    <div className="flex-1 rounded-lg border bg-card shadow-sm p-1">
      <div className="space-y-1 bg-primary/10 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground"> {description}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};
