import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'
import MailChipForm from '@/components/MailChipForm'

export default function PrivacyPolicy() {
  return (
    <>
      <PageSeo
        title={`Politica de privacidade - ${siteMetadata.author}`}
        description={`Politica de privacidade - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Politica de privacidade
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p>
              Bem-vindo ao <strong>devcontratado.com</strong> (o "Blog"). A sua privacidade é muito
              importante para nós. Esta Política de Privacidade explica como coletamos, usamos,
              divulgamos e protegemos suas informações quando você visita o nosso Blog.
            </p>

            <h2>1. Informações Que Coletamos</h2>
            <h3>1.1 Informações Pessoais</h3>
            <p>
              Podemos coletar informações pessoais que você nos fornece diretamente, como seu nome,
              e-mail e outras informações que você fornece ao se inscrever para receber
              atualizações, comentários ou participar de outras interações no Blog.
            </p>

            <h3>1.2 Informações de Navegação</h3>
            <p>
              Coletamos informações sobre sua visita ao Blog, incluindo seu endereço IP, o tipo de
              navegador, as páginas visitadas e a data e hora de sua visita. Usamos cookies e
              tecnologias semelhantes para ajudar a coletar essas informações.
            </p>

            <h2>2. Uso das Informações</h2>
            <h3>2.1 Para Melhorar o Blog</h3>
            <p>
              Usamos as informações coletadas para melhorar o conteúdo e a funcionalidade do Blog,
              personalizar sua experiência e responder às suas necessidades e solicitações.
            </p>

            <h3>2.2 Para Comunicação</h3>
            <p>
              Podemos usar suas informações de contato para enviar newsletters, atualizações e
              outras comunicações relacionadas ao Blog, desde que você tenha optado por recebê-las.
              Você pode optar por não receber essas comunicações a qualquer momento.
            </p>

            <h3>2.3 Para Análise</h3>
            <p>
              Utilizamos ferramentas de análise para entender melhor como os visitantes interagem
              com o Blog e para melhorar nosso conteúdo e desempenho. Estas ferramentas podem
              coletar informações sobre seu comportamento de navegação e outras informações
              relacionadas.
            </p>

            <h2>3. Compartilhamento de Informações</h2>
            <h3>3.1 Terceiros</h3>
            <p>
              Não vendemos, alugamos ou trocamos suas informações pessoais com terceiros. Podemos
              compartilhar suas informações com prestadores de serviços que nos auxiliam na operação
              do Blog, como serviços de hospedagem e ferramentas de análise, mas apenas para os fins
              descritos nesta Política de Privacidade.
            </p>

            <h3>3.2 Exigências Legais</h3>
            <p>
              Podemos divulgar suas informações pessoais se exigido por lei ou para proteger nossos
              direitos, propriedade ou segurança, ou os direitos, propriedade ou segurança de
              terceiros.
            </p>

            <h2>4. Segurança</h2>
            <p>
              Tomamos medidas razoáveis para proteger suas informações pessoais contra acesso não
              autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema de
              segurança é impenetrável e não podemos garantir a segurança absoluta das suas
              informações.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Dependendo da sua localização, você pode ter certos direitos relacionados às suas
              informações pessoais, incluindo o direito de acessar, corrigir ou excluir suas
              informações. Se desejar exercer esses direitos, entre em contato conosco usando as
              informações fornecidas abaixo.
            </p>

            <h2>6. Links para Outros Sites</h2>
            <p>
              O Blog pode conter links para outros sites que não são operados por nós. Não somos
              responsáveis pelas práticas de privacidade de sites de terceiros. Recomendamos que
              você leia as políticas de privacidade desses sites antes de fornecer qualquer
              informação pessoal.
            </p>

            <h2>7. Alterações na Política de Privacidade</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos
              alterações significativas, atualizaremos a data da última atualização no início desta
              política. Recomendamos que você revise esta política regularmente para se manter
              informado sobre como estamos protegendo suas informações.
            </p>

            <h2>8. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre as práticas de
              privacidade do Blog, entre em contato conosco:
            </p>
            <p>
              <strong>E-mail:</strong>{' '}
              <a href="mailto:matheuspaixaohonorato@gmail.com">matheuspaixaohonorato@gmail.com</a>
            </p>
            <p>
              Obrigado por visitar o <strong>devcontratado.com</strong>.
            </p>
          </div>
        </div>
      </div>
      <MailChipForm />
    </>
  )
}
