"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem
} from "./ui/menubar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "./ui/resizable";
import {
  Play,
  Pause,
  Square,
  FolderTree,
  Search,
  Settings,
  Camera,
  Sun,
  User,
  X as CloseIcon
} from "lucide-react";

export default function GameEngineLayout() {
  // État de visibilité des panneaux
  const [panels, setPanels] = useState({
    hierarchy: true,
    viewport: true,
    inspector: true,
    console: true,
  });

  // Empêcher de tout fermer (au moins un panneau doit rester ouvert)
  const canClose = Object.values(panels).filter(Boolean).length > 1;

  const handleClose = (key: keyof typeof panels) => {
    if (canClose) setPanels((prev) => ({ ...prev, [key]: false }));
  };
  const handleToggle = (key: keyof typeof panels) => {
    setPanels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col bg-[#181A20] min-h-screen text-white">
      {/* Menubar */}
      <header className="z-10 flex flex-col">
        <Menubar className="bg-[#23242b] px-1 border-none rounded-none h-9 text-white" >
          <MenubarMenu>
            <MenubarTrigger>Fichier</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Nouveau projet</MenubarItem>
              <MenubarItem>Ouvrir...</MenubarItem>
              <MenubarItem>Enregistrer</MenubarItem>
              <MenubarItem>Quitter</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Édition</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Annuler</MenubarItem>
              <MenubarItem>Rétablir</MenubarItem>
              <MenubarItem>Copier</MenubarItem>
              <MenubarItem>Coller</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Affichage</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem
                checked={panels.hierarchy}
                onCheckedChange={() => handleToggle("hierarchy")}
              >Hiérarchie</MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={panels.viewport}
                onCheckedChange={() => handleToggle("viewport")}
              >Viewport</MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={panels.inspector}
                onCheckedChange={() => handleToggle("inspector")}
              >Inspecteur</MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={panels.console}
                onCheckedChange={() => handleToggle("console")}
              >Console</MenubarCheckboxItem>
              <div className="my-1 border-[#282a32] border-t" />
              <MenubarItem>Plein écran</MenubarItem>
              <MenubarItem>Thème sombre</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <div className="flex-1" />
          <div className="flex gap-1 ml-2">
            <Button size="icon" variant="ghost" className="hover:bg-[#23242b]" aria-label="Play"><Play className="text-green-400" /></Button>
            <Button size="icon" variant="ghost" className="hover:bg-[#23242b]" aria-label="Pause"><Pause className="text-yellow-400" /></Button>
            <Button size="icon" variant="ghost" className="hover:bg-[#23242b]" aria-label="Stop"><Square className="text-red-400" /></Button>
          </div>
        </Menubar>
      </header>
      {/* Main layout with resizable panels */}
      <ResizablePanelGroup direction="vertical" className="flex-1 min-h-0">
        {/* Zone principale (hiérarchie, viewport, inspecteur) */}
        <ResizablePanel defaultSize={80} minSize={30} maxSize={95} className="min-h-0">
          <ResizablePanelGroup direction="horizontal" className="h-full min-h-0">
            {/* Sidebar */}
            <div className="w-14 min-h-0">
              <aside className="flex flex-col items-center gap-2 bg-[#202127] py-2 border-[#23242b] border-r w-full h-full">
                <Button size="icon" variant="ghost" className="hover:bg-[#23242b]" aria-label="Hiérarchie"><FolderTree className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" className="hover:bg-[#23242b]" aria-label="Recherche"><Search className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" className="hover:bg-[#23242b]" aria-label="Paramètres"><Settings className="w-5 h-5" /></Button>
              </aside>
            </div>
            {/* Hiérarchie */}
            {panels.hierarchy && (
              <ResizablePanel defaultSize={6} minSize={6} maxSize={40} className="min-h-0">
                <section className="relative flex flex-col bg-[#202127] border-[#23242b] border-r w-full h-full">
                  <div className="flex justify-between items-center px-3 py-2 border-[#23242b] border-b">
                    <span className="font-semibold text-white/70 text-xs tracking-wide">HIÉRARCHIE</span>
                    <Button size="icon" variant="ghost" className="flex justify-center items-center w-7 h-7" aria-label="Fermer Hiérarchie" onClick={() => handleClose("hierarchy")} disabled={!canClose}>
                      <CloseIcon className="w-4 h-4 text-white/60" />
                    </Button>
                  </div>
                  <ul className="flex-1 space-y-1 py-2 text-xs">
                    <li className="flex items-center gap-2 hover:bg-[#23242b] px-3 py-1.5 rounded transition cursor-pointer"><Camera className="w-4 h-4 text-blue-400" /> Main Camera</li>
                    <li className="flex items-center gap-2 hover:bg-[#23242b] px-3 py-1.5 rounded transition cursor-pointer"><User className="w-4 h-4 text-green-400" /> Player</li>
                    <li className="flex items-center gap-2 hover:bg-[#23242b] px-3 py-1.5 rounded transition cursor-pointer"><Sun className="w-4 h-4 text-yellow-400" /> Light</li>
                    <li className="flex items-center gap-2 hover:bg-[#23242b] px-3 py-1.5 rounded transition cursor-pointer"><Settings className="w-4 h-4 text-purple-400" /> Environnement</li>
                  </ul>
                </section>
              </ResizablePanel>
            )}
            {panels.hierarchy && <ResizableHandle withHandle />}
            {/* Viewport */}
            {panels.viewport && (
              <ResizablePanel defaultSize={50} minSize={10} className="min-h-0">
                <main className="relative flex flex-col flex-1 bg-[#181A20] p-0 min-w-0 h-full">
                  <div className="flex justify-between items-center px-3 py-2 border-[#23242b] border-b w-full">
                    <span className="font-semibold text-white/70 text-xs tracking-wide">VIEWPORT</span>
                    <Button size="icon" variant="ghost" className="flex justify-center items-center w-7 h-7" aria-label="Fermer Viewport" onClick={() => handleClose("viewport")} disabled={!canClose}>
                      <CloseIcon className="w-4 h-4 text-white/60" />
                    </Button>
                  </div>
                  <div className="flex flex-1 justify-center items-center w-full">
                    <div className="flex justify-center items-center bg-[#23242b] shadow-lg border border-[#23242b] rounded-lg w-full max-w-3xl h-[400px] text-muted-foreground">
                      <span className="font-mono text-white/40 text-base">[ Aperçu de la scène ]</span>
                    </div>
                  </div>
                </main>
              </ResizablePanel>
            )}
            {panels.viewport && <ResizableHandle withHandle />}
            {/* Inspecteur */}
            {panels.inspector && (
              <ResizablePanel defaultSize={8} minSize={6} maxSize={40} className="min-h-0">
                <section className="relative flex flex-col bg-[#202127] border-[#23242b] border-l w-full h-full">
                  <div className="flex justify-between items-center px-3 py-2 border-[#23242b] border-b">
                    <span className="font-semibold text-white/70 text-xs tracking-wide">INSPECTEUR</span>
                    <Button size="icon" variant="ghost" className="flex justify-center items-center w-7 h-7" aria-label="Fermer Inspecteur" onClick={() => handleClose("inspector")} disabled={!canClose}>
                      <CloseIcon className="w-4 h-4 text-white/60" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-4 text-xs">
                    <div>Nom : <span className="font-mono text-white/90">Player</span></div>
                    <div>Position : <span className="font-mono text-white/90">(0, 1, 0)</span></div>
                    <div>Rotation : <span className="font-mono text-white/90">(0, 0, 0)</span></div>
                    <div>Échelle : <span className="font-mono text-white/90">(1, 1, 1)</span></div>
                  </div>
                </section>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
        {panels.console && <ResizableHandle withHandle />}
        {/* Console */}
        {panels.console && (
          <ResizablePanel defaultSize={20} minSize={10} maxSize={40} className="min-h-0">
            <footer className="relative flex flex-col bg-[#181A20] px-0 py-0 border-[#23242b] border-t h-full">
              <div className="flex justify-between items-center px-4 py-2 border-[#23242b] border-b">
                <span className="font-semibold text-white/70 text-xs tracking-wide">CONSOLE</span>
                <Button size="icon" variant="ghost" className="flex justify-center items-center w-7 h-7" aria-label="Fermer Console" onClick={() => handleClose("console")} disabled={!canClose}>
                  <CloseIcon className="w-4 h-4 text-white/60" />
                </Button>
              </div>
              <div className="flex-1 bg-[#181A20] px-4 py-2 overflow-auto font-mono text-green-400 text-xs">
                <div>&gt; Moteur initialisé.</div>
                <div>&gt; Chargement de la scène...</div>
                <div>&gt; Aucun message d&apos;erreur.</div>
              </div>
            </footer>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
} 