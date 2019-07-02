import React, { Component } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { AppContext } from 'next/app';
import { getDataFromTree } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { IncomingMessage } from 'http';
import cookie from 'cookie';

import initApollo from './initApollo';
import isBrowser from './isBrowser';

export interface NextApolloContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const parseCookies = (req?: IncomingMessage, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options,
  );
};

export default (App: any) => {
  return class WithData extends Component {
    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);

      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token,
      });
    }

    static displayName = `WithData(${App.displayName})`;

    static async getInitialProps(ctx: AppContext) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token,
        },
      );

      (ctx.ctx as NextPageContext & NextApolloContext).apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
