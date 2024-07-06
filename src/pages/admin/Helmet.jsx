import React, { useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const fetcher = (url) => axios.get(url).then(res => res.data);


function HelmetComp() {
    const { data: webInfo, error } = useSWR('/api/webinfo', fetcher);

    useEffect(() => {
      if (webInfo) {
        console.log('Fetched webInfo:', webInfo);
      }
      if (error) {
        console.error('Error fetching webInfo:', error);
      }
    }, [webInfo, error]);
  
    if (error) return <div>Error loading web info</div>;
    if (!webInfo) return <div>Loading...</div>;
  return (
    <Helmet>
    <meta charSet="utf-8" />
    <title>{`${webInfo[0].web_name}`}</title>
    <meta name="description" content={webInfo[0].meta_description} />
    <link rel="icon" type="image/svg+xml" href={`/uploads/web_info/${webInfo[0].favicon}`} />
    {/* Uncomment the line below if you want to use a feature image */}
    <meta property="og:image" content={`/uploads/web_info/${webInfo[0].feature_img}`} />
  </Helmet>
  )
}

export default HelmetComp