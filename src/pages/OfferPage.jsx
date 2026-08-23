import LegalDocPage from '../components/LegalDocPage'
import { offerTitle, offerBlocks } from '../data/offer'

function OfferPage() {
  return (
    <LegalDocPage
      heading="Публичная оферта"
      docTitle={offerTitle}
      blocks={offerBlocks}
    />
  )
}

export default OfferPage
