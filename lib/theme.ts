/**
 * Centered Design System Tokens (Gilberto Framer Inspired)
 */
export const theme = {
  colors: {
    bg: '#090611', // Deep dark void background (Gilberto style)
    surface: '#0F1117', // Semi-translucent dark surface card
    border: 'border-white/5', // Thin soft white-opacity border
    borderMuted: 'border-white/5', // Muted inner separators
    text: {
      primary: 'text-white',
      secondary: 'text-slate-400',
      muted: 'text-slate-500',
      accent: 'text-indigo-400'
    },
    status: {
      compliant: {
        bg: 'bg-emerald-500/10',
        border: 'border-t-emerald-500/25 border-l-emerald-500/25 border-b-emerald-500/5 border-r-emerald-500/5',
        text: 'text-white'
      },
      review: {
        bg: 'bg-amber-500/10',
        border: 'border-t-amber-500/25 border-l-amber-500/25 border-b-amber-500/5 border-r-amber-500/5',
        text: 'text-white'
      },
      risk: {
        bg: 'bg-rose-500/10',
        border: 'border-t-rose-500/25 border-l-rose-500/25 border-b-rose-500/5 border-r-rose-500/5',
        text: 'text-white'
      }
    }
  },
  typography: {
    hero: 'text-4xl md:text-5.5xl font-black tracking-tight text-white uppercase leading-[1.05]',
    sectionHeading: 'text-xl md:text-2.5xl font-bold tracking-tight text-white uppercase',
    cardHeading: 'text-sm font-semibold text-slate-200',
    body: 'text-xs text-slate-400 leading-relaxed font-sans font-medium',
    caption: 'text-[9px] font-extrabold uppercase tracking-wider text-slate-500'
  },
  radius: {
    card: 'rounded-[24px]',
    button: 'rounded-xl',
    badge: 'rounded-full'
  },
  transition: 'transition-all duration-300 ease-in-out',
  heights: {
    button: 'h-10',
    input: 'h-10',
    badge: 'h-5 px-3.5 flex items-center justify-center'
  }
}
