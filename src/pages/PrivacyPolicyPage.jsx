import LegalDocPage from '../components/LegalDocPage'
import { privacyPolicyTitle, privacyPolicyBlocks } from '../data/privacyPolicy'

function PrivacyPolicyPage() {
  return (
    <LegalDocPage
      heading="Политика обработки данных"
      docTitle={privacyPolicyTitle}
      blocks={privacyPolicyBlocks}
    />
  )
}

export default PrivacyPolicyPage
