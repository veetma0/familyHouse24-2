const fallbackBookingPage = 'https://family-house24.ru/booking'

export const bnovoConfig = {
  uid: import.meta.env.VITE_BNOVO_UID || '',
  bookingPageUrl: import.meta.env.VITE_BNOVO_BOOKING_PAGE_URL || fallbackBookingPage,
  iframeUrl: import.meta.env.VITE_BNOVO_IFRAME_URL || '',
  conciergeText: import.meta.env.VITE_BNOVO_CONCIERGE_TEXT || 'Подбор рыбалки со скидкой',
}
