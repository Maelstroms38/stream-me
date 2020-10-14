import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Stream } from '../lib/graphql/streams.graphql';

interface Props {
  streams: Stream[];
}

export default function Posts(props: Props) {
  const styles = useStyles();
  const { streams } = props;

  return (
    <Grid container className={styles.container} spacing={4}>
      {streams.map((post) => (
        <Grid item key={post._id} xs={12} md={6}>
          <Link href={`/streams/${post._id}`}>
            <CardActionArea>
              <Card className={styles.card}>
                <div className={styles.cardDetails}>
                  <CardContent>
                    <Typography
                      component="h2"
                      variant="h5"
                      className={styles.cardText}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      noWrap={true}
                      variant="subtitle1"
                      color="textSecondary"
                      className={styles.cardText}
                    >
                      {post.url}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      paragraph
                      className={styles.cardText}
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={styles.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Hidden>
              </Card>
            </CardActionArea>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardText: {
    maxWidth: '26rem',
  },
  cardMedia: {
    width: 160,
  },
}));
