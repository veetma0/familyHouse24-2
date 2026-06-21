const fallbackBookingPage = 'https://family-house24.ru/booking'
const defaultBnovoUid = '088c727e-5cbd-4b98-a7f7-f993f7dbb2e0'

export const bnovoConfig = {
  uid: import.meta.env.VITE_BNOVO_UID || defaultBnovoUid,
  bookingPageUrl: import.meta.env.VITE_BNOVO_BOOKING_PAGE_URL || fallbackBookingPage,
  iframeUrl: import.meta.env.VITE_BNOVO_IFRAME_URL || '',
  conciergeText: import.meta.env.VITE_BNOVO_CONCIERGE_TEXT || 'Забронировать дом',
}
