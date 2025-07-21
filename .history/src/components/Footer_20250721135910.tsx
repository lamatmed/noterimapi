import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 mt-12 bg-gradient-to-t from-background to-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo avec effet de profondeur */}
          <div className="mb-4">
            <div className="relative">
              <span className="text-2xl font-bold tracking-widest text-foreground z-10 relative">
                RIM Notes
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 w-full h-3/4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          {/* Ligne de séparation décorative */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent my-4" />
          
          {/* Copyright et année */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="opacity-80">©</span>
            <span>{currentYear}</span>
            <span className="opacity-80">RIM Notes. All rights reserved.</span>
          </p>
          
          {/* Micro-interaction moderne */}
          <div className="mt-4 w-10 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}