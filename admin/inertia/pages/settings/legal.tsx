import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import { useT } from '~/i18n/I18nProvider'

export default function LegalPage() {
  const { t } = useT()
  return (
    <SettingsLayout>
      <Head title={t('legal.headTitle')} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-8">{t('legal.title')}</h1>

          {/* License Agreement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.licenseAgreement')}</h2>
            <p className="text-text-primary mb-3">{t('legal.licenseOriginalNote')}</p>
            <p className="text-text-primary mb-3">Copyright 2024-2026 Crosstalk Solutions, LLC</p>
            <p className="text-text-primary mb-3">
              Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
              you may not use this file except in compliance with the License.
              You may obtain a copy of the License at
            </p>
            <p className="text-text-primary mb-3">
              <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.apache.org/licenses/LICENSE-2.0</a>
            </p>
            <p className="text-text-primary">
              Unless required by applicable law or agreed to in writing, software
              distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
              WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
              See the License for the specific language governing permissions and
              limitations under the License.
            </p>
          </section>

          {/* Third-Party Software */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.thirdPartyTitle')}</h2>
            <p className="text-text-primary mb-4">{t('legal.thirdPartyIntro')}</p>
            <ul className="space-y-3 text-text-primary">
              <li>
                <strong>Kiwix</strong> — {t('legal.thirdParty.kiwix')}
                <br />
                <a href="https://kiwix.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://kiwix.org</a>
              </li>
              <li>
                <strong>Kolibri</strong> — {t('legal.thirdParty.kolibri')}
                <br />
                <a href="https://learningequality.org/kolibri" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://learningequality.org/kolibri</a>
              </li>
              <li>
                <strong>Ollama</strong> — {t('legal.thirdParty.ollama')}
                <br />
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ollama.com</a>
              </li>
              <li>
                <strong>CyberChef</strong> — {t('legal.thirdParty.cyberchef')}
                <br />
                <a href="https://github.com/gchq/CyberChef" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/gchq/CyberChef</a>
              </li>
              <li>
                <strong>FlatNotes</strong> — {t('legal.thirdParty.flatnotes')}
                <br />
                <a href="https://github.com/dullage/flatnotes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/dullage/flatnotes</a>
              </li>
              <li>
                <strong>Qdrant</strong> — {t('legal.thirdParty.qdrant')}
                <br />
                <a href="https://github.com/qdrant/qdrant" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/qdrant/qdrant</a>
              </li>
            </ul>
          </section>

          {/* Privacy Statement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacyTitle')}</h2>
            <p className="text-text-primary mb-3">{t('legal.privacyIntro')}</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li>
                <strong>{t('legal.privacyZeroLabel')}</strong> {t('legal.privacyZeroText')}
              </li>
              <li>
                <strong>{t('legal.privacyLocalLabel')}</strong> {t('legal.privacyLocalText')}
              </li>
              <li>
                <strong>{t('legal.privacyAccountsLabel')}</strong>{' '}
                {t('legal.privacyAccountsText')}
              </li>
              <li>
                <strong>{t('legal.privacyNetworkLabel')}</strong> {t('legal.privacyNetworkText')}
              </li>
            </ul>
          </section>

          {/* Content Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.contentDisclaimerTitle')}</h2>
            <p className="text-text-primary mb-3">{t('legal.contentDisclaimerP1')}</p>
            <p className="text-text-primary mb-3">{t('legal.contentDisclaimerP2')}</p>
            <p className="text-text-primary">{t('legal.contentDisclaimerP3')}</p>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.medicalTitle')}</h2>
            <p className="text-text-primary mb-3">{t('legal.medicalP1')}</p>
            <p className="text-text-primary mb-3 font-semibold">{t('legal.medicalP2')}</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary mb-3">
              <li>{t('legal.medicalLi1')}</li>
              <li>{t('legal.medicalLi2')}</li>
              <li>{t('legal.medicalLi3')}</li>
              <li>{t('legal.medicalLi4')}</li>
            </ul>
          </section>

          {/* Data Storage Notice */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.dataStorageTitle')}</h2>
            <p className="text-text-primary mb-3">{t('legal.dataStorageIntro')}</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li>
                <strong>{t('legal.installationDirLabel')}</strong> /opt/project-nomad
              </li>
              <li>
                <strong>{t('legal.downloadedContentLabel')}</strong>{' '}
                /opt/project-nomad/storage
              </li>
              <li>
                <strong>{t('legal.applicationDataLabel')}</strong>{' '}
                {t('legal.applicationDataText')}
              </li>
            </ul>
            <p className="text-text-primary mt-3">{t('legal.dataControl')}</p>
          </section>

        </main>
      </div>
    </SettingsLayout>
  )
}
