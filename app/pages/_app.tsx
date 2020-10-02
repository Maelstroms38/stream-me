import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import { CurrentUserDocument } from '../lib/graphql/currentUser.graphql';
import { useApollo, initializeApollo } from '../lib/apollo';
import { themeDark, themeLight } from '../lib/theme';
import Header from '../components/Header';

export default function MyApp(props) {
  const { Component, pageProps, currentUser } = props;
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
      <ThemeProvider theme={false ? themeDark : themeLight}>
        <CssBaseline />
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const apolloClient = initializeApollo();

  let data = {};
  try {
    const response = await apolloClient.query({
      query: CurrentUserDocument,
    });
    data = response.data;
  } catch (err) {
    console.log(err);
  }
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data,
    initialApolloState: apolloClient.cache.extract(),
  };
};
