// Общие куски стиля из дизайна (диагональные плейсхолдеры фото, kicker и т.п.)

export const wrap = { maxWidth: 1240, margin: '0 auto' }

export const kicker = {
  fontSize: 13,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#b8762e',
  fontWeight: 600,
}

export const kickerGold = { ...kicker, color: '#d8b483' }

export const h2 = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 400,
  letterSpacing: '-0.01em',
  margin: 0,
}

// Диагональная штриховка-плейсхолдер «фото» (как в макете)
export function photoPlh(c1, c2, step = 12) {
  return `repeating-linear-gradient(135deg, ${c1}, ${c1} ${step}px, ${c2} ${step}px, ${c2} ${step * 2}px)`
}

export const plhBeige = photoPlh('#e4d8c2', '#ddcfb4')
export const plhMono = {
  fontFamily: 'monospace',
  fontSize: 12,
  color: '#8a7a5f',
  letterSpacing: '0.08em',
}
