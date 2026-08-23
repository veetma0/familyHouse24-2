import LegalDocPage from '../components/LegalDocPage'
import { termsTitle, termsBlocks } from '../data/termsOfUse'

function TermsPage() {
  return (
    <LegalDocPage
      heading="Пользовательское соглашение"
      docTitle={termsTitle}
      blocks={termsBlocks}
    />
  )
}

export default TermsPage
