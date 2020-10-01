import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Stream } from '../lib/streams.graphql';

interface Props {
  stream: Stream;
}

export default function Hero(props: Props) {
  const styles = useStyles();
  const { stream } = props;

  return (
    <Paper className={styles.mainFeaturedPost}>
      {
        <img
          style={{ display: 'none' }}
          src="https://source.unsplash.com/user/erondu"
          alt="background"
        />
      }
      <div className={styles.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={styles.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {stream.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {stream.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
