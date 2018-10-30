<<<<<<< Updated upstream
import React from 'react';
import './stockItem.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 350,
    minHeight: 350
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function StockItem(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.stock.companyName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {bull}{props.stock.symbol}{bull}
        </Typography>
        <Typography component="p">
          Sector: {props.stock.sector}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          {props.stock.latestPrice}
        </Button>
        <span className="waves-effect waves-light btn circle right #4fc3f7 light-blue lighten-2">
          <i className="tiny material-icons">add</i>
        </span>
      </CardActions>
    </Card>
  );
}

StockItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StockItem);
=======
// import React from "react";
// import "./stockItem.css";

// export default () => (
//   <div className="stockItem container">
//   stock item
//   </div>
// );
>>>>>>> Stashed changes
