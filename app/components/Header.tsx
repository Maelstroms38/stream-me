import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as LinkText,
} from '@material-ui/core';
import Link from 'next/link';
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql';

export default function Header() {
  const classes = useStyles();
  const { data, loading } = useCurrentUserQuery({
    errorPolicy: 'ignore',
  });
  const currentUser = !loading && data && data.currentUser;

  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button color="inherit">{label}</Button>
        </Link>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <LinkText href="" color="inherit">
                Stream.me
              </LinkText>
            </Link>
          </Typography>
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));
