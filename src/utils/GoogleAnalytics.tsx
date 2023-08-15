import { Fragment } from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
  const markup = {
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-FLCDXWTVMD');
    `,
  };

  return (
    <Fragment>
      {/* Google analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FLCDXWTVMD"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={markup} />
    </Fragment>
  );
};

export default GoogleAnalytics;
