import LegalDocPage from '../components/LegalDocPage'
import { consentTitle, consentBlocks } from '../data/consent'

function ConsentPage() {
  return (
    <LegalDocPage
      heading="Согласие на обработку персональных данных"
      docTitle={consentTitle}
      blocks={consentBlocks}
    />
  )
}

export default ConsentPage
