import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#16BEDA" />
          <meta name="theme-color" content="#16BEDA" />
          <link rel="alternate" type="application/rss+xml" href="/index.xml" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/fonts/KaTeX_Main-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/fonts/KaTeX_Math-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/fonts/KaTeX_Size2-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/fonts/KaTeX_Size4-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.css"
            integrity="sha384-t5CR+zwDAROtph0PXGte6ia8heboACF9R5l/DiY+WZ3P2lxNgvJkQk5n7GPvLMYw"
            crossOrigin="anonymous"
          />

          <link
            href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="/static/style.mailchip.form.css" rel="stylesheet" type="text/css" />

          <meta
            name="google-site-verification"
            content="8dHMZxup35moYXc7M8xYaL9v-dIuQbHrZtO9PWUL3lo"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-C5BT6HT4BG"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C5BT6HT4BG', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <script
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `
              !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/98c7c1316ae9b9e57376707b9/4771f8a1d59b26a81c14da42c.js");
              `,
            }}
          />

          <script
            type="text/javascript"
            src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function($) {
                  window.fnames = new Array();
                  window.ftypes = new Array();
                  fnames[0]='EMAIL';
                  ftypes[0]='email';
                  fnames[1]='FNAME';
                  ftypes[1]='text';
                  fnames[2]='LNAME';
                  ftypes[2]='text';
                  fnames[3]='ADDRESS';
                  ftypes[3]='address';
                  fnames[4]='PHONE';
                  ftypes[4]='phone';
                  fnames[5]='BIRTHDAY';
                  ftypes[5]='birthday';
                }(jQuery));
                var $mcj = jQuery.noConflict(true);
              `,
            }}
          />

          <meta name="msvalidate.01" content="DA649940CBACA628883414C03E3EC298" />
        </Head>
        <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
          <div className="flex flex-col items-center black-banner">
            <a href="https://go.hotmart.com/N61245410E" rel="nofollow">
              <img src="/static/images/banner.jpg" border="0" width="728" height="90" />
            </a>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
