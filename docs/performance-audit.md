# Front-end performance audit

This audit applies the supplied Front-End Performance Checklist to the static site. Measurements use the production export at a 390 × 844 viewport and a device scale factor of three. Chromium loaded each route until network idle on a local server. The local server does not compress responses, so its byte totals describe raw transfer rather than the smaller compressed transfer from GitHub Pages.

| Area | Result |
| --- | --- |
| HTML | Next exports compact HTML. The stylesheet loads before asynchronous framework scripts. The site uses no iframes. |
| CSS | The production build emits one minified stylesheet of about 85 KB. Keeping that stylesheet render blocking avoids showing unstyled content. |
| Fonts | Both fonts are local WOFF2 files and total about 69 KB. Each uses `font-display: swap`, and no cross-origin font connection is needed. |
| Images | Artwork is WebP with intrinsic dimensions. The portrait and page scenes have responsive sources. Project images and the lower-priority home yoga image use native lazy loading. |
| JavaScript | Next emits asynchronous, minified scripts. The scroll library loads dynamically and only when motion is allowed. The site has no third-party analytics or PWA service worker. |
| Delivery | GitHub Pages serves the site over HTTPS and HTTP/2 through its CDN with gzip compression and a 600-second cache lifetime. The site sends no cookies or mixed-protocol assets. |

The decorative branch was reduced from 218 KB to 66 KB at its actual display size. Its lazy loading also prevents the normal pages from preloading the copy inside the 404 route. The 1080-pixel data and yoga scenes weigh 119 KB and 107 KB, compared with 289 KB and 216 KB for their originals. The browser chooses those smaller files for a dense mobile screen.

The final local mobile loads used 15 to 19 resource requests per route. Their raw totals ranged from 1.43 MB on Contact to 1.92 MB on Data. No request failed. The observed layout shift values ranged from 0.002 to 0.050. Local load timings are useful for regressions, but they do not establish global visitor load times or network time to first byte.

The 206 KB ambient artwork remains the largest shared image because it is central to the site's visual identity. Further savings should be judged against its appearance on large screens. The build should continue to be checked in Chromium and mobile WebKit at narrow widths and through browser zoom.
