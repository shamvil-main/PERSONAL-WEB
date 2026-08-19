/**
 * Portfolio Items Repository — Outline / Wireframe Mode
 * Uses zero external images. All visual representations are pure SVG outlines,
 * geometric wireframes, and vector technical frames.
 */

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Videos",
  "Photography",
  "Design",
  "Motion",
  "3D Art"
];

function createOutlineSvg(title, category, ratio, color1 = '#38bdf8', color2 = '#818cf8') {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
    <rect width='100%' height='100%' fill='#0b0b10'/>
    <defs>
      <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='${color1}' stop-opacity='0.2'/>
        <stop offset='100%' stop-color='${color2}' stop-opacity='0.03'/>
      </linearGradient>
      <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.035)' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#grad)'/>
    <rect width='100%' height='100%' fill='url(#grid)'/>
    
    <!-- Outer Wireframe Box -->
    <rect x='24' y='24' width='752' height='952' fill='none' stroke='${color1}' stroke-width='2' stroke-dasharray='12,8' rx='20' opacity='0.45'/>
    
    <!-- Viewfinder Corners -->
    <path d='M 50 90 L 50 50 L 90 50' fill='none' stroke='${color1}' stroke-width='3.5'/>
    <path d='M 750 90 L 750 50 L 710 50' fill='none' stroke='${color1}' stroke-width='3.5'/>
    <path d='M 50 910 L 50 950 L 90 950' fill='none' stroke='${color1}' stroke-width='3.5'/>
    <path d='M 750 910 L 750 950 L 710 950' fill='none' stroke='${color1}' stroke-width='3.5'/>
    
    <!-- Center Target Diagram -->
    <circle cx='400' cy='440' r='80' fill='none' stroke='${color1}' stroke-width='1.5' stroke-dasharray='6,4' opacity='0.6'/>
    <circle cx='400' cy='440' r='45' fill='none' stroke='${color1}' stroke-width='2' opacity='0.8'/>
    <line x1='360' y1='440' x2='440' y2='440' stroke='${color1}' stroke-width='1.5' opacity='0.5'/>
    <line x1='400' y1='400' x2='400' y2='480' stroke='${color1}' stroke-width='1.5' opacity='0.5'/>
    
    <!-- Technical Labels -->
    <text x='400' y='570' font-family='system-ui, sans-serif' font-size='32' font-weight='800' fill='#ffffff' text-anchor='middle' letter-spacing='2'>[ ${ratio} ]</text>
    <text x='400' y='615' font-family='system-ui, sans-serif' font-size='20' font-weight='700' fill='${color1}' text-anchor='middle' letter-spacing='4'>${category.toUpperCase()} FRAME</text>
    <text x='400' y='655' font-family='system-ui, sans-serif' font-size='16' fill='#94a3b8' text-anchor='middle'>WIREFRAME OUTLINE PREVIEW</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const portfolioItems = [
  {
    id: "custom-user-video-1",
    title: "BNMX BRAND REEL",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16", // Vertical 9:16 Reel (720x1280)
    src: "/VIDEOS/Video-12111.mp4",
    poster: "/VIDEOS/Video-12111.mp4.png",
    description: "Original vertical 9:16 cinematic commercial reel created for BNMX.",
    year: "2026",
    client: "BNMX",
    tools: ["DaVinci Resolve", "Premiere Pro", "Cinema Camera"],
    duration: "0:49",
    featured: true
  },
  {
    id: "custom-user-video-2",
    title: "MSF URGGATEERI",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "16:9", // Widescreen 16:9 Film (638x360)
    src: "/VIDEOS/Video-49984.mp4",
    poster: "/VIDEOS/Video-49984.mp4.png",
    description: "Original 16:9 widescreen cinematic film project created for MSF URGGATEERI.",
    year: "2025",
    client: "MSF URGGATEERI",
    tools: ["DaVinci Resolve", "Color Finale", "Logic Pro X"],
    duration: "1:32",
    featured: true
  },
  {
    id: "custom-user-video-3",
    title: "URGATEERI PANCHAYATH FILM",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "16:9", // Widescreen 16:9 Film (638x360)
    src: "/VIDEOS/Video-28064.mp4",
    poster: "/VIDEOS/Video-28064.mp4.png",
    description: "Original 16:9 widescreen cinematic documentary film project created for URGATEERI PANCHAYATH.",
    year: "2025",
    client: "URGATEERI PANCHAYATH",
    tools: ["DaVinci Resolve", "Drone Cinema", "Premiere Pro"],
    duration: "1:15",
    featured: true
  },
  {
    id: "custom-user-video-4",
    title: "UI/UX APP PROMO REEL",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16",
    src: "/VIDEOS/WhatsApp-Video-1.mp4",
    poster: "/VIDEOS/WhatsApp-Video-1.mp4.png",
    description: "Original vertical 9:16 interactive app showcase and UI motion presentation reel.",
    year: "2026",
    client: "App Motion",
    tools: ["After Effects", "Figma", "Premiere Pro"],
    duration: "0:14",
    featured: true
  },
  {
    id: "custom-user-video-5",
    title: "ORBIT MOTION GRAPHICS",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16",
    src: "/VIDEOS/WhatsApp-Video-2.mp4",
    poster: "/VIDEOS/WhatsApp-Video-2.mp4.png",
    description: "Dynamic vector motion graphics showcase featuring 3D circular icon paths.",
    year: "2026",
    client: "Interactive Media",
    tools: ["Cinema 4D", "After Effects", "Lottie"],
    duration: "0:18",
    featured: true
  },
  {
    id: "custom-user-video-6",
    title: "HIGHLIGHT MOTION COMMERCIAL",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16",
    src: "/VIDEOS/WhatsApp-Video-3.mp4",
    poster: "/VIDEOS/WhatsApp-Video-3.mp4.png",
    description: "High-impact vertical storytelling promo with custom kinetic typography.",
    year: "2026",
    client: "Highlight Motion",
    tools: ["DaVinci Resolve", "Cinema Camera", "Typography FX"],
    duration: "0:20",
    featured: true
  },
  {
    id: "neon-cyber-reel",
    title: "NEO-TOKYO NIGHTFALL",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16", // Vertical 9:16 Reel
    src: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-neon-lit-city-42868-large.mp4",
    poster: createOutlineSvg("NEO-TOKYO NIGHTFALL", "Videos", "9:16 VERTICAL REEL", "#38bdf8", "#818cf8"),
    description: "Vertical 9:16 wireframe reel outline showcasing technical camera bounds and cybernetic color grading.",
    year: "2026",
    client: "Cyber Wear Co.",
    tools: ["RED V-Raptor", "DaVinci Resolve", "Premiere Pro"],
    duration: "0:24",
    featured: true
  },
  {
    id: "sunset-horizon",
    title: "SOLARIS EXPEDITION",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "16:9", // Horizontal 16:9 Film
    src: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    poster: createOutlineSvg("SOLARIS EXPEDITION", "Videos", "16:9 WIDESCREEN", "#f59e0b", "#f43f5e"),
    description: "Widescreen 16:9 aerial documentary wireframe frame exploring cinematic ratio boundaries.",
    year: "2025",
    client: "National Geographic Creative",
    tools: ["DJI Inspire 3", "Color Finale", "Logic Pro X"],
    duration: "1:12",
    featured: true
  },
  {
    id: "monolith-structure",
    title: "MONOLITH ZERO",
    category: "3D Art",
    mediaType: "image",
    aspectRatio: "1:1", // Square 1:1
    src: createOutlineSvg("MONOLITH ZERO", "3D Art", "1:1 SQUARE MATRIX", "#818cf8", "#c084fc"),
    poster: createOutlineSvg("MONOLITH ZERO", "3D Art", "1:1 SQUARE MATRIX", "#818cf8", "#c084fc"),
    description: "Abstract 3D wireframe box layout investigating brutalist architectural geometry.",
    year: "2026",
    client: "Personal Project",
    tools: ["Cinema 4D", "Octane Render", "Photoshop"],
    featured: true
  },
  {
    id: "futuristic-costume-vertical",
    title: "CYBERNETIC CHRONICLES",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16", // Vertical 9:16 Reel
    src: "https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-woman-in-a-futuristic-costume-48419-large.mp4",
    poster: createOutlineSvg("CYBERNETIC CHRONICLES", "Videos", "9:16 REEL FRAME", "#06b6d4", "#3b82f6"),
    description: "High-contrast vertical reel frame testing outline margins and responsive scaling.",
    year: "2026",
    client: "Vogue Futurism",
    tools: ["Arri Alexa Mini LF", "After Effects", "EbSynth"],
    duration: "0:18",
    featured: false
  },
  {
    id: "ocean-abyss-motion",
    title: "FLUID DYNAMICS",
    category: "Motion",
    mediaType: "video",
    aspectRatio: "16:9", // Horizontal 16:9
    src: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    poster: createOutlineSvg("FLUID DYNAMICS", "Motion", "16:9 MOTION FRAME", "#10b981", "#38bdf8"),
    description: "Macro slow-motion liquid motion design outline simulating wave turbulence.",
    year: "2025",
    client: "Aqua Sound Labs",
    tools: ["Houdini", "Redshift", "Nuke"],
    duration: "0:45",
    featured: true
  },
  {
    id: "dark-portrait-series",
    title: "SHADOW & ILLUMINATION",
    category: "Photography",
    mediaType: "image",
    aspectRatio: "4:5", // Portrait 4:5
    src: createOutlineSvg("SHADOW & ILLUMINATION", "Photography", "4:5 PORTRAIT FRAME", "#ec4899", "#8b5cf6"),
    poster: createOutlineSvg("SHADOW & ILLUMINATION", "Photography", "4:5 PORTRAIT FRAME", "#ec4899", "#8b5cf6"),
    description: "Studio portrait wireframe frame testing chiaroscuro guides and golden ratio balance.",
    year: "2025",
    client: "Kinfolk Magazine",
    tools: ["Hasselblad X2D", "Capture One", "Lightroom"],
    featured: true
  },
  {
    id: "space-nebula-visual",
    title: "COSMIC VOID",
    category: "Motion",
    mediaType: "video",
    aspectRatio: "16:9", // Horizontal 16:9
    src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
    poster: createOutlineSvg("COSMIC VOID", "Motion", "16:9 WIDESCREEN", "#6366f1", "#a855f7"),
    description: "Procedural space motion outline with astronomical grid overlay.",
    year: "2026",
    client: "Starlight Records",
    tools: ["Unreal Engine 5", "After Effects", "Blender"],
    duration: "0:30",
    featured: false
  },
  {
    id: "vertical-neon-sign",
    title: "LUMEN METROPOLIS",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "9:16", // Vertical 9:16 Reel
    src: "https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-neon-sign-in-the-city-48421-large.mp4",
    poster: createOutlineSvg("LUMEN METROPOLIS", "Videos", "9:16 VERTICAL REEL", "#f43f5e", "#f59e0b"),
    description: "Vertical urban outline frame highlighting atmospheric neon signage composition.",
    year: "2026",
    client: "Urban Culture Mag",
    tools: ["Sony A7SIII", "Dehancer Pro", "Final Cut Pro"],
    duration: "0:15",
    featured: true
  },
  {
    id: "minimal-design-system",
    title: "NEO GRAPHICS SYSTEM",
    category: "Design",
    mediaType: "image",
    aspectRatio: "1:1", // Square 1:1
    src: createOutlineSvg("NEO GRAPHICS SYSTEM", "Design", "1:1 SQUARE GRID", "#14b8a6", "#06b6d4"),
    poster: createOutlineSvg("NEO GRAPHICS SYSTEM", "Design", "1:1 SQUARE GRID", "#14b8a6", "#06b6d4"),
    description: "Brand identity system outline and editorial grid prototype.",
    year: "2025",
    client: "Aether Studio",
    tools: ["Figma", "Illustrator", "InDesign"],
    featured: false
  },
  {
    id: "midnight-drive-cinematic",
    title: "MIDNIGHT HIGHWAY",
    category: "Videos",
    mediaType: "video",
    aspectRatio: "16:9", // Horizontal 16:9
    src: "https://assets.mixkit.co/videos/preview/mixkit-mysterious-car-driving-on-a-dark-road-42557-large.mp4",
    poster: createOutlineSvg("MIDNIGHT HIGHWAY", "Videos", "16:9 WIDESCREEN", "#38bdf8", "#6366f1"),
    description: "Cinematic commercial tracking frame outline for nocturnal automotive shoot.",
    year: "2026",
    client: "Motorsport Electric",
    tools: ["RED Komodo", "Freefly MVI Pro", "DaVinci Resolve"],
    duration: "0:40",
    featured: true
  },
  {
    id: "abstract-glass-3d",
    title: "PRISM SPECTRUM",
    category: "3D Art",
    mediaType: "image",
    aspectRatio: "4:5", // Portrait 4:5
    src: createOutlineSvg("PRISM SPECTRUM", "3D Art", "4:5 PORTRAIT FRAME", "#a855f7", "#ec4899"),
    poster: createOutlineSvg("PRISM SPECTRUM", "3D Art", "4:5 PORTRAIT FRAME", "#a855f7", "#ec4899"),
    description: "Refractive glass dispersion outline artwork investigating caustics geometry.",
    year: "2026",
    client: "Gallery Exhibition",
    tools: ["Blender Cycles", "Photoshop", "Lightroom"],
    featured: false
  },
  {
    id: "minimalist-architecture-photo",
    title: "CONCRETE REFLECTIONS",
    category: "Photography",
    mediaType: "image",
    aspectRatio: "3:2", // Landscape 3:2
    src: createOutlineSvg("CONCRETE REFLECTIONS", "Photography", "3:2 LANDSCAPE FRAME", "#64748b", "#94a3b8"),
    poster: createOutlineSvg("CONCRETE REFLECTIONS", "Photography", "3:2 LANDSCAPE FRAME", "#64748b", "#94a3b8"),
    description: "Monochrome architectural outline frame capturing geometric shadows.",
    year: "2025",
    client: "Architectural Digest",
    tools: ["Leica M11", "Silver EFEX Pro", "Lightroom"],
    featured: false
  }
];

export const ARTIST_INFO = {
  name: "SHAMVIL PORTFOLIO",
  title: "Creative Director / Filmmaker / Visual Artist",
  tagline: "Specializing in Commercial Film Directing, 9:16 Social Video Campaigns, DaVinci Color Grading & 3D Motion Graphics.",
  bio: "Multidisciplinary Creative Director, Filmmaker, and Video Editor specializing in high-impact visual storytelling. Proven expertise across commercial 16:9 brand films, 9:16 vertical reels for social campaigns, advanced DaVinci Resolve color grading, and 3D motion graphics.",
  location: "Worldwide / Remote",
  email: "hello@shamvil.design",
  stats: [
    { label: "Primary Focus", value: "Commercial Directing" },
    { label: "Social Format", value: "9:16 Vertical Reels" },
    { label: "Post-Production", value: "DaVinci Color Grade" },
    { label: "Visual FX", value: "3D & Motion Graphics" }
  ],
  skills: [
    "Commercial Directing",
    "Color Grading",
    "3D Motion Design",
    "Visual FX",
    "Art Direction",
    "Cinematography",
    "Brand Identity",
    "Spatial Design"
  ],
  tools: [
    { name: "DaVinci Resolve Studio", category: "Color & Edit" },
    { name: "Cinema 4D & Octane", category: "3D & Render" },
    { name: "Unreal Engine 5", category: "Virtual Prod" },
    { name: "RED & Arri Cinema", category: "Camera" },
    { name: "After Effects", category: "VFX & Motion" },
    { name: "Figma & Adobe CC", category: "Design" }
  ],
  socials: [
    { name: "Vimeo", url: "https://vimeo.com", icon: "vimeo" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { name: "Behance", url: "https://behance.net", icon: "behance" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { name: "X (Twitter)", url: "https://x.com", icon: "x" }
  ],
  experience: [
    {
      role: "Founder & Creative Director",
      company: "VORTEX Visual Lab",
      period: "2023 — Present",
      description: "Leading creative direction, commercial film projects, and high-end 3D motion campaigns for international luxury and tech brands."
    },
    {
      role: "Senior Motion Designer & Filmmaker",
      company: "Aether Studios",
      period: "2020 — 2023",
      description: "Directed global brand films, vertical social reels, and 3D visual effects sequences."
    },
    {
      role: "Visual Artist & Colorist",
      company: "Freelance",
      period: "2018 — 2020",
      description: "Color graded narrative shorts, music videos, and fashion editorial photography."
    }
  ]
};
