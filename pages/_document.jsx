import { Html, Main, Head, NextScript } from "next/document";

export default function Document() {
  const headdata = {
    image: "https://bimi-svg.netlify.app/bimi-logo.svg",
    url: "https://jessejesse.com",
    description: "Creating something useful for the world one line of code at a time.",
    title: "Jesse Roper — Developer",
  };

  return (
    <Html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        {/* Basic SEO */}
        <meta charSet="utf-8" />
        <meta name="title" content={headdata.title} />
        <meta name="description" content={headdata.description} />
        <meta name="author" content="Jesse Roper" />
        <meta name="keywords" content="JesseJesse, sudo-self, open-source, developer, nextjs" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={headdata.url} />
        <meta property="og:title" content={headdata.title} />
        <meta property="og:description" content={headdata.description} />
        <meta property="og:image" content={headdata.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={headdata.url} />
        <meta name="twitter:title" content={headdata.title} />
        <meta name="twitter:description" content={headdata.description} />
        <meta name="twitter:image" content={headdata.image} />

        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Source+Code+Pro:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="https://bimi-svg.netlify.app/bimi-logo.svg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jesse Roper",
              "url": headdata.url,
              "image": headdata.image,
              "description": headdata.description,
              "jobTitle": "Software Developer",
              "sameAs": [
                "https://github.com/sudo-self",
                "https://x.com/lightfighter719",
                "https://www.linkedin.com/in/jrsdevelopments/"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Independent"
              }
            }),
          }}
        />
      </Head>
      <body className="dark:bg-[#111111] bg-[#f9fafb] dark:text-white duration-75">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

