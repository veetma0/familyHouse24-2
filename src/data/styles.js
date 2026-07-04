// Общие куски стиля из дизайна Family House.dc.html
// (Oswald для заголовков/подписей, PT Sans — базовый текст).

export const wrap = { maxWidth: 1280, margin: '0 auto' }

// Заголовочный шрифт из дизайна
export const oswald = { fontFamily: "'Oswald', sans-serif" }

// Надпись-«кикер» над заголовком секции
export const kicker = {
  ...oswald,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: '#b8762e',
}

export const kickerGold = { ...kicker, color: '#e0b45f' }

// Крупный заголовок секции (Oswald, uppercase)
export const h2 = {
  ...oswald,
  fontWeight: 700,
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
  lineHeight: 1.02,
  margin: 0,
}

// Диагональная штриховка-плейсхолдер «фото» (запас на случай отсутствия картинки)
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
