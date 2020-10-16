import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../lib/apollo';
import { themeDark, themeLight } from '../lib/theme';
import Header from 'components/Header';

export default function MyApp({ Component, pageProps }) {
  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline />
        <Header darkState={darkState} handleThemeChange={handleThemeChange} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
